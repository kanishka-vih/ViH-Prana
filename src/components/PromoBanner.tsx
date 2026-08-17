const EVENT_URL =
  "https://www.thebrainalytics.com/event/4th-edition-bharat-nbfc-fintech-summit-awards-2026/";

export default function PromoBanner() {
  return (
    <div
      className="flex flex-col items-center overflow-clip py-[13px] w-[1440px]"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgb(255, 222, 254) 0%, rgb(255, 103, 249) 16.177%, rgb(172, 57, 248) 32.354%, rgb(149, 44, 246) 56.991%, rgb(99, 40, 241) 78.495%, rgb(234, 225, 255) 100%)",
      }}
    >
      <div className="flex gap-[12px] items-center justify-center font-normal text-[20px] text-white tracking-[-1px] whitespace-nowrap">
        <p className="leading-[26px]">Meet us at The Brainalytics event in Delhi on 20th and 21st August</p>
        <a
          href={EVENT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="leading-[26px] underline decoration-solid [text-underline-position:from-font] text-white"
        >
          Learn More
        </a>
      </div>
    </div>
  );
}
