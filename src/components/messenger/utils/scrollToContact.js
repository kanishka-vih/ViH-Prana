import { CONTACT_FORM_ID } from '../../../lib/scrollToContact'

// Delegates to the same id ContactSection.jsx actually renders
// (CONTACT_FORM_ID / "contact-form"). This used to look up its own
// hardcoded 'contact' id, which ContactSection stopped using once its
// section id was changed to match the global header's "Contact sales"
// button — so every button importing this util (Hero.jsx,
// TestimonialsSection.jsx, Navbar.jsx) silently did nothing on click.
export function scrollToContact() {
  document.getElementById(CONTACT_FORM_ID)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
