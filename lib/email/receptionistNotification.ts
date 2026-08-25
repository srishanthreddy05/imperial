import { mailFrom, transporter } from "@/lib/email/brevo";
import type { GeminiResponse } from "@/lib/gemini/types";

// ─── Config ───────────────────────────────────────────────────────────────────

const RECEPTION_EMAIL =
  process.env.RECEPTION_EMAIL || "srishanthreddyy05@gmail.com";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatTimestamp(iso?: string): string {
  try {
    return new Date(iso ?? Date.now()).toLocaleString("en-US", {
      dateStyle: "full",
      timeStyle: "short",
      timeZone: "America/Chicago",
    });
  } catch {
    return iso ?? new Date().toISOString();
  }
}

function orNone(val?: string): string {
  return val && val.trim() ? val.trim() : "Not provided";
}

// ─── Shared HTML wrapper ──────────────────────────────────────────────────────

function htmlWrapper(title: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background: #F4F6F8; color: #333; margin: 0; padding: 0; }
    .wrapper { width: 100%; background: #F4F6F8; padding: 40px 0; }
    .container { max-width: 620px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,.06); border: 1px solid #E2E8F0; }
    .header { background: #005EB8; padding: 28px 30px; text-align: center; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 700; color: #fff; }
    .header p { margin: 6px 0 0; font-size: 13px; color: rgba(255,255,255,.8); }
    .content { padding: 30px; }
    .section { margin-bottom: 28px; }
    .section-title { font-size: 11px; font-weight: 800; color: #005EB8; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #EDF2F7; padding-bottom: 6px; margin-bottom: 14px; }
    table { width: 100%; border-collapse: collapse; }
    th { width: 160px; font-size: 13px; color: #718096; font-weight: 600; padding: 8px 0; vertical-align: top; text-align: left; }
    td { font-size: 13px; color: #2D3748; font-weight: 500; padding: 8px 0; vertical-align: top; }
    td a { color: #005EB8; text-decoration: none; }
    .badge { display: inline-block; padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: 700; text-transform: uppercase; }
    .badge-blue { background: #EBF8FF; color: #2B6CB0; }
    .badge-green { background: #C6F6D5; color: #22543D; }
    .summary-box { background: #F7FAFC; border-left: 4px solid #005EB8; border-radius: 4px; padding: 14px 16px; font-size: 13px; color: #4A5568; line-height: 1.6; }
    .footer { background: #EDF2F7; padding: 18px; text-align: center; font-size: 11px; color: #718096; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      ${body}
      <div class="footer">
        <p>This is an automated notification from the Imperial Care AI Receptionist.</p>
        <p>Do not reply to this email — contact the patient directly using the details above.</p>
      </div>
    </div>
  </div>
</body>
</html>`;
}

// ─── Appointment Notification ─────────────────────────────────────────────────

interface AppointmentEmailInput {
  geminiResponse: GeminiResponse;
  conversationId: string;
  timestamp: string;
}

export async function sendAppointmentNotification(
  input: AppointmentEmailInput
): Promise<void> {
  const { geminiResponse: r, conversationId, timestamp } = input;

  const body = `
    <div class="header">
      <h1>📅 Appointment Request</h1>
      <p>A patient has completed an appointment request via the AI Receptionist.</p>
    </div>
    <div class="content">

      <div class="section">
        <div class="section-title">Patient Information</div>
        <table>
          <tr><th>Name</th><td>${orNone(r.patient.name)}</td></tr>
          <tr><th>Phone</th><td><a href="tel:${r.patient.phone}">${orNone(r.patient.phone)}</a></td></tr>
          <tr><th>Email</th><td><a href="mailto:${r.patient.email}">${orNone(r.patient.email)}</a></td></tr>
        </table>
      </div>

      <div class="section">
        <div class="section-title">Appointment Details</div>
        <table>
          <tr><th>Requested Provider</th><td>${orNone(r.appointment.provider)}</td></tr>
          <tr><th>Reason for Visit</th><td>${orNone(r.appointment.reason)}</td></tr>
          <tr><th>Preferred Date</th><td><strong>${orNone(r.appointment.preferredDate)}</strong></td></tr>
          <tr><th>Preferred Time</th><td><strong>${orNone(r.appointment.preferredTime)}</strong></td></tr>
        </table>
      </div>

      <div class="section">
        <div class="section-title">Conversation Summary</div>
        <div class="summary-box">${orNone(r.summary)}</div>
      </div>

      <div class="section">
        <div class="section-title">Request Metadata</div>
        <table>
          <tr><th>Intent</th><td><span class="badge badge-blue">${r.intent}</span></td></tr>
          <tr><th>Confidence</th><td>${Math.round(r.confidence * 100)}%</td></tr>
          <tr><th>Conversation ID</th><td style="font-family:monospace;font-size:12px">${conversationId}</td></tr>
          <tr><th>Submitted At</th><td>${formatTimestamp(timestamp)}</td></tr>
        </table>
      </div>

    </div>`;

  await transporter.sendMail({
    from: `"Imperial Care AI Receptionist" <${mailFrom}>`,
    to: RECEPTION_EMAIL,
    subject: `📅 Appointment Request — ${orNone(r.patient.name)}`,
    html: htmlWrapper("Appointment Request — Imperial Care", body),
    text: buildAppointmentPlainText(input),
  });
}

function buildAppointmentPlainText(input: AppointmentEmailInput): string {
  const r = input.geminiResponse;
  return `APPOINTMENT REQUEST — Imperial Care AI Receptionist

PATIENT INFORMATION
Name: ${orNone(r.patient.name)}
Phone: ${orNone(r.patient.phone)}
Email: ${orNone(r.patient.email)}

APPOINTMENT DETAILS
Requested Provider: ${orNone(r.appointment.provider)}
Reason: ${orNone(r.appointment.reason)}
Preferred Date: ${orNone(r.appointment.preferredDate)}
Preferred Time: ${orNone(r.appointment.preferredTime)}

CONVERSATION SUMMARY
${orNone(r.summary)}

Conversation ID: ${input.conversationId}
Submitted At: ${formatTimestamp(input.timestamp)}
`;
}

// ─── Callback Notification ────────────────────────────────────────────────────

interface CallbackEmailInput {
  geminiResponse: GeminiResponse;
  conversationId: string;
  timestamp: string;
}

export async function sendCallbackNotification(
  input: CallbackEmailInput
): Promise<void> {
  const { geminiResponse: r, conversationId, timestamp } = input;

  const body = `
    <div class="header">
      <h1>📞 Callback Request</h1>
      <p>A patient has requested a callback via the AI Receptionist.</p>
    </div>
    <div class="content">

      <div class="section">
        <div class="section-title">Patient Information</div>
        <table>
          <tr><th>Name</th><td>${orNone(r.patient.name)}</td></tr>
          <tr><th>Phone</th><td><a href="tel:${r.patient.phone}">${orNone(r.patient.phone)}</a></td></tr>
          <tr><th>Email</th><td><a href="mailto:${r.patient.email}">${orNone(r.patient.email)}</a></td></tr>
        </table>
      </div>

      <div class="section">
        <div class="section-title">Callback Details</div>
        <table>
          <tr><th>Reason</th><td>${orNone(r.callback.reason)}</td></tr>
          <tr><th>Preferred Callback Time</th><td><strong>${orNone(r.callback.preferredTime)}</strong></td></tr>
        </table>
      </div>

      <div class="section">
        <div class="section-title">Conversation Summary</div>
        <div class="summary-box">${orNone(r.summary)}</div>
      </div>

      <div class="section">
        <div class="section-title">Request Metadata</div>
        <table>
          <tr><th>Intent</th><td><span class="badge badge-green">callback</span></td></tr>
          <tr><th>Confidence</th><td>${Math.round(r.confidence * 100)}%</td></tr>
          <tr><th>Conversation ID</th><td style="font-family:monospace;font-size:12px">${conversationId}</td></tr>
          <tr><th>Submitted At</th><td>${formatTimestamp(timestamp)}</td></tr>
        </table>
      </div>

    </div>`;

  await transporter.sendMail({
    from: `"Imperial Care AI Receptionist" <${mailFrom}>`,
    to: RECEPTION_EMAIL,
    subject: `📞 Callback Request — ${orNone(r.patient.name)}`,
    html: htmlWrapper("Callback Request — Imperial Care", body),
    text: buildCallbackPlainText(input),
  });
}

function buildCallbackPlainText(input: CallbackEmailInput): string {
  const r = input.geminiResponse;
  return `CALLBACK REQUEST — Imperial Care AI Receptionist

PATIENT INFORMATION
Name: ${orNone(r.patient.name)}
Phone: ${orNone(r.patient.phone)}
Email: ${orNone(r.patient.email)}

CALLBACK DETAILS
Reason: ${orNone(r.callback.reason)}
Preferred Callback Time: ${orNone(r.callback.preferredTime)}

CONVERSATION SUMMARY
${orNone(r.summary)}

Conversation ID: ${input.conversationId}
Submitted At: ${formatTimestamp(input.timestamp)}
`;
}

// ─── General Contact Notification ────────────────────────────────────────────

interface ContactEmailInput {
  geminiResponse: GeminiResponse;
  conversationId: string;
  timestamp: string;
}

export async function sendContactNotification(
  input: ContactEmailInput
): Promise<void> {
  const { geminiResponse: r, conversationId, timestamp } = input;

  const body = `
    <div class="header">
      <h1>📬 Patient Enquiry</h1>
      <p>A patient provided contact information during an AI chat session.</p>
    </div>
    <div class="content">

      <div class="section">
        <div class="section-title">Patient Information</div>
        <table>
          <tr><th>Name</th><td>${orNone(r.patient.name)}</td></tr>
          <tr><th>Phone</th><td><a href="tel:${r.patient.phone}">${orNone(r.patient.phone)}</a></td></tr>
          <tr><th>Email</th><td><a href="mailto:${r.patient.email}">${orNone(r.patient.email)}</a></td></tr>
        </table>
      </div>

      <div class="section">
        <div class="section-title">Enquiry Details</div>
        <table>
          <tr><th>Topic</th><td><span class="badge badge-blue">${r.intent}</span></td></tr>
        </table>
      </div>

      <div class="section">
        <div class="section-title">Conversation Summary</div>
        <div class="summary-box">${orNone(r.summary)}</div>
      </div>

      <div class="section">
        <div class="section-title">Metadata</div>
        <table>
          <tr><th>Conversation ID</th><td style="font-family:monospace;font-size:12px">${conversationId}</td></tr>
          <tr><th>Submitted At</th><td>${formatTimestamp(timestamp)}</td></tr>
        </table>
      </div>

    </div>`;

  await transporter.sendMail({
    from: `"Imperial Care AI Receptionist" <${mailFrom}>`,
    to: RECEPTION_EMAIL,
    subject: `📬 Patient Enquiry (${r.intent}) — ${orNone(r.patient.name)}`,
    html: htmlWrapper("Patient Enquiry — Imperial Care", body),
  });
}
