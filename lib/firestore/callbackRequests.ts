import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import type { ChatMessage } from "@/lib/chat/receptionist";
import type { CallbackSummary } from "@/lib/summary/callbackSummary";

export interface CallbackRequestData {
  requestId: string;
  patientName: string;
  phone: string;
  email: string;
  preferredCallbackTime: string;
  conversation: ChatMessage[];
  conversationSummary: CallbackSummary;
  status: "new";
  callbackRequested: true;
  emailSent: boolean;
  createdAt: string;
}

export async function saveCallbackRequest(data: CallbackRequestData) {
  assertDocumentId(data.requestId);
  await setDoc(doc(db, "callbackRequests", data.requestId), data);
  return data;
}

export async function getCallbackRequest(requestId: string) {
  assertDocumentId(requestId);
  const snap = await getDoc(doc(db, "callbackRequests", requestId));
  if (!snap.exists()) return null;
  return snap.data() as CallbackRequestData;
}

export async function markCallbackRequestEmailSent(requestId: string) {
  assertDocumentId(requestId);
  await updateDoc(doc(db, "callbackRequests", requestId), {
    emailSent: true,
  });
}

function assertDocumentId(requestId: string) {
  if (typeof requestId !== "string" || requestId.trim() === "") {
    throw new Error("requestId must be a non-empty string.");
  }
}
