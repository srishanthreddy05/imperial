export type GroqRole = "system" | "user" | "assistant";

export interface GroqMessage {
  role: GroqRole;
  content: string;
}

interface GroqChatOptions {
  maxTokens?: number;
  temperature?: number;
  responseFormat?: { type: "json_object" };
}

interface GroqChoice {
  message?: {
    content?: string;
  };
}

interface GroqResponse {
  choices?: GroqChoice[];
}

export function hasGroqApiKey() {
  const apiKey = process.env.GROQ_API_KEY;
  return Boolean(apiKey && apiKey !== "your_groq_api_key_here");
}

export async function callGroqChat(messages: GroqMessage[], options: GroqChatOptions = {}) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey || apiKey === "your_groq_api_key_here") {
    throw new Error("GROQ_API_KEY is not configured.");
  }

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "openai/gpt-oss-120b",
      messages,
      max_tokens: options.maxTokens ?? 300,
      temperature: options.temperature ?? 0.3,
      top_p: 0.9,
      response_format: options.responseFormat,
    }),
  });

  if (!response.ok) {
    throw new Error(`Groq API error: ${response.status}`);
  }

  const data = (await response.json()) as GroqResponse;
  return data.choices?.[0]?.message?.content?.trim() || "";
}
