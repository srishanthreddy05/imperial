import nodemailer from "nodemailer";

const host = process.env.BREVO_SMTP_HOST || "smtp-relay.brevo.com";
const port = parseInt(process.env.BREVO_SMTP_PORT || "587", 10);
const user = process.env.BREVO_SMTP_USER || "";
const pass = process.env.BREVO_SMTP_PASSWORD || "";

export const transporter = nodemailer.createTransport({
  host,
  port,
  secure: port === 465, // true for 465, false for 587 or others
  auth: {
    user,
    pass,
  },
});

export const mailFrom = process.env.EMAIL_FROM || "info@imperialcareinternalmedicine.com";
