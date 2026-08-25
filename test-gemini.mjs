/**
 * test-gemini.mjs
 * Minimal diagnostic test for the Gemini API.
 * Run from the project root: node test-gemini.mjs
 *
 * Checks:
 *  1. Loads .env.local via dotenv
 *  2. Verifies GEMINI_API_KEY is present
 *  3. Makes a real Gemini API call using @google/genai SDK
 *  4. Prints the response
 */

import { readFileSync } from "fs";
import { resolve } from "path";

// ── Step 1: Manual .env.local loader (dotenv is not installed — using fs) ──────
const envPath = resolve(process.cwd(), ".env.local");
let envContent;
try {
  envContent = readFileSync(envPath, "utf-8");
  console.log("✅ Step 1 — .env.local found:", envPath);
} catch {
  console.error("❌ Step 1 — .env.local NOT found at:", envPath);
  console.error(
    "   Fix: Make sure you run this script from c:\\crmthrive\\hospital-management"
  );
  process.exit(1);
}

// Parse .env.local manually
for (const line of envContent.split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const eqIndex = trimmed.indexOf("=");
  if (eqIndex === -1) continue;
  const key = trimmed.slice(0, eqIndex).trim();
  const value = trimmed.slice(eqIndex + 1).trim();
  if (!process.env[key]) process.env[key] = value;
}
console.log("✅ Step 2 — .env.local variables loaded");

// ── Step 2: Check GEMINI_API_KEY ──────────────────────────────────────────────
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey || apiKey.trim() === "" || apiKey === "your_gemini_api_key_here") {
  console.error("❌ Step 3 — GEMINI_API_KEY is not set or is a placeholder.");
  console.error("   Current value:", apiKey ?? "(undefined)");
  console.error(
    "   Fix: Add a real API key to .env.local (get one at https://aistudio.google.com/apikey)"
  );
  process.exit(1);
}
console.log(
  "✅ Step 3 — GEMINI_API_KEY is loaded:",
  apiKey.slice(0, 8) + "..." + apiKey.slice(-4)
);

// ── Step 3: Import SDK ────────────────────────────────────────────────────────
let GoogleGenAI;
try {
  const mod = await import("@google/genai");
  GoogleGenAI = mod.GoogleGenAI;
  console.log("✅ Step 4 — @google/genai SDK imported successfully");
} catch (err) {
  console.error("❌ Step 4 — Failed to import @google/genai:", err.message);
  console.error("   Fix: Run  npm install @google/genai");
  process.exit(1);
}

// ── Step 4: Make a test API call ──────────────────────────────────────────────
console.log("\n🔄 Step 5 — Making test API call to Gemini...\n");
try {
  const genai = new GoogleGenAI({ apiKey });
  const response = await genai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [{ role: "user", parts: [{ text: "Reply with only the word OK" }] }],
  });

  const text = response?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  console.log("✅ Step 5 — Gemini responded:", text);
  console.log("\n🎉 ALL CHECKS PASSED. Gemini API is working correctly.\n");
} catch (err) {
  console.error("❌ Step 5 — Gemini API call failed:", err.message);

  if (err.message?.includes("API_KEY_INVALID") || err.message?.includes("400")) {
    console.error(
      "\n   Root cause: The API key is INVALID or wrong format."
    );
    console.error(
      "   The key starting with 'AQ.' is a Vertex AI credential, not an AI Studio key."
    );
    console.error(
      "   Fix: Go to https://aistudio.google.com/apikey and generate a new key (starts with AIza...)."
    );
    console.error(
      "   Then replace GEMINI_API_KEY in .env.local with the new key."
    );
  } else if (err.message?.includes("403")) {
    console.error("\n   Root cause: Access denied. The API key may be restricted.");
  } else if (err.message?.includes("429")) {
    console.error("\n   Root cause: Rate limit hit. Wait a moment and retry.");
  } else if (err.message?.includes("ENOTFOUND") || err.message?.includes("network")) {
    console.error("\n   Root cause: Network error. Check your internet connection.");
  }
  process.exit(1);
}
