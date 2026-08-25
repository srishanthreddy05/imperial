import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import type { ConversationDocument, ChatMessage, GeminiResponse } from "@/lib/gemini/types";

// ─── Guards ───────────────────────────────────────────────────────────────────

function assertId(id: string, label: string): void {
  if (typeof id !== "string" || id.trim() === "") {
    throw new Error(`${label} must be a non-empty string.`);
  }
}

// ─── Read ─────────────────────────────────────────────────────────────────────

export async function getConversation(
  conversationId: string
): Promise<ConversationDocument | null> {
  assertId(conversationId, "conversationId");
  const snap = await getDoc(doc(db, "conversations", conversationId));
  if (!snap.exists()) return null;
  return snap.data() as ConversationDocument;
}

// ─── Write ────────────────────────────────────────────────────────────────────

/**
 * Upserts a conversation document in Firestore.
 * Preserves createdAt on subsequent saves.
 */
export async function saveConversation(
  conversationId: string,
  messages: ChatMessage[],
  geminiResponse: GeminiResponse,
  existing?: ConversationDocument | null
): Promise<ConversationDocument> {
  assertId(conversationId, "conversationId");

  const now = new Date().toISOString();

  const payload: ConversationDocument = {
    conversationId,
    messages,
    intent: geminiResponse.intent,
    confidence: geminiResponse.confidence,
    summary: geminiResponse.summary,
    patient: geminiResponse.patient,
    appointment: geminiResponse.appointment,
    callback: geminiResponse.callback,
    isComplete: geminiResponse.isComplete,
    missingFields: geminiResponse.missingFields,
    emailSent: existing?.emailSent ?? false,
    status: existing?.status ?? "open",
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };

  await setDoc(doc(db, "conversations", conversationId), payload, { merge: true });
  return payload;
}

// ─── Mark Email Sent ──────────────────────────────────────────────────────────

export async function markConversationEmailSent(conversationId: string): Promise<void> {
  assertId(conversationId, "conversationId");
  await updateDoc(doc(db, "conversations", conversationId), {
    emailSent: true,
    status: "sent_to_reception",
    updatedAt: new Date().toISOString(),
  });
}
