export const CONTACT_FORM_ID = "contact-form";

export function scrollToContactForm() {
  document.getElementById(CONTACT_FORM_ID)?.scrollIntoView({ behavior: "smooth", block: "start" });
}
