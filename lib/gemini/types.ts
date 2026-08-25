// ─── Conversation Intent ─────────────────────────────────────────────────────

export type ConversationIntent =
  | "appointment"
  | "callback"
  | "insurance"
  | "billing"
  | "medical_records"
  | "prescription_refill"
  | "lab_results"
  | "provider_information"
  | "location"
  | "office_hours"
  | "general_question"
  | "emergency"
  | "other";

// ─── Patient & Appointment Data ───────────────────────────────────────────────

export interface PatientInfo {
  name: string;
  phone: string;
  email: string;
}

export interface AppointmentInfo {
  provider: string;
  reason: string;
  preferredDate: string;
  preferredTime: string;
}

export interface CallbackInfo {
  requested: boolean;
  reason: string;
  preferredTime: string;
}

// ─── Gemini Structured Response ───────────────────────────────────────────────

/**
 * The full JSON object that Gemini returns on every single API call.
 * Only `assistantResponse` is shown to the user. Everything else is backend-only.
 */
export interface GeminiResponse {
  /** The human-readable reply shown to the patient in the chat UI. */
  assistantResponse: string;
  /** Detected intent for this conversational turn. */
  intent: ConversationIntent;
  /** 0–1 confidence in the detected intent. */
  confidence: number;
  /** Collected patient contact details (may be partial). */
  patient: PatientInfo;
  /** Collected appointment details (may be partial). */
  appointment: AppointmentInfo;
  /** Collected callback details. */
  callback: CallbackInfo;
  /** A one-paragraph plain-text summary of the conversation so far. */
  summary: string;
  /**
   * True only when ALL required fields for the detected intent have been
   * collected and validated. This gates email sending.
   */
  isComplete: boolean;
  /** List of field names still needed from the patient. */
  missingFields: string[];
}

// ─── Chat Message ─────────────────────────────────────────────────────────────

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
}

// ─── Firestore Documents ──────────────────────────────────────────────────────

export type ConversationStatus = "open" | "sent_to_reception";

export interface ConversationDocument {
  conversationId: string;
  messages: ChatMessage[];
  intent: ConversationIntent;
  confidence: number;
  summary: string;
  patient: PatientInfo;
  appointment: AppointmentInfo;
  callback: CallbackInfo;
  isComplete: boolean;
  missingFields: string[];
  emailSent: boolean;
  status: ConversationStatus;
  createdAt: string;
  updatedAt: string;
}

export interface LeadDocument {
  leadId: string;
  intent: ConversationIntent;
  name: string;
  phone: string;
  email: string;
  summary: string;
  status: "new" | "contacted" | "closed";
  createdAt: string;
}

// ─── Gemini Client Options ────────────────────────────────────────────────────

export interface GeminiCallOptions {
  maxOutputTokens?: number;
  temperature?: number;
}
