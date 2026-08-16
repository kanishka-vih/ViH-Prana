import logo from '../../assets/messenger-figma/logo.svg'
import { scrollToContact } from '../utils/scrollToContact'

const NAV_LINKS = ['ViH Shruti', 'ViH Viveka', 'ViH Messenger', 'Our Team']

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between w-full py-3">
      <img src={logo} alt="ViH Metaverse" className="h-9 w-auto" />

      <div className="hidden lg:flex items-center gap-3">
        {NAV_LINKS.map((label) => (
          <a
            key={label}
            href="#"
            className="flex items-center justify-center h-[31px] px-[10px] rounded-[55px] text-base text-black whitespace-nowrap hover:bg-black/5"
          >
            {label}
          </a>
        ))}
      </div>

      <button
        type="button"
        onClick={scrollToContact}
        className="flex items-center justify-center h-9 px-4 py-2 rounded-lg bg-[#232323] text-white text-base font-medium whitespace-nowrap transition-all duration-150 hover:bg-black active:scale-95 active:bg-black"
      >
        Contact sales
      </button>
    </nav>
  )
}
