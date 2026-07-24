import { mailFrom, transporter } from "@/lib/email/brevo";
import type { ChatMessage } from "@/lib/chat/receptionist";
import type { CallbackSummary } from "@/lib/summary/callbackSummary";

const RECEPTION_EMAIL = "srishanthreddyy05@gmail.com";

interface CallbackEmailInput {
  patientName: string;
  phone: string;
  email: string;
  preferredCallbackTime: string;
  summary: CallbackSummary;
  conversation: ChatMessage[];
  requestedAt: string;
}

export async function sendCallbackRequestEmail(input: CallbackEmailInput) {
  await transporter.sendMail({
    from: `"Imperial Care AI Assistant" <${mailFrom}>`,
    to: RECEPTION_EMAIL,
    subject: "New Callback Request - AI Assistant",
    text: buildCallbackRequestEmailText(input),
  });
}

function buildCallbackRequestEmailText(input: CallbackEmailInput) {
  const transcript = input.conversation
    .map((message) => `${message.role === "user" ? "Patient" : "Assistant"}:\n${message.content}`)
    .join("\n\n");

  return `Patient Information

Name: ${input.patientName}
Phone: ${input.phone}
Email: ${input.email}
  Preferred Callback Time: ${input.preferredCallbackTime || "Not provided"}

--------------------------------

Conversation Summary

Reason For Contact
${input.summary.reasonForContact}

Urgency
${input.summary.urgency}

Recommended Follow-up
${input.summary.recommendedFollowUp}

Summary
${input.summary.summary}

--------------------------------

Conversation Transcript

${transcript}

--------------------------------

Requested At

${input.requestedAt}
`;
}
