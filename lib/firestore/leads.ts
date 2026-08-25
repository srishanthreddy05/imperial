import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import type { LeadDocument } from "@/lib/gemini/types";

// ─── Write ────────────────────────────────────────────────────────────────────

/**
 * Saves a lead to the `leads` Firestore collection.
 * Called whenever isComplete === true and the patient has provided contact info.
 */
export async function saveLead(data: LeadDocument): Promise<void> {
  if (typeof data.leadId !== "string" || data.leadId.trim() === "") {
    throw new Error("leadId must be a non-empty string.");
  }
  await setDoc(doc(db, "leads", data.leadId), data, { merge: true });
}
