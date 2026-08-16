export default function PromoBanner() {
  return (
    <div
      className="flex flex-col items-start overflow-clip px-[444px] py-[13px] w-[1440px]"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgb(255, 222, 254) 0%, rgb(255, 103, 249) 16.177%, rgb(172, 57, 248) 32.354%, rgb(149, 44, 246) 56.991%, rgb(99, 40, 241) 78.495%, rgb(234, 225, 255) 100%)",
      }}
    >
      <div className="flex gap-[12px] items-center font-normal text-[20px] text-white tracking-[-1px] w-full">
        <p className="leading-[26px] w-[442px]">
          Meet us at the Bharat tex event in Delhi on 22nd August{" "}
        </p>
        <p className="leading-[26px] underline decoration-solid [text-underline-position:from-font] w-[97px]">
          Know More
        </p>
      </div>
    </div>
  );
}
