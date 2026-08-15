import { useState } from "react";
import {
  weuiArrowOutlined,
  siQuoteFill,
  solarArrowUpOutline,
  images2,
  a5e5bd2a,
  bsnlLogo1,
  images11,
  images21,
  images31,
  images41,
  vector4,
  group5,
  group6,
  group7,
  vector5,
  vector6,
  vector7,
  group1707491469,
} from "../../assets";
import CccaaaSection from "./CccaaaSection";
import { scrollToContactForm, CONTACT_FORM_ID } from "../../lib/scrollToContact";

type FormValues = {
  email: string;
  fullName: string;
  companyName: string;
  source: string;
};

const formFields: { key: keyof FormValues; label: string; optional?: boolean; type?: string }[] = [
  { key: "email", label: "Email", type: "email" },
  { key: "fullName", label: "Full Name" },
  { key: "companyName", label: "Company Name" },
  { key: "source", label: "How did you know about us ?", optional: true },
];

const footerLinks = ["About us", "ViH Shruti", "ViH Viveka", "ViH Messenger "];

export default function HomeBottomSections() {
  const [values, setValues] = useState<FormValues>({
    email: "",
    fullName: "",
    companyName: "",
    source: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange =
    (key: keyof FormValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((v) => ({ ...v, [key]: e.target.value }));
      setErrors((er) => ({ ...er, [key]: undefined }));
    };

  const validateAndSubmit = () => {
    const nextErrors: Partial<Record<keyof FormValues, string>> = {};
    if (!values.email.trim()) nextErrors.email = "Required";
    if (!values.fullName.trim()) nextErrors.fullName = "Required";
    if (!values.companyName.trim()) nextErrors.companyName = "Required";
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    // No backend is wired up yet — this just confirms the submission locally.
    // Hook this up to a real endpoint/email service when one exists.
    setSubmitted(true);
  };

  // The "Send" button is a sibling of <form> (both absolutely positioned
  // independently, matching the original design), not a descendant of it,
  // so it needs its own click handler rather than the form's submit event.
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validateAndSubmit();
  };

  return (
    <div className="flex flex-col gap-[135px] items-center w-full">
      {/* CCCAAA panel — pinned while scrolling through the letter reveal */}
      <CccaaaSection />

      {/* Testimonial */}
      <div className="flex flex-col gap-[144px] items-end shrink-0 w-[1240px]">
        <div className="flex flex-col gap-[75px] items-end w-full relative">
          <h2 className="font-light text-[#040404] text-[36px] tracking-[-1px] w-full m-0 leading-[48px]">
            We're proud to partner with industry leaders and global innovators here's what
            they're saying about working with ViH Metaverse
          </h2>
          <button
            type="button"
            onClick={scrollToContactForm}
            className="absolute bg-[#232323] flex gap-[10px] h-[45px] items-center justify-center left-0 px-[16px] py-[8px] rounded-[8px] top-[126px] cursor-pointer"
          >
            <span className="font-medium text-[16px] text-white">Contact sales</span>
            <img alt="" className="h-[33px] w-[16.5px]" src={weuiArrowOutlined} />
          </button>
          <div className="bg-[rgba(138,138,139,0.03)] flex items-start justify-between px-[45px] py-[24px] rounded-[8px] shrink-0 w-[756px]">
            <div className="flex flex-col gap-[24px] items-center shrink-0 w-[161px]">
              <div className="flex flex-col items-center w-full">
                <img alt="" className="size-[80px]" src={siQuoteFill} />
                <div className="flex flex-col items-center text-[#040404] text-[18px] text-center tracking-[-1px]">
                  <p className="m-0 leading-[41px]">Mukesh Ambani</p>
                  <p className="m-0 leading-[41px]">Chairman of RIL</p>
                </div>
              </div>
              <div className="flex gap-[13px] items-center">
                <div className="bg-[rgba(191,191,191,0.25)] flex items-center justify-center p-[6px] rounded-[26px]">
                  <img alt="" className="size-[20px] rotate-[270deg]" src={solarArrowUpOutline} />
                </div>
                <div className="bg-[rgba(191,191,191,0.25)] flex items-center justify-center p-[6px] rounded-[26px]">
                  <img alt="" className="size-[20px] rotate-90" src={solarArrowUpOutline} />
                </div>
              </div>
            </div>
            <p className="text-[#040404] text-[24px] text-right tracking-[-1px] w-[476px] m-0 leading-[33px]">
              ViH's integration of the Reliance Research Suite was simple, enjoyable, and
              impactful. Their team has a deep technical understanding and knows the AI market
              inside out, which made the entire process smooth and fun.
            </p>
          </div>
        </div>

        {/* Partner logos */}
        <div className="flex flex-col gap-[24px] items-start justify-center opacity-90 w-full">
          <div className="flex items-start justify-between opacity-80 w-full">
            <img alt="" className="h-[106px] w-[205px] object-contain" src={images11} />
            <img alt="" className="h-[70px] w-[197px] object-contain" src={images21} />
            <img alt="" className="h-[90px] w-[166px] object-contain" src={images31} />
            <img alt="" className="h-[93px] w-[188px] object-contain" src={images41} />
          </div>
          <div className="flex items-end justify-between w-full">
            <div className="flex items-center justify-between opacity-80 w-[867px]">
              <img alt="" className="h-[83px] w-[167px] object-contain" src={images2} />
              <img alt="" className="h-[66px] w-[205px] object-contain" src={a5e5bd2a} />
              <img alt="" className="h-[87px] w-[160px] object-contain" src={bsnlLogo1} />
            </div>
            <p className="font-['Roboto_Mono'] font-semibold text-[#9f3bf6] text-[40px] text-right tracking-[-1px] w-[293px] m-0 leading-[33px]">
              and 100+
            </p>
          </div>
        </div>
      </div>

      {/* Contact form */}
      <div
        id={CONTACT_FORM_ID}
        className="bg-[rgba(208,208,208,0.35)] h-[698px] overflow-hidden relative rounded-[24px] shrink-0 w-[1240px] scroll-mt-[24px]"
      >
        <h2 className="-translate-y-1/2 absolute font-normal text-[#040404] text-[42px] left-[33px] top-[60px] tracking-[-1px] w-[274px] m-0 leading-[44px]">
          Get in touch
        </h2>
        {submitted ? (
          <div className="contact-success-in absolute left-[534px] top-[60px] h-[578px] w-[612px] overflow-hidden rounded-[24px]">
            {/* The real Figma illustration: 3 identical 1043.107px circles
                (confirmed via dev-mode inspector on "Ellipse 2290"), each a
                radial-gradient from the page's own #EDEDED out to a
                different end color (#7E0DE1 violet, #3084F1 blue, #B15BFC
                lilac), stacked at different vertical offsets so each one's
                cap peeks out by a different amount — that's what builds up
                the layered color bands, not a single flat gradient. */}
            <div className="absolute inset-0 bg-[#EDEDED]" />
            {/* Each circle's own wrapper handles centering (translateX)
                separately from the bounce (scale-only) animation, so the
                bounce doesn't clobber the centering transform. All 3 share
                the exact same animation, unstaggered, so they pop in as one
                synchronized moment. A soft blur on each circle (plus tight
                overlap between them) blends the seams into gradients
                instead of hard-edged rainbow rings. */}
            <div className="absolute left-1/2 size-[1043px] -translate-x-1/2 blur-[70px]" style={{ top: 40 }}>
              <div
                className="contact-circle-bounce size-full rounded-full"
                style={{ background: "radial-gradient(circle at 50% 30%, #EDEDED 0%, #B15BFC 100%)" }}
              />
            </div>
            <div className="absolute left-1/2 size-[1043px] -translate-x-1/2 blur-[70px]" style={{ top: 95 }}>
              <div
                className="contact-circle-bounce size-full rounded-full"
                style={{ background: "radial-gradient(circle at 50% 30%, #EDEDED 0%, #7E0DE1 100%)" }}
              />
            </div>
            <div className="absolute left-1/2 size-[1043px] -translate-x-1/2 blur-[70px]" style={{ top: 150 }}>
              <div
                className="contact-circle-bounce size-full rounded-full"
                style={{ background: "radial-gradient(circle at 50% 30%, #EDEDED 0%, #3084F1 100%)" }}
              />
            </div>
            <div className="contact-card-pop absolute left-1/2 top-1/2 flex items-center gap-[14px] rounded-[16px] bg-white px-[22px] py-[18px] shadow-[0_20px_45px_rgba(0,0,0,0.25)]">
              <span className="flex size-[28px] shrink-0 items-center justify-center rounded-[6px] bg-[#040404]">
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                  <path
                    d="M1.5 6.5L5.5 10.5L14.5 1.5"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <div className="text-left">
                <p className="m-0 text-[16px] font-semibold text-[#040404]">
                  Thank you {values.fullName.trim() || "there"} !!
                </p>
                <p className="m-0 text-[14px] text-[#5a5a5a]">Our sales team shall connect with you soon</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setValues({ email: "", fullName: "", companyName: "", source: "" });
              }}
              className="absolute bottom-[24px] left-1/2 -translate-x-1/2 cursor-pointer border-none bg-transparent text-[14px] text-[#5a3d99] underline"
            >
              Send another message
            </button>
          </div>
        ) : (
          <>
            <form
              onSubmit={handleFormSubmit}
              className="absolute flex flex-col gap-[40px] items-start left-[534px] top-[60px] w-[612px]"
            >
              {formFields.map((field) => (
                <div className="relative flex flex-col gap-[8px] items-start w-full" key={field.key}>
                  <div className="flex justify-between items-start w-full text-[24px] tracking-[-1px]">
                    <label htmlFor={field.key} className="text-[#040404] leading-[44px]">
                      {field.label}
                    </label>
                    {field.optional && (
                      <span className="text-[#6d6c6c] leading-[44px] text-[16px]">OPTIONAL</span>
                    )}
                  </div>
                  <input
                    id={field.key}
                    type={field.type ?? "text"}
                    value={values[field.key]}
                    onChange={handleChange(field.key)}
                    className={`w-full bg-transparent border-0 border-b outline-none text-[20px] text-[#040404] pb-[8px] transition-colors ${
                      errors[field.key]
                        ? "border-[#c0392b]"
                        : "border-[#8a8a8a]/40 focus:border-[#040404]"
                    }`}
                  />
                  {/* Absolutely positioned so an error never pushes the
                      fields below it down — the Send button is a sibling
                      pinned at a fixed pixel offset, not part of this flow,
                      so any extra height here would just make it overlap
                      the last field instead. */}
                  {errors[field.key] && (
                    <span className="absolute left-0 top-full text-[#c0392b] text-[13px]">
                      {errors[field.key]}
                    </span>
                  )}
                </div>
              ))}
            </form>
            <button
              type="button"
              onClick={validateAndSubmit}
              className="absolute bg-[rgba(0,0,0,0.47)] border border-[#828282] border-solid flex h-[52px] items-center justify-center left-[534px] px-[8px] py-[4px] rounded-[12px] top-[554px] w-[612px] cursor-pointer hover:bg-[rgba(0,0,0,0.6)] transition-colors"
            >
              <span className="font-['Roboto_Mono'] font-normal text-[20px] text-white tracking-[0.12px]">
                Send
              </span>
            </button>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="h-[439px] overflow-hidden relative rounded-[24px] shrink-0 w-[1440px]">
        <div className="absolute flex items-center justify-between left-[99px] top-[40px] w-[1240px]">
          <h2 className="font-['Roboto_Condensed'] font-normal text-[#040404] text-[42px] tracking-[-1px] w-[608px] m-0 leading-[56px] text-center">
            Communication Intelligence, Reimagined.
          </h2>
          <div className="relative shrink-0 w-[161px] h-[80px]">
            <div className="absolute h-[64px] left-0 top-[2px] w-[64px]">
              <img alt="" className="block max-w-none size-full" src={vector4} />
            </div>
            <div className="absolute h-[63px] left-[18px] top-0 w-[70px]">
              <img alt="" className="block max-w-none size-full" src={group5} />
            </div>
            <div
              className="absolute h-[97px] left-[-18px] top-[-16px] w-[97px]"
              style={{ maskImage: `url("${group6}")` }}
            >
              <img alt="" className="block max-w-none size-full" src={group7} />
            </div>
            <div className="absolute h-[39px] left-[108px] top-[26px] w-[36px]">
              <img alt="" className="block max-w-none size-full" src={vector5} />
            </div>
            <div className="absolute h-[42px] left-[88px] top-[23px] w-[8px]">
              <img alt="" className="block max-w-none size-full" src={vector6} />
            </div>
            <div className="absolute h-[39px] left-[27px] top-[26px] w-[53px]">
              <img alt="" className="block max-w-none size-full" src={vector7} />
            </div>
            <div className="absolute h-[9px] left-[47px] top-[75px] w-[97px]">
              <img alt="" className="block max-w-none size-full" src={group1707491469} />
            </div>
          </div>
        </div>

        <div className="absolute flex items-center justify-between left-[100px] top-[246px] w-[1240px]">
          <div className="flex flex-col h-[125px] items-start justify-between">
            <div className="flex gap-[40px] items-center">
              {footerLinks.map((label) => (
                <a
                  key={label}
                  href="#"
                  className="flex items-center gap-[4px] text-[#080808] text-[20px] tracking-[0.12px]"
                >
                  {label}
                  <span className="rotate-45 inline-block">↗</span>
                </a>
              ))}
            </div>
            <p className="text-[20px] text-black m-0">sales@vihmetaverse.com</p>
          </div>
          <div className="flex flex-col gap-[24px] items-end text-right w-[281px]">
            <p className="font-medium text-[20px] text-black w-[265px] m-0">
              ViH Meteverse Pvt Ltd
            </p>
            <p className="text-[#03124c] text-[20px] w-[265px] m-0 leading-[26px]">
              HQ: Unit 337, JMD Megapolis, Sector 48, Sohna Road,
              <br />
              Gurugram, Haryana 122018
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
