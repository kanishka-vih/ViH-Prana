export const CONTACT_FORM_ID = "contact-form";
// HomeBottomSections renders separate desktop (`hidden md:flex`) and mobile
// (`md:hidden`) contact-form markup rather than one shared block — they used
// to share the same id, which broke navigation on mobile: `getElementById`
// always returns the FIRST matching element in document order regardless of
// which one is actually visible, and the desktop copy comes first in the
// DOM. So on mobile, "Contact sales" was calling `scrollIntoView` on the
// desktop element, which is `display:none` there — a silent no-op, which is
// exactly why the button looked broken ("not redirecting") without ever
// throwing an error.
export const CONTACT_FORM_ID_MOBILE = "contact-form-mobile";

export function getContactFormEl(): HTMLElement | null {
  const desktop = document.getElementById(CONTACT_FORM_ID);
  if (desktop && desktop.offsetParent !== null) return desktop;
  return document.getElementById(CONTACT_FORM_ID_MOBILE);
}

export function scrollToContactForm() {
  getContactFormEl()?.scrollIntoView({ behavior: "smooth", block: "start" });
}
