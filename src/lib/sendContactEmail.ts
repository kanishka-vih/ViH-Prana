import emailjs from "@emailjs/browser";

// EmailJS sends straight from the browser (no backend needed), but that
// means the destination address itself is configured in the EmailJS
// template dashboard, not passed from here — to_email is included as a
// template variable in case the template's "To Email" field is set to
// {{to_email}} rather than a hardcoded address.
const SALES_EMAIL = "sales@vihmetaverse.com";

export type ContactFormPayload = {
  email: string;
  fullName: string;
  companyName: string;
  source?: string;
};

// Configured via .env.local (see .env.example) — VITE_EMAILJS_SERVICE_ID,
// VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY come from an
// EmailJS account (emailjs.com): an Email Service connected to the
// sales@vihmetaverse.com inbox, and a Template whose body references
// {{from_email}}, {{from_name}}, {{company_name}}, {{source}}.
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export async function sendContactEmail(payload: ContactFormPayload) {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    throw new Error(
      "EmailJS is not configured — set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in .env.local (see .env.example)."
    );
  }

  await emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      to_email: SALES_EMAIL,
      from_email: payload.email,
      from_name: payload.fullName,
      company_name: payload.companyName,
      source: payload.source || "Not provided",
    },
    { publicKey: PUBLIC_KEY }
  );
}
