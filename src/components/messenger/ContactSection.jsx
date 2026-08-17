import { useRef, useState } from 'react'
import { CONTACT_FORM_ID } from '../../lib/scrollToContact'
import { sendContactEmail } from '../../lib/sendContactEmail'
import successRing1 from '../../assets/messenger-figma/success-ring-1.svg'
import successRing2 from '../../assets/messenger-figma/success-ring-2.svg'
import successRing3 from '../../assets/messenger-figma/success-ring-3.svg'
import successRing4 from '../../assets/messenger-figma/success-ring-4.svg'
import successNotificationIcon from '../../assets/messenger-figma/success-notification-icon.png'
import iconCheckSmall from '../../assets/messenger-figma/icon-check-small.svg'

const FIELDS = [
  { key: 'email', label: 'Email', type: 'email' },
  { key: 'fullName', label: 'Full Name', type: 'text' },
  { key: 'companyName', label: 'Company Name', type: 'text' },
  { key: 'howDidYouKnow', label: 'How did you know about us ?', type: 'text', optional: true },
]

function FormField({ label, optional, type, value, onChange, onKeyDown, inputRef }) {
  return (
    <div className="flex flex-col gap-4 items-start w-full">
      <div className="flex items-center justify-between w-full text-2xl tracking-[-1px]">
        <span className="text-[#040404]">{label}</span>
        {optional && <span className="text-sm text-[#6d6c6c]">OPTIONAL</span>}
      </div>
      <input
        ref={inputRef}
        type={type}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className="w-full bg-transparent text-2xl tracking-[-1px] text-[#040404] outline-none"
      />
      <div className="h-px w-full bg-[#c2c1c1]" />
    </div>
  )
}

// Ring positions/sizes below are the exact Figma pixel offsets (relative to
// the 612x559 card) converted to percentages — left/width against the card's
// width (612), top/height against its height (559). Because the card keeps
// that same 612:559 aspect ratio at any size, this reproduces the exact
// circle geometry (not distorted) no matter how the card is scaled.
function RingLayer({ src, delayClass, left, top, width, height }) {
  return (
    <img
      src={src}
      alt=""
      className={`contact-layer-in ${delayClass} absolute max-w-none`}
      style={{ left: `${left}%`, top: `${top}%`, width: `${width}%`, height: `${height}%` }}
    />
  )
}

function SuccessCard({ name }) {
  return (
    <div
      className="relative w-full max-w-[612px] overflow-hidden rounded-[30px] bg-white"
      style={{ aspectRatio: '612 / 559' }}
    >
      {/* Same contact-layer-in rise+fade HomeBottomSections.tsx uses for its
          own success-state arcs (Figma's motion spec for this exact frame,
          2043683740) — this used the same dead success-layer-1..5 classes
          the EnterpriseBenefits rings had, so these semicircles had no
          animation at all before. */}
      <div className="absolute inset-0 overflow-hidden bg-gradient-to-t from-[rgba(192,192,192,0.44)] to-white">
        <RingLayer src={successRing1} delayClass="" left={-107.52} top={-51.88} width={301.14} height={329.7} />
        <RingLayer src={successRing2} delayClass="contact-delay-1" left={-34.64} top={18.42} width={170.44} height={186.6} />
        <RingLayer src={successRing3} delayClass="contact-delay-2" left={-34.64} top={38.46} width={170.44} height={186.6} />
        <RingLayer src={successRing4} delayClass="contact-delay-3" left={-34.64} top={65.3} width={170.44} height={186.6} />

        <div
          className="contact-layer-in contact-delay-4 absolute flex flex-col justify-center gap-[18px] rounded-2xl bg-white/55 px-6 py-4"
          style={{ left: '23.37%', top: '33.81%', width: '58.01%', height: '28.98%' }}
        >
          <div className="flex gap-[18px] items-start w-full">
            <div className="relative size-[38px] shrink-0 overflow-hidden rounded-[10px]">
              <img src={successNotificationIcon} alt="" className="absolute inset-0 size-full object-cover" />
              <img src={iconCheckSmall} alt="" className="absolute inset-0 m-auto h-[17px] w-[23px]" />
            </div>
            <div className="flex flex-col">
              <p className="text-2xl leading-[28px] text-black">Thank you {name || 'there'} !!</p>
              <p className="text-2xl font-light leading-[28px] text-black">
                Our sales team shall connect with you soon
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ContactSection() {
  const [values, setValues] = useState({ email: '', fullName: '', companyName: '', howDidYouKnow: '' })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState(null)
  const inputRefs = useRef([])

  function handleChange(key) {
    return (e) => setValues((v) => ({ ...v, [key]: e.target.value }))
  }

  async function handleSubmit() {
    if (!values.email.trim() || !values.fullName.trim() || !values.companyName.trim()) return
    setSending(true)
    setSendError(null)
    try {
      await sendContactEmail({
        email: values.email,
        fullName: values.fullName,
        companyName: values.companyName,
        source: values.howDidYouKnow,
      })
      setSubmitted(true)
    } catch (err) {
      setSendError(err instanceof Error ? err.message : 'Something went wrong — please try again.')
    } finally {
      setSending(false)
    }
  }

  function handleReset() {
    setSubmitted(false)
    setSendError(null)
    setValues({ email: '', fullName: '', companyName: '', howDidYouKnow: '' })
  }

  function handleKeyDown(index) {
    return (e) => {
      if (e.key !== 'Enter') return
      e.preventDefault()
      const next = inputRefs.current[index + 1]
      if (next) {
        next.focus()
      } else {
        handleSubmit()
      }
    }
  }

  return (
    // id must match CONTACT_FORM_ID — the global header's "Contact sales"
    // button (Header.tsx, shared across every route via FixedHeader) calls
    // scrollToContactForm(), which just does
    // document.getElementById(CONTACT_FORM_ID)?.scrollIntoView(...). This
    // section had its own unrelated id="contact" before, so that click
    // silently found nothing and did nothing on /messenger.
    <section id={CONTACT_FORM_ID} className="w-full bg-white px-6 md:px-[100px]">
      <div className="flex flex-col md:flex-row gap-12 md:gap-0 justify-between w-full md:w-310 mx-auto rounded-3xl bg-[#f8f9fb] p-8 md:p-16">
        <h2 className="text-3xl md:text-[42px] leading-[44px] tracking-[-1px] text-[#040404]">
          Get in touch
        </h2>

        {submitted ? (
          <div className="flex flex-col gap-6 w-full max-w-[612px]">
            <SuccessCard name={values.fullName} />
            {/* Same reset link HomeBottomSections.tsx shows under its own
                success card ("Send another message") — this was missing
                here, so there was no way back to the form on /messenger
                short of reloading the page. */}
            <button
              type="button"
              onClick={handleReset}
              className="cursor-pointer border-none bg-transparent text-center text-sm text-[#5a3d99] underline"
            >
              Send another message
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-14 w-full max-w-[612px]">
            {FIELDS.map((field, i) => (
              <FormField
                key={field.key}
                label={field.label}
                optional={field.optional}
                type={field.type}
                value={values[field.key]}
                onChange={handleChange(field.key)}
                onKeyDown={handleKeyDown(i)}
                inputRef={(el) => (inputRefs.current[i] = el)}
              />
            ))}

            <button
              type="button"
              onClick={handleSubmit}
              disabled={sending}
              className="flex h-[52px] items-center justify-center rounded-xl border border-[#828282] bg-black/47 px-2 py-1 font-mono text-xl text-white transition-all duration-150 hover:bg-black/70 hover:border-white active:scale-95 active:bg-black/90 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {sending ? 'Sending...' : 'Send'}
            </button>
            {sendError && <span className="text-sm text-[#c0392b]">{sendError}</span>}
          </div>
        )}
      </div>
    </section>
  )
}
