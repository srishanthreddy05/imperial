import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import {
  buildReceptionistMessages,
  clearCallbackState,
  extractPatientMemory,
  getFallbackReceptionistReply,
  hasAllPatientDetails,
  isValidEmail,
  isValidPhone,
  isEmergencyMessage,
  isCallbackCancellation,
  isLikelyCallbackResponse,
  isLikelyNewQuestion,
  shouldOfferCallback,
  type ChatMessage,
  type PatientMemory,
} from "@/lib/chat/receptionist";
import {
  CALLBACK_DETAILS_REQUEST,
  CALLBACK_DETAILS_REMINDER,
  CALLBACK_CANCELLED_MESSAGE,
  CALLBACK_SUBMITTED_MESSAGE,
  EMERGENCY_MESSAGE,
  INITIAL_RECEPTIONIST_MESSAGE,
  OFFER_CALLBACK_MESSAGE,
} from "@/lib/chat/receptionistMessages";
import { sendCallbackRequestEmail } from "@/lib/email/callbackRequest";
import { getCallbackRequest, saveCallbackRequest, markCallbackRequestEmailSent } from "@/lib/firestore/callbackRequests";
import {
  getAIConversation,
  markAIConversationCallbackSubmitted,
  saveAIConversation,
  type AIConversationDocument,
} from "@/lib/firestore/aiConversations";
import { callGroqChat, hasGroqApiKey } from "@/lib/groq/client";
import { generateCallbackSummary } from "@/lib/summary/callbackSummary";

interface IncomingHistoryMessage {
  role?: unknown;
  content?: unknown;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      message?: unknown;
      history?: IncomingHistoryMessage[];
      conversationId?: unknown;
      action?: unknown;
    };
    const message = typeof body.message === "string" ? body.message.replace(/[<>]/g, "").trim() : "";
    const action = body.action === "request_callback" ? "request_callback" : undefined;

    if ((!message && !action) || message.length > 500) {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }

    const conversationId =
      typeof body.conversationId === "string" && body.conversationId.trim() !== ""
        ? body.conversationId.trim()
        : randomUUID();
    const existingConversation = await getAIConversation(conversationId);
    const previousMessages = getPreviousMessages(existingConversation, body.history);
    const messagesWithUser = message
      ? [...previousMessages, { role: "user" as const, content: message, timestamp: new Date().toISOString() }]
      : previousMessages;
    const memory = extractPatientMemory(messagesWithUser, getExistingMemory(existingConversation));
    if (action === "request_callback") {
      memory.callbackRequested = true;
      memory.intakeMode = true;
      memory.callbackState = "CALLBACK_COLLECTING";
    }

    let reply: string;
    let callbackOffer = false;
    const callbackAlreadySubmitted = Boolean(existingConversation?.callbackSubmitted || memory.callbackSubmitted);
    const callbackActive = Boolean(memory.callbackRequested && !callbackAlreadySubmitted);

    if (callbackActive && isCallbackCancellation(message)) {
      const clearedMemory = clearCallbackState(memory);
      reply = CALLBACK_CANCELLED_MESSAGE;
      const finalMessages = [...messagesWithUser, { role: "assistant" as const, content: reply, timestamp: new Date().toISOString() }];
      await saveAIConversation(conversationId, finalMessages, clearedMemory, existingConversation);

      return NextResponse.json({
        reply,
        conversationId,
        callbackSubmitted: false,
        callbackOffer: false,
      });
    }

    if (callbackActive && isLikelyNewQuestion(message) && !isLikelyCallbackResponse(message)) {
      memory.callbackState = "GENERAL_CHAT";
      reply = await getReceptionistReply(messagesWithUser, memory, message);
      const finalMessages = [...messagesWithUser, { role: "assistant" as const, content: reply, timestamp: new Date().toISOString() }];
      await saveAIConversation(conversationId, finalMessages, memory, existingConversation);

      return NextResponse.json({
        reply,
        conversationId,
        callbackSubmitted: false,
        callbackOffer: false,
      });
    }

    if (isEmergencyMessage(message)) {
      reply = EMERGENCY_MESSAGE;
    } else if (action === "request_callback" && !callbackAlreadySubmitted) {
      reply = CALLBACK_DETAILS_REQUEST;
      memory.detailsRequested = true;
      memory.callbackState = "CALLBACK_COLLECTING";
    } else if (memory.callbackRequested && !callbackAlreadySubmitted) {
      if (!hasAllPatientDetails(memory) || !isValidEmail(memory.email) || !isValidPhone(memory.phone)) {
        reply = memory.detailsRequested ? CALLBACK_DETAILS_REMINDER : CALLBACK_DETAILS_REQUEST;
        memory.detailsRequested = true;
        memory.callbackState = "CALLBACK_COLLECTING";
      } else {
        const requestedAt = new Date().toISOString();
        const requestId = existingConversation?.callbackRequestId || conversationId;
        const existingCallbackRequest = await getCallbackRequest(requestId);
        const summary = await generateCallbackSummary(messagesWithUser);
        if (!existingCallbackRequest) {
          await saveCallbackRequest({
            requestId,
            patientName: memory.patientName || "",
            phone: memory.phone || "",
            email: memory.email || "",
            preferredCallbackTime: memory.preferredCallbackTime || "",
            conversation: messagesWithUser,
            conversationSummary: summary,
            status: "new",
            callbackRequested: true,
            emailSent: false,
            createdAt: requestedAt,
          });
        }

        if (!existingCallbackRequest?.emailSent) {
          await sendCallbackRequestEmail({
            patientName: memory.patientName || "",
            phone: memory.phone || "",
            email: memory.email || "",
            preferredCallbackTime: memory.preferredCallbackTime || "",
            summary,
            conversation: messagesWithUser,
            requestedAt: existingCallbackRequest?.createdAt || requestedAt,
          });
          await markCallbackRequestEmailSent(requestId);
        }

        memory.callbackSubmitted = true;
        memory.emailSent = true;
        memory.callbackState = "CALLBACK_COMPLETED";
        reply = CALLBACK_SUBMITTED_MESSAGE;

        const finalMessages = [...messagesWithUser, { role: "assistant" as const, content: reply, timestamp: new Date().toISOString() }];
        await saveAIConversation(conversationId, finalMessages, memory, existingConversation);
        await markAIConversationCallbackSubmitted(conversationId, requestId);

        return NextResponse.json({ reply, conversationId, callbackSubmitted: true, callbackOffer: false });
      }
    } else {
      reply = await getReceptionistReply(messagesWithUser, memory, message);
      callbackOffer = shouldOfferCallback(messagesWithUser, memory);
      if (callbackOffer && !callbackAlreadySubmitted) {
        reply = OFFER_CALLBACK_MESSAGE;
        memory.callbackState = "CALLBACK_PENDING";
      }
    }

    const finalMessages = [...messagesWithUser, { role: "assistant" as const, content: reply, timestamp: new Date().toISOString() }];
    await saveAIConversation(conversationId, finalMessages, memory, existingConversation);

    return NextResponse.json({
      reply,
      conversationId,
      callbackSubmitted: callbackAlreadySubmitted || memory.callbackSubmitted,
      callbackOffer,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        reply: "I'm sorry, I'm having trouble right now. Please call us at (903) 957-0417 for assistance.",
      },
      { status: 500 }
    );
  }
}

function getPreviousMessages(existingConversation: AIConversationDocument | null, history?: IncomingHistoryMessage[]) {
  if (existingConversation?.messages) return existingConversation.messages;

  return (history || [])
    .filter((message) => message.content !== INITIAL_RECEPTIONIST_MESSAGE)
    .filter((message): message is { role: "user" | "assistant"; content: string } => {
      return (message.role === "user" || message.role === "assistant") && typeof message.content === "string";
    })
    .map((message) => ({
      role: message.role,
      content: message.content.replace(/[<>]/g, "").trim(),
      timestamp: new Date().toISOString(),
    }))
    .filter((message) => message.content !== "");
}

function getExistingMemory(existingConversation: AIConversationDocument | null): Partial<PatientMemory> | undefined {
  if (!existingConversation) return undefined;

  return {
    patientName: existingConversation.patientName || undefined,
    phone: existingConversation.phone || undefined,
    email: existingConversation.email || undefined,
    reasonForContact: existingConversation.reasonForContact || undefined,
    symptoms: existingConversation.symptoms,
    intakeMode: existingConversation.intakeMode,
    detailsRequested: existingConversation.detailsRequested,
    callbackRequested: existingConversation.callbackRequested,
    callbackSubmitted: existingConversation.callbackSubmitted,
    emailSent: existingConversation?.emailSent,
    preferredCallbackTime: existingConversation?.preferredCallbackTime || undefined,
    callbackState:
      existingConversation.callbackState ||
      (existingConversation.callbackSubmitted
        ? "CALLBACK_COMPLETED"
        : existingConversation.callbackRequested
          ? existingConversation.detailsRequested
            ? "CALLBACK_COLLECTING"
            : "CALLBACK_PENDING"
          : "GENERAL_CHAT"),
  };
}

async function getReceptionistReply(messages: ChatMessage[], memory: PatientMemory, userMessage: string) {
  if (!hasGroqApiKey()) {
    return getFallbackReceptionistReply(userMessage);
  }

  try {
    const reply = await callGroqChat(buildReceptionistMessages(messages, memory), {
      maxTokens: 300,
      temperature: 0.3,
    });

    return reply || getFallbackReceptionistReply(userMessage);
  } catch (error) {
    console.error("Groq receptionist reply error:", error);
    return getFallbackReceptionistReply(userMessage);
  }
}

