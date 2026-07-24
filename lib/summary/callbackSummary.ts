import brainFile from "@/lib/brain.json";
import { callGroqChat, hasGroqApiKey } from "@/lib/groq/client";
import type { ChatMessage } from "@/lib/chat/receptionist";

export interface CallbackSummary {
  reasonForContact: string;
  summary: string;
  urgency: "Low" | "Medium" | "High";
  recommendedFollowUp: string;
}

export async function generateCallbackSummary(messages: ChatMessage[]): Promise<CallbackSummary> {
  if (!hasGroqApiKey()) {
    return fallbackSummary(messages);
  }

  const transcript = messages.map((message) => `${message.role === "user" ? "Patient" : "Assistant"}: ${message.content}`).join("\n");
  const content = await callGroqChat(
    [
      {
        role: "system",
        content: `Summarize this callback request for an internal medicine reception team.
Return JSON only with these exact keys:
reasonForContact, summary, urgency, recommendedFollowUp.
urgency must be Low, Medium, or High.
Never diagnose or prescribe.

Clinic data:
${JSON.stringify(brainFile, null, 2)}`,
      },
      {
        role: "user",
        content: transcript,
      },
    ],
    { maxTokens: 300, temperature: 0.1, responseFormat: { type: "json_object" } }
  );

  try {
    return normalizeSummary(JSON.parse(content) as Partial<CallbackSummary>, messages);
  } catch (error) {
    console.error("Callback summary JSON parse error:", error);
    return fallbackSummary(messages);
  }
}

function normalizeSummary(summary: Partial<CallbackSummary>, messages: ChatMessage[]): CallbackSummary {
  const urgency = summary.urgency === "High" || summary.urgency === "Medium" || summary.urgency === "Low" ? summary.urgency : "Medium";

  return {
    reasonForContact: summary.reasonForContact || inferReason(messages),
    summary: summary.summary || "Patient requested a callback from the reception team.",
    urgency,
    recommendedFollowUp: summary.recommendedFollowUp || "Reception should contact the patient during business hours.",
  };
}

function fallbackSummary(messages: ChatMessage[]): CallbackSummary {
  return {
    reasonForContact: inferReason(messages),
    summary: "Patient requested a callback through the AI assistant.",
    urgency: hasMedicalConcern(messages) ? "Medium" : "Low",
    recommendedFollowUp: "Reception should contact the patient during business hours.",
  };
}

function inferReason(messages: ChatMessage[]) {
  const transcript = messages.map((message) => message.content).join(" ").toLowerCase();
  if (transcript.includes("appointment") || transcript.includes("schedule") || transcript.includes("book")) {
    return "Appointment or scheduling question";
  }
  if (hasMedicalConcern(messages)) return "Medical concern or symptoms discussed";
  if (transcript.includes("insurance")) return "Insurance question";
  if (transcript.includes("form")) return "Patient forms question";
  return "Callback requested";
}

function hasMedicalConcern(messages: ChatMessage[]) {
  const transcript = messages.map((message) => message.content).join(" ").toLowerCase();
  return /\b(pain|headache|fever|cough|fatigue|dizzy|nausea|symptom|medication|prescription)\b/.test(transcript);
}
