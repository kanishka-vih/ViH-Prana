import logo from '../../assets/messenger-figma/logo.svg'
import iconFooterArrow from '../../assets/messenger-figma/icon-footer-arrow.svg'

const FOOTER_LINKS = ['About us', 'ViH Shruti', 'ViH Viveka', 'ViH Kshetra']

export default function Footer() {
  return (
    <footer className="w-full bg-white px-6 md:px-[100px] pt-6 md:pt-[40px] pb-16 md:pb-[188px]">
      <div className="flex flex-col gap-12 md:gap-[92px] w-full md:w-310 mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 w-full">
          <h2 className="font-condensed font-normal text-3xl md:text-[42px] leading-[56px] tracking-[-1px] text-[#040404]">
            Communication Intelligence,
            <br />
            Reimagined.
          </h2>
          <img src={logo} alt="ViH Metaverse" className="h-[84px] w-auto shrink-0" />
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 w-full">
          <div className="flex flex-col justify-between gap-8">
            <div className="flex flex-wrap gap-x-[59px] gap-y-4">
              {FOOTER_LINKS.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="flex items-center gap-1 text-xl tracking-[0.12px] text-[#080808]"
                >
                  {link}
                  <img src={iconFooterArrow} alt="" className="size-[18px] rotate-45" />
                </a>
              ))}
            </div>
            <p className="text-xl text-black">sales@vihmetaverse.com</p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-6 text-left md:text-right">
            <p className="text-xl font-medium text-black">ViH Meteverse Pvt Ltd</p>
            <p className="text-xl leading-[26px] text-[#03124c]">
              HQ: Unit 337, JMD Megapolis,
              <br />
              Sector 48, Sohna Road,
              <br />
              Gurugram, Haryana 122018
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
