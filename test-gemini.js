import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

console.log("API Key:", process.env.GEMINI_API_KEY);
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

async function test() {
    try {
        const response = await ai.models.generateContent({
            model: "models/gemini-3-flash-preview",
            contents: "Say Hello World",
        });

        console.log(response.text);
    } catch (err) {
        console.error(err);
    }
}

test();