// ─── Re-export Gemini types for convenience ───────────────────────────────────
export type {
  ChatMessage,
  ConversationIntent,
  ConversationDocument,
  ConversationStatus,
  LeadDocument,
  GeminiResponse,
  PatientInfo,
  AppointmentInfo,
  CallbackInfo,
  GeminiCallOptions,
} from "@/lib/gemini/types";

// ─── Frontend Message ─────────────────────────────────────────────────────────

/** Used only in the BotModal component to render chat bubbles. */
export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

// ─── Clinic Knowledge Base ────────────────────────────────────────────────────

export interface BrainFile {
  clinic: {
    name: string;
    doctor: string;
    specialty: string;
    phone: string;
    fax: string;
    tagline: string;
  };
  locations: {
    name: string;
    address: string;
    status: string;
    directions: string;
  }[];
  hours: Record<string, string>;
  services: {
    name: string;
    description: string;
    [key: string]: unknown;
  }[];
  staff: { name: string; role: string }[];
  forms: { name: string; type: string }[];
  policies: {
    no_medical_advice: string;
    privacy: string;
    sms: string;
  };
}
