import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import type { ChatMessage, PatientMemory } from "@/lib/chat/receptionist";
import type { CallbackSummary } from "@/lib/summary/callbackSummary";

export interface AIConversationDocument {
  conversationId: string;
  patientName: string;
  phone: string;
  email: string;
  preferredCallbackTime: string;
  messages: ChatMessage[];
  summary: CallbackSummary | null;
  status: "open" | "sent_to_reception";
  emailSent: boolean;
  intakeMode: boolean;
  detailsRequested: boolean;
  callbackRequested: boolean;
  callbackSubmitted: boolean;
  callbackState: "GENERAL_CHAT" | "CALLBACK_PENDING" | "CALLBACK_COLLECTING" | "CALLBACK_COMPLETED";
  callbackRequestId: string;
  reasonForContact: string;
  symptoms: string[];
  createdAt: string;
  updatedAt: string;
}

export async function getAIConversation(conversationId: string) {
  assertDocumentId(conversationId);
  const snap = await getDoc(doc(db, "aiConversations", conversationId));
  if (!snap.exists()) return null;
  return snap.data() as AIConversationDocument;
}

export async function saveAIConversation(
  conversationId: string,
  messages: ChatMessage[],
  memory: PatientMemory,
  existing?: AIConversationDocument | null,
  summary?: CallbackSummary | null
) {
  assertDocumentId(conversationId);
  const now = new Date().toISOString();
  const payload: AIConversationDocument = {
    conversationId,
    patientName: memory.patientName || "",
    phone: memory.phone || "",
    email: memory.email || "",
    preferredCallbackTime: memory.preferredCallbackTime || existing?.preferredCallbackTime || "",
    messages,
    summary: summary ?? existing?.summary ?? null,
    status: existing?.status || "open",
    emailSent: existing?.emailSent || false,
    intakeMode: memory.intakeMode,
    detailsRequested: memory.detailsRequested,
    callbackRequested: memory.callbackRequested,
    callbackSubmitted: memory.callbackSubmitted,
    callbackState: memory.callbackState,
    callbackRequestId: existing?.callbackRequestId || "",
    reasonForContact: memory.reasonForContact || "",
    symptoms: memory.symptoms,
    createdAt: existing?.createdAt || now,
    updatedAt: now,
  };

  await setDoc(doc(db, "aiConversations", conversationId), payload, { merge: true });
  return payload;
}

export async function markAIConversationCallbackSubmitted(conversationId: string, callbackRequestId: string) {
  assertDocumentId(conversationId);
  if (typeof callbackRequestId !== "string" || callbackRequestId.trim() === "") {
    throw new Error("callbackRequestId must be a non-empty string.");
  }

  await updateDoc(doc(db, "aiConversations", conversationId), {
    callbackRequested: true,
    callbackSubmitted: true,
    callbackState: "CALLBACK_COMPLETED",
    callbackRequestId,
    emailSent: true,
    status: "sent_to_reception",
    updatedAt: new Date().toISOString(),
  });
}

function assertDocumentId(conversationId: string) {
  if (typeof conversationId !== "string" || conversationId.trim() === "") {
    throw new Error("conversationId must be a non-empty string.");
  }
}
