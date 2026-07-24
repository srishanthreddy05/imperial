import brainFile from "@/lib/brain.json";
import { CALLBACK_DETAILS_REQUEST } from "@/lib/chat/receptionistMessages";
import type { GroqMessage } from "@/lib/groq/client";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
}

export interface PatientMemory {
  patientName?: string;
  phone?: string;
  email?: string;
  preferredCallbackTime?: string;
  reasonForContact?: string;
  symptoms: string[];
  intakeMode?: boolean;
  detailsRequested?: boolean;
  callbackRequested?: boolean;
  callbackSubmitted?: boolean;
  emailSent?: boolean;
  callbackState: "GENERAL_CHAT" | "CALLBACK_PENDING" | "CALLBACK_COLLECTING" | "CALLBACK_COMPLETED";
}

const emergencyPatterns = [
  /\bchest pain\b/i,
  /\bdifficulty breathing\b/i,
  /\bcan't breathe\b/i,
  /\bcannot breathe\b/i,
  /\bstroke\b/i,
  /\bsuicidal\b/i,
  /\bsuicide\b/i,
  /\bunconscious\b/i,
  /\bsevere bleeding\b/i,
];

const callbackOfferTriggers = [
  // Intent to speak to a person
  /speak to|talk to|human|reception|front desk/i,
  // Requesting a callback
  /call back|callback|call me/i,
  // Booking an appointment
  /appoint|schedule|booking/i,
  // Asking for a doctor or provider
  /doctor|dr\.?/i,
  // Follow-up
  /follow-up|follow up/i,
  // Symptoms
  /pain|headache|fatigue|dizzy|nausea|fever|cough|rash|sore throat|symptom/i,
];

const symptomWords = [
  "pain",
  "headache",
  "fatigue",
  "dizzy",
  "dizziness",
  "nausea",
  "fever",
  "cough",
  "rash",
  "weakness",
  "sore throat",
  "shortness of breath",
  "back pain",
  "stomach pain",
];

export function isEmergencyMessage(message: string) {
  return emergencyPatterns.some((pattern) => pattern.test(message));
}

export function shouldOfferCallback(messages: ChatMessage[], memory: PatientMemory) {
  if (memory.callbackState !== "GENERAL_CHAT") {
    return false;
  }

  const lastUserMessage = messages[messages.length - 1];
  if (lastUserMessage?.role !== "user") {
    return false;
  }

  return callbackOfferTriggers.some((pattern) => pattern.test(lastUserMessage.content));
}

export function hasAllPatientDetails(memory: PatientMemory) {
  return Boolean(memory.patientName && memory.phone && memory.email);
}

export function isValidEmail(email?: string) {
  return Boolean(email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
}

export function isValidPhone(phone?: string) {
  if (!phone) return false;
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

export function extractPatientMemory(messages: ChatMessage[], existing?: Partial<PatientMemory>): PatientMemory {
  const transcript = messages
    .filter((message) => message.role === "user")
    .map((message) => message.content)
    .join("\n");
  const email = existing?.email || transcript.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0];
  const phone = existing?.phone || transcript.match(/(?:\+?1[\s.-]?)?(?:\(?\d{3}\)?[\s.-]?)\d{3}[\s.-]?\d{4}/)?.[0];
  const patientName = existing?.patientName || extractName(transcript);
  const preferredCallbackTime = existing?.preferredCallbackTime || extractPreferredCallbackTime(transcript);
  const symptoms = Array.from(
    new Set([...(existing?.symptoms || []), ...symptomWords.filter((symptom) => transcript.toLowerCase().includes(symptom))])
  );
  const reasonForContact = existing?.reasonForContact || inferReasonForContact(transcript, symptoms);
  const callbackRequested = Boolean(existing?.callbackRequested);
  const intakeMode = Boolean(existing?.intakeMode || callbackRequested);

  return {
    patientName,
    phone,
    email,
    preferredCallbackTime,
    reasonForContact,
    symptoms,
    intakeMode,
    detailsRequested: Boolean(existing?.detailsRequested || messages.some((message) => message.content === CALLBACK_DETAILS_REQUEST)),
    callbackRequested,
    callbackSubmitted: Boolean(existing?.callbackSubmitted),
    emailSent: Boolean(existing?.emailSent),
    callbackState: existing?.callbackState || "GENERAL_CHAT",
  };
}

export function isCallbackCancellation(message: string) {
  return /^(?:no|no thanks|i don'?t need a callback|leave it|cancel|never mind|forget it)$/i.test(message.trim());
}

export function isLikelyCallbackResponse(message: string) {
  return (
    /\b(yes|sure|okay|ok|please do|go ahead|request callback|callback|call me)\b/i.test(message) ||
    /\b(my name is|name is|i am|i'm|phone|mobile|email|@|preferred callback time|best time|morning|afternoon|evening|today|tomorrow)\b/i.test(message) ||
    isLikelyStandaloneName(message)
  );
}

export function isLikelyNewQuestion(message: string) {
  return /\b(hour|hours|open|close|closing|insurance|doctor|provider|service|services|location|locations|address|form|forms|appointment|appt|schedule|book|when|where|what|how|who)\b/i.test(
    message
  );
}

export function clearCallbackState(memory: PatientMemory): PatientMemory {
  return {
    ...memory,
    patientName: undefined,
    phone: undefined,
    email: undefined,
    preferredCallbackTime: undefined,
    intakeMode: false,
    detailsRequested: false,
    callbackRequested: false,
    callbackSubmitted: false,
    emailSent: false,
    callbackState: "GENERAL_CHAT",
  };
}

function isLikelyStandaloneName(message: string) {
  const trimmed = message.trim();
  if (!trimmed || trimmed.length > 60) return false;
  if (/[@\d?]/.test(trimmed)) return false;
  if (/\b(hour|hours|open|close|insurance|doctor|provider|service|services|location|locations|address|form|forms|appointment|appt|schedule|book|when|where|what|how|who|phone|mobile|email)\b/i.test(trimmed)) {
    return false;
  }

  return /^[A-Za-z][A-Za-z'-.]*(?:\s+[A-Za-z][A-Za-z'-.]*){0,3}$/.test(trimmed);
}

function extractPreferredCallbackTime(transcript: string) {
  const explicit = transcript.match(/(?:preferred callback time|best time(?: to call)?|callback time)\s*[:\-]\s*([^.\n]+)(?:[.\n]|$)/i);
  if (explicit?.[1]) return explicit[1].trim();

  const timeLine = transcript.match(/\b(?:this morning|this afternoon|this evening|tomorrow(?: morning| afternoon| evening)?|morning|afternoon|evening|after lunch|before lunch|after work|\d{1,2}(?::\d{2})?\s?(?:am|pm))\b/i);
  return timeLine?.[0]?.trim();
}

export function buildReceptionistMessages(messages: ChatMessage[], memory: PatientMemory): GroqMessage[] {
  return [
    {
      role: "system",
      content: `You are a professional front desk receptionist for Imperial Care Internal Medicine.

Behavior:
- Answer naturally and briefly.
- Do not feel like a form.
- Never diagnose, prescribe, or claim medical certainty.
- For medical concerns, encourage the patient to speak with the provider or office.
- Never ask for name, phone, or email unless the patient has chosen to request a callback.
- If patient details are already known, do not ask for them again.
- If follow-up by a human would help, suggest that the patient can request a callback.
- Keep most replies to 1-3 short paragraphs unless the patient explicitly asks for detail.
- If the patient changes topics or cancels the callback, return to general chat immediately.
- Use only the clinic data below. If unknown, recommend calling (903) 957-0417.

Current memory:
${JSON.stringify(memory, null, 2)}

Clinic data:
${JSON.stringify(brainFile, null, 2)}`,
    },
    ...messages.slice(-12).map((message) => ({
      role: message.role,
      content: message.content,
    })),
  ];
}

export function getFallbackReceptionistReply(message: string) {
  const lower = message.toLowerCase();

  if (lower.includes("hour") || lower.includes("open") || lower.includes("time")) {
    return "Our office hours are Monday through Thursday from 8:00 AM to 5:00 PM. Fridays are reserved for telephone appointments upon request. We are closed Saturday and Sunday.";
  }

  if (lower.includes("location") || lower.includes("anna") || lower.includes("sherman") || lower.includes("address")) {
    return "We have two locations: Anna at 450 N Standridge Blvd, Suite 104, Anna, TX 75409, and Sherman at 1700 N Travis St, Sherman, TX 75092.";
  }

  if (lower.includes("form") || lower.includes("download") || lower.includes("pdf")) {
    return "You can view and download patient forms on the Patient Forms page. Available forms include the New Patient Questionnaire, Semaglutide consent form, Weight Loss Tracker, and My Progress Tracker.";
  }

  if (lower.includes("insurance") || lower.includes("medicare")) {
    return "For accepted insurance and plan-specific questions, please call our office at (903) 957-0417 so the reception team can confirm the most current details.";
  }

  if (lower.includes("semaglutide") || lower.includes("weight")) {
    return "Imperial Care offers a physician-supervised Semaglutide Weight Loss Program. The first step is a consultation so the clinical team can review whether it is appropriate for you.";
  }

  if (lower.includes("b12") || lower.includes("fatigue") || lower.includes("energy")) {
    return "We offer Vitamin B12 vitality injections. Dr. Islam or the care team can help determine whether B12 support is appropriate for your situation.";
  }

  return "I can help with services, locations, office hours, patient forms, accepted insurance, and appointment questions. What would you like to know?";
}

function extractName(transcript: string) {
  const explicit = transcript.match(/\b(?:my name is|name is|i am|i'm)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,3})\b/);
  if (explicit?.[1]) return explicit[1].trim();

  const nameLine = transcript.match(/\bname\s*[:\-]\s*([A-Za-z][A-Za-z'.-]+(?:\s+[A-Za-z][A-Za-z'.-]+){1,3})/i);
  if (nameLine?.[1]) return nameLine[1].trim();

  const lines = transcript.split(/\n+/).map((line) => line.trim());
  const likelyName = lines.find((line) => /^[A-Za-z][A-Za-z'.-]+(?:\s+[A-Za-z][A-Za-z'.-]+){1,3}$/.test(line));
  if (likelyName) return likelyName;

  const withoutContactInfo = transcript
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, " ")
    .replace(/(?:\+?1[\s.-]?)?(?:\(?\d{3}\)?[\s.-]?)\d{3}[\s.-]?\d{4}/g, " ");
  return withoutContactInfo.match(/\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,3})\b/)?.[1]?.trim();
}

function inferReasonForContact(transcript: string, symptoms: string[]) {
  const lower = transcript.toLowerCase();
  if (lower.includes("appointment") || lower.includes("schedule") || lower.includes("book")) return "Appointment request";
  if (lower.includes("callback") || lower.includes("call me")) return "Callback requested";
  if (symptoms.length > 0) return `Symptoms discussed: ${symptoms.join(", ")}`;
  if (lower.includes("doctor")) return "Provider request";
  return undefined;
}
