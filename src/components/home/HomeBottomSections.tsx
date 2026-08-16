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
  notificationCheckIcon,
  contactArcLarge,
  contactEllipse2290,
  contactArcMid,
  contactArcSmall,
  contactCheckVector,
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
        className="bg-[#f8f9fb] h-[698px] overflow-hidden relative rounded-[24px] shrink-0 w-[1240px] scroll-mt-[24px]"
      >
        <h2 className="-translate-y-1/2 absolute font-normal text-[#040404] text-[42px] left-[33px] top-[60px] tracking-[-1px] w-[274px] m-0 leading-[44px]">
          Get in touch
        </h2>
        {submitted ? (
          <>
            {/* 1:1 port of Figma frame 2043683740 (node 82:396), pulled via
                get_design_context — white card, radial-arc illustration built
                from 4 stacked SVG layers (get_motion_context node 82:398/401/
                402/404), and the notification chip (node 82:406). */}
            <div className="absolute left-[534px] top-[60px] h-[559px] w-[612px] overflow-hidden rounded-[30px] bg-white">
              <div className="absolute left-[-457px] top-[-134px] h-[794px] w-[1440px] overflow-hidden bg-gradient-to-t from-[rgba(192,192,192,0.44)] to-white">
                <div className="contact-layer-in absolute left-[-201px] top-[-156px] size-[1843px]">
                  <div className="absolute inset-[-6.12%_-6.41%_-5.54%_-6.47%]">
                    <img alt="" className="block max-w-none size-full" src={contactArcLarge} />
                  </div>
                </div>
                <div className="contact-layer-in contact-delay-1 absolute left-[245px] top-[237px] size-[1043.107px]">
                  <img alt="" className="absolute inset-0 block size-full max-w-none" src={contactEllipse2290} />
                </div>
                <div className="contact-layer-in contact-delay-2 absolute left-[245px] top-[349px] size-[1043.107px]">
                  <img alt="" className="absolute inset-0 block size-full max-w-none" src={contactArcMid} />
                </div>
                <div className="contact-layer-in contact-delay-3 absolute left-[245px] top-[499px] size-[1043.107px]">
                  <img alt="" className="absolute inset-0 block size-full max-w-none" src={contactArcSmall} />
                </div>
                <div className="contact-layer-in contact-delay-4 absolute left-[600px] top-[323px] flex h-[162px] w-[355px] flex-col items-center justify-center rounded-[16px] bg-[rgba(255,255,255,0.55)] px-[24px] py-[10px]">
                  <div className="flex w-full items-start gap-[18px]">
                    <div className="relative size-[38px] shrink-0 overflow-hidden rounded-[10px]">
                      <img alt="" className="pointer-events-none absolute inset-0 size-full object-cover" src={notificationCheckIcon} />
                      <div className="absolute left-[7.89%] right-[7.89%] top-[3px] aspect-square">
                        <div className="absolute inset-[29.69%_17.19%_23.44%_17.19%]">
                          <div className="absolute inset-[-5.79%_-4.13%]">
                            <img alt="" className="block max-w-none size-full" src={contactCheckVector} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="min-w-px flex-1 overflow-hidden">
                      <p className="m-0 text-[24px] leading-[28px] text-black">
                        Thank you {values.fullName.trim() || "there"} !!
                      </p>
                      <p className="m-0 text-[24px] font-light leading-[28px] text-black">
                        Our sales team shall connect with you soon
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setValues({ email: "", fullName: "", companyName: "", source: "" });
              }}
              className="absolute left-[534px] top-[634px] w-[612px] cursor-pointer border-none bg-transparent text-center text-[14px] text-[#5a3d99] underline"
            >
              Send another message
            </button>
          </>
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
                        : "border-[#8a8a8a]/40 hover:border-[#040404]/60 focus:border-[#040404]"
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
              className="absolute bg-[#040404] border border-[#040404] border-solid flex h-[52px] items-center justify-center left-[534px] px-[8px] py-[4px] rounded-[12px] top-[554px] w-[612px] cursor-pointer hover:bg-[#232323] hover:scale-[1.01] active:scale-[0.99] transition-all"
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
