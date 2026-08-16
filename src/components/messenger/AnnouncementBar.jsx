export default function AnnouncementBar() {
  return (
    <div
      className="flex items-center justify-center w-full px-6 py-[13px] text-center"
      style={{
        backgroundImage:
          'linear-gradient(90deg, rgb(255, 222, 254) 0%, rgb(255, 103, 249) 16.177%, rgb(172, 57, 248) 32.354%, rgb(149, 44, 246) 56.991%, rgb(99, 40, 241) 78.495%, rgb(234, 225, 255) 100%)',
      }}
    >
      <div className="flex flex-wrap items-center justify-center gap-3 text-white text-[16px] md:text-[20px] tracking-[-1px]">
        <p>Meet us at the Bharat tex event in Delhi on 22nd August</p>
        <a href="#" className="underline underline-offset-2">
          Know More
        </a>
      </div>
    </div>
  )
}
