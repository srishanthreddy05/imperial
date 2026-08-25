import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { GeminiService } from "@/lib/gemini/service";
import type { ChatMessage, GeminiResponse } from "@/lib/gemini/types";
import {
  getConversation,
  saveConversation,
  markConversationEmailSent,
} from "@/lib/firestore/conversations";
import { saveLead } from "@/lib/firestore/leads";
import {
  sendAppointmentNotification,
  sendCallbackNotification,
  sendContactNotification,
} from "@/lib/email/receptionistNotification";

// ─── Types ────────────────────────────────────────────────────────────────────

interface IncomingBody {
  message?: unknown;
  conversationId?: unknown;
  history?: { role?: unknown; content?: unknown }[];
}

// ─── Email Trigger Logic ──────────────────────────────────────────────────────

/**
 * Determines whether a notification email should be sent, and which type.
 * Emails are NEVER sent on every message — only when enough data is collected.
 */
function shouldSendEmail(
  r: GeminiResponse,
  alreadySent: boolean
): "appointment" | "callback" | "contact" | null {
  if (alreadySent) return null;
  if (!r.isComplete) return null;

  if (r.intent === "appointment") return "appointment";
  if (r.intent === "callback") return "callback";

  // For insurance / general enquiries with contact info
  if (
    (r.intent === "insurance" || r.intent === "general_question") &&
    r.patient.name &&
    (r.patient.phone || r.patient.email)
  ) {
    return "contact";
  }

  return null;
}

/**
 * True when the patient has provided enough contact info to create a lead.
 */
function hasContactInfo(r: GeminiResponse): boolean {
  return Boolean(r.patient.name && (r.patient.phone || r.patient.email));
}

// ─── Route Handler ────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  const now = new Date().toISOString();

  try {
    // ── 1. Parse & validate input ──────────────────────────────────────────
    const body = (await request.json()) as IncomingBody;

    const message =
      typeof body.message === "string"
        ? body.message.replace(/[<>]/g, "").trim()
        : "";

    if (!message || message.length > 1000) {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }

    const conversationId =
      typeof body.conversationId === "string" && body.conversationId.trim()
        ? body.conversationId.trim()
        : randomUUID();

    // ── 2. Load existing conversation ──────────────────────────────────────
    const existing = await getConversation(conversationId);

    // ── 3. Build message history ───────────────────────────────────────────
    // Prefer Firestore history over client-sent history (single source of truth)
    const previousMessages: ChatMessage[] = existing?.messages ?? sanitiseClientHistory(body.history);

    const messagesWithUser: ChatMessage[] = [
      ...previousMessages,
      { role: "user", content: message, timestamp: now },
    ];

    // ── 4. Call Gemini (single API call, returns both reply + structured data)
    const geminiResponse = await GeminiService.chat(messagesWithUser);

    // ── 5. Append assistant reply to history ───────────────────────────────
    const finalMessages: ChatMessage[] = [
      ...messagesWithUser,
      {
        role: "assistant",
        content: geminiResponse.assistantResponse,
        timestamp: new Date().toISOString(),
      },
    ];

    // ── 6. Save conversation to Firestore ──────────────────────────────────
    const savedConversation = await saveConversation(
      conversationId,
      finalMessages,
      geminiResponse,
      existing
    );

    // ── 7. Determine and send email notification (gated) ───────────────────
    const emailType = shouldSendEmail(geminiResponse, savedConversation.emailSent);
    if (emailType) {
      try {
        const emailInput = { geminiResponse, conversationId, timestamp: now };

        if (emailType === "appointment") {
          await sendAppointmentNotification(emailInput);
        } else if (emailType === "callback") {
          await sendCallbackNotification(emailInput);
        } else {
          await sendContactNotification(emailInput);
        }

        await markConversationEmailSent(conversationId);
      } catch (emailError) {
        // Log but never fail the chat due to an email error
        console.error("[Chat API] Email notification failed:", emailError);
      }
    }

    // ── 8. Save lead when contact info is complete ─────────────────────────
    if (geminiResponse.isComplete && hasContactInfo(geminiResponse) && !existing?.emailSent) {
      try {
        await saveLead({
          leadId: conversationId,
          intent: geminiResponse.intent,
          name: geminiResponse.patient.name,
          phone: geminiResponse.patient.phone,
          email: geminiResponse.patient.email,
          summary: geminiResponse.summary,
          status: "new",
          createdAt: existing?.createdAt ?? now,
        });
      } catch (leadError) {
        // Non-fatal
        console.error("[Chat API] Lead save failed:", leadError);
      }
    }

    // ── 9. Return — only the assistantResponse goes to the frontend ────────
    return NextResponse.json({
      reply: geminiResponse.assistantResponse,
      conversationId,
    });
  } catch (error) {
    console.error("[Chat API] Unhandled error:", error);
    return NextResponse.json(
      {
        reply:
          "I'm sorry, I'm having trouble right now. Please call us at (903) 957-0417 for immediate assistance.",
      },
      { status: 500 }
    );
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Sanitises the history array sent by the client when no Firestore record exists yet.
 * Strips invalid roles, HTML characters, and empty messages.
 */
function sanitiseClientHistory(
  history?: { role?: unknown; content?: unknown }[]
): ChatMessage[] {
  if (!Array.isArray(history)) return [];

  return history
    .filter(
      (m): m is { role: "user" | "assistant"; content: string } =>
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim() !== ""
    )
    .map((m) => ({
      role: m.role,
      content: m.content.replace(/[<>]/g, "").trim(),
      timestamp: new Date().toISOString(),
    }));
}
