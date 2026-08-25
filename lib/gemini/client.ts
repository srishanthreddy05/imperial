import { GoogleGenAI } from "@google/genai";
import type { ChatMessage, GeminiCallOptions } from "@/lib/gemini/types";

// ─── Constants ────────────────────────────────────────────────────────────────

const GEMINI_MODEL = "gemini-2.5-flash";

// ─── Lazy client factory ──────────────────────────────────────────────────────
// We instantiate lazily so that a missing key causes a clear error at call time,
// not at module load time (which would crash the entire Next.js server).

let _client: GoogleGenAI | null = null;

function getClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === "" || apiKey === "your_gemini_api_key_here") {
    throw new Error("GEMINI_API_KEY is not configured.");
  }
  if (!_client) {
    _client = new GoogleGenAI({ apiKey });
  }
  return _client;
}

// ─── Guards ───────────────────────────────────────────────────────────────────

export function hasGeminiApiKey(): boolean {
  const key = process.env.GEMINI_API_KEY;
  return Boolean(key && key.trim() !== "" && key !== "your_gemini_api_key_here");
}

// ─── Low-Level Caller ─────────────────────────────────────────────────────────

/**
 * Makes a single generateContent call to Gemini via the @google/genai SDK.
 * Converts our ChatMessage[] into the SDK's content format.
 * Returns the raw text response.
 *
 * @throws Error on API errors, rate limits, or empty responses.
 */
export async function callGeminiChat(
  messages: ChatMessage[],
  systemPrompt: string,
  options: GeminiCallOptions = {}
): Promise<string> {
  const client = getClient();

  // Convert our messages to the SDK content format
  const contents = messages.map((msg) => ({
    role: msg.role === "assistant" ? ("model" as const) : ("user" as const),
    parts: [{ text: msg.content }],
  }));

  const response = await client.models.generateContent({
    model: GEMINI_MODEL,
    contents,
    config: {
      systemInstruction: systemPrompt,
      maxOutputTokens: options.maxOutputTokens ?? 1024,
      temperature: options.temperature ?? 0.3,
      responseMimeType: "application/json",
    },
  });

  const text =
    response?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? "";

  if (!text) {
    throw new Error("Gemini returned an empty response.");
  }

  return text;
}
