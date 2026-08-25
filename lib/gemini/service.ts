import { callGeminiChat, hasGeminiApiKey } from "@/lib/gemini/client";
import { buildSystemPrompt } from "@/lib/gemini/prompt";
import type { ChatMessage, GeminiResponse, ConversationIntent } from "@/lib/gemini/types";

// ─── Fallback Response ────────────────────────────────────────────────────────

function buildFallbackResponse(userMessage: string): GeminiResponse {
  const lower = userMessage.toLowerCase();

  let assistantResponse =
    "I'm sorry, I'm having a moment of trouble. For immediate help, please call us at (903) 957-0417.";

  if (/hour|open|close/i.test(lower)) {
    assistantResponse =
      "Our Sherman office is open Monday through Thursday, 8:00 AM – 5:00 PM (Fridays for telephone appointments upon request). Anna Clinic is by appointment only on alternating Fridays. For details, please call (903) 957-0417.";
  } else if (/location|address|where/i.test(lower)) {
    assistantResponse =
      "We have two locations: Anna Clinic at 450 N Standridge Blvd, Suite 104 (by appointment only on alternating Fridays) and Sherman Clinic at 1700 N Travis St. For directions, call us at (903) 957-0417.";
  } else if (/appointment|schedule|book/i.test(lower)) {
    assistantResponse =
      "I'd be happy to help you schedule an appointment. Please call our office at (903) 957-0417, or continue chatting and I'll collect your details.";
  } else if (/insurance/i.test(lower)) {
    assistantResponse =
      "For insurance questions, please call our office at (903) 957-0417 so our reception team can confirm the latest details.";
  }

  return {
    assistantResponse,
    intent: "general_question",
    confidence: 0.5,
    patient: { name: "", phone: "", email: "" },
    appointment: { provider: "", reason: "", preferredDate: "", preferredTime: "" },
    callback: { requested: false, reason: "", preferredTime: "" },
    summary: "The patient sent a message but the AI could not process it at this time.",
    isComplete: false,
    missingFields: [],
  };
}

// ─── JSON Parser ──────────────────────────────────────────────────────────────

/**
 * Attempts to extract and parse the JSON object from Gemini's raw text.
 * Gemini with responseMimeType="application/json" should return clean JSON,
 * but we defensively strip any surrounding whitespace or code fences.
 */
function parseGeminiJson(raw: string): GeminiResponse | null {
  // Strip markdown code fences if present (defensive)
  let cleaned = raw
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```\s*$/, "")
    .trim();

  // Extract the first {...} block if there's surrounding text
  const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
  if (jsonMatch) cleaned = jsonMatch[0];

  try {
    const parsed = JSON.parse(cleaned) as Partial<GeminiResponse>;
    return normalizeGeminiResponse(parsed);
  } catch {
    return null;
  }
}

// ─── Response Normaliser ──────────────────────────────────────────────────────

const VALID_INTENTS: ConversationIntent[] = [
  "appointment",
  "callback",
  "insurance",
  "billing",
  "medical_records",
  "prescription_refill",
  "lab_results",
  "provider_information",
  "location",
  "office_hours",
  "general_question",
  "emergency",
  "other",
];

function normalizeGeminiResponse(parsed: Partial<GeminiResponse>): GeminiResponse {
  const intent: ConversationIntent =
    VALID_INTENTS.includes(parsed.intent as ConversationIntent)
      ? (parsed.intent as ConversationIntent)
      : "other";

  const confidence =
    typeof parsed.confidence === "number" &&
    parsed.confidence >= 0 &&
    parsed.confidence <= 1
      ? parsed.confidence
      : 0.8;

  return {
    assistantResponse:
      typeof parsed.assistantResponse === "string" && parsed.assistantResponse.trim()
        ? parsed.assistantResponse.trim()
        : "I'm here to help. Could you tell me a bit more about what you need?",

    intent,
    confidence,

    patient: {
      name: parsed.patient?.name ?? "",
      phone: parsed.patient?.phone ?? "",
      email: parsed.patient?.email ?? "",
    },

    appointment: {
      provider: parsed.appointment?.provider ?? "",
      reason: parsed.appointment?.reason ?? "",
      preferredDate: parsed.appointment?.preferredDate ?? "",
      preferredTime: parsed.appointment?.preferredTime ?? "",
    },

    callback: {
      requested: Boolean(parsed.callback?.requested),
      reason: parsed.callback?.reason ?? "",
      preferredTime: parsed.callback?.preferredTime ?? "",
    },

    summary:
      typeof parsed.summary === "string" && parsed.summary.trim()
        ? parsed.summary.trim()
        : "",

    isComplete: Boolean(parsed.isComplete),

    missingFields: Array.isArray(parsed.missingFields)
      ? parsed.missingFields.filter((f) => typeof f === "string")
      : [],
  };
}

// ─── GeminiService ────────────────────────────────────────────────────────────

/**
 * The ONLY public interface to Gemini in this codebase.
 * The rest of the application must call GeminiService.chat() — never the client directly.
 */
export const GeminiService = {
  /**
   * Sends the full conversation history to Gemini and returns a structured response.
   * Always returns a valid GeminiResponse — never throws to the caller.
   */
  async chat(messages: ChatMessage[]): Promise<GeminiResponse> {
    const lastUserMessage = [...messages].reverse().find((m) => m.role === "user");
    const userText = lastUserMessage?.content ?? "";

    if (!hasGeminiApiKey()) {
      console.warn("[GeminiService] GEMINI_API_KEY is not set. Using fallback response.");
      return buildFallbackResponse(userText);
    }

    try {
      const systemPrompt = buildSystemPrompt();
      const rawText = await callGeminiChat(messages, systemPrompt, {
        maxOutputTokens: 1024,
        temperature: 0.3,
      });

      const parsed = parseGeminiJson(rawText);
      if (!parsed) {
        console.error("[GeminiService] Failed to parse Gemini JSON response:", rawText.slice(0, 300));
        return buildFallbackResponse(userText);
      }

      return parsed;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error("[GeminiService] Error calling Gemini:", message);

      // Return a graceful fallback instead of crashing the chat
      return buildFallbackResponse(userText);
    }
  },
};
