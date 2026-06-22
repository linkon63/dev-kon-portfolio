import { Resend } from "resend";

// Server-only email sending via Resend. The API key is read from the (secret)
// RESEND_API_KEY env var; destination/sender are configurable.
const apiKey = process.env.RESEND_API_KEY;

export const CONTACT_TO_EMAIL =
  process.env.CONTACT_TO_EMAIL || "m.alinkon10@gmail.com";
export const CONTACT_FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

type ContactInput = { name: string; email: string; project: string };

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Email a new contact-form submission. Returns { sent } — `false` (rather than
 * throwing) when no API key is configured, so the public form never breaks.
 */
export async function sendContactEmail({ name, email, project }: ContactInput) {
  if (!apiKey) return { sent: false, reason: "RESEND_API_KEY not set" };

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: CONTACT_FROM_EMAIL,
    to: CONTACT_TO_EMAIL,
    replyTo: email,
    subject: `New project enquiry from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${project}`,
    html: `
      <div style="font-family:system-ui,sans-serif;line-height:1.6">
        <h2 style="margin:0 0 12px">New project enquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
        <p style="white-space:pre-wrap;margin-top:16px">${escapeHtml(project)}</p>
      </div>`,
  });

  if (error) throw new Error(error.message || "Failed to send email");
  return { sent: true };
}
