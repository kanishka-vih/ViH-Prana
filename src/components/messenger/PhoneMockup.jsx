import battery from '../../assets/messenger-figma/icon-battery.svg'
import arrowUp from '../../assets/messenger-figma/icon-arrow-up.svg'
import checkmark from '../../assets/messenger-figma/icon-checkmark.svg'
import dotsIcon from '../../assets/messenger-figma/icon-dots.svg'
import playIcon from '../../assets/messenger-figma/icon-play.svg'
import waveformBar from '../../assets/messenger-figma/waveform-bar.svg'
import tickDouble from '../../assets/messenger-figma/icon-tick-double.svg'
import logoBadgeEllipse from '../../assets/messenger-figma/logo-badge-ellipse.svg'
import logoBadgeVector from '../../assets/messenger-figma/logo-badge-vector.svg'
import logoBadgeGroup from '../../assets/messenger-figma/logo-badge-group.svg'
import logoBadgeMaskShape from '../../assets/messenger-figma/logo-badge-mask-shape.svg'
import logoBadgeMaskContent from '../../assets/messenger-figma/logo-badge-mask-content.svg'
import logoBadgeVector1 from '../../assets/messenger-figma/logo-badge-vector1.svg'

// The ViH "V" mark badge used for both avatar spots in this mockup. Built
// from the individual Figma vector layers (not a flattened export — that
// export came back with stray full-canvas artifacts) with each layer's
// position/size converted to percentages of the badge's own circle, so it
// stays correct at either avatar's size instead of baking in one fixed px.
function LogoBadge({ className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <img src={logoBadgeEllipse} alt="" className="absolute inset-0 size-full" />
      <img
        src={logoBadgeVector}
        alt=""
        className="absolute max-w-none"
        style={{ left: '19.389%', top: '30.612%', width: '44.416%', height: '43.936%' }}
      />
      <img
        src={logoBadgeGroup}
        alt=""
        className="absolute max-w-none"
        style={{ left: '31.977%', top: '29.249%', width: '48.437%', height: '43.564%' }}
      />
      <div
        className="absolute"
        style={{
          left: '6.748%',
          top: '18.462%',
          width: '67.019%',
          height: '67.021%',
          maskImage: `url(${logoBadgeMaskShape})`,
          maskMode: 'alpha',
          maskRepeat: 'no-repeat',
          maskPosition: '37.56% 16.118%',
          maskSize: '72.376% 65.1%',
        }}
      >
        <img src={logoBadgeMaskContent} alt="" className="absolute inset-0 size-full" />
      </div>
      <img
        src={logoBadgeVector1}
        alt=""
        className="absolute max-w-none"
        style={{ left: '37.977%', top: '47.087%', width: '36.297%', height: '26.879%' }}
      />
    </div>
  )
}

// Each waveform tile's natural aspect ratio doesn't match the row height, so
// forcing both dimensions (h-8 w-X%) stretches it. Instead the wrapper takes
// the target width while the image keeps its own intrinsic proportions,
// centered vertically at roughly the height Figma's own frames use (~60%).
function WaveformTile({ src, className }) {
  return (
    <div className={`relative h-8 overflow-hidden ${className}`}>
      <img src={src} alt="" className="absolute inset-x-0 top-1/2 h-[60%] w-full -translate-y-1/2" />
    </div>
  )
}

function MessageBubble({ children, time }) {
  return (
    <div className="flex w-full justify-end">
      <div className="bg-[#eaf2fb] flex items-end gap-2 pl-[18px] pr-[9px] py-2 rounded-tl-[50px] rounded-bl-[50px] rounded-br-[20px] max-w-full">
        <p className="text-sm text-black whitespace-nowrap">{children}</p>
        <div className="flex items-center gap-1 shrink-0">
          <span className="text-[11px] text-[#7f7f7f] whitespace-nowrap">{time}</span>
          <img src={tickDouble} alt="" className="size-4" />
        </div>
      </div>
    </div>
  )
}

export default function PhoneMockup() {
  return (
    <div
      className="w-full h-full rounded-[24px] p-[24px] flex items-center justify-center"
      style={{
        backgroundImage:
          'linear-gradient(90deg, rgba(235,235,235,0.7) 0%, rgba(235,235,235,0.7) 100%), linear-gradient(90deg, rgba(243,248,255,0.2) 0%, rgba(243,248,255,0.2) 100%)',
      }}
    >
      <div className="bg-[#111] rounded-[20px] w-full max-w-[412px] aspect-[412/456] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-6 pt-[18px] shrink-0">
          <span className="text-white text-sm font-semibold tracking-[-0.28px]">9:41</span>
          <img src={battery} alt="" className="h-[11px] w-[24px]" />
        </div>

        <div className="flex items-center justify-between px-6 pt-[22px] pb-4 shrink-0">
          <div className="flex items-center gap-3.5">
            <img src={arrowUp} alt="" className="size-6 -rotate-90" />
            <div className="flex items-center gap-2">
              <LogoBadge className="size-9 shrink-0" />
              <span className="text-white text-base font-semibold whitespace-nowrap">
                ViH Metaverse
              </span>
              <img src={checkmark} alt="" className="size-[18px] shrink-0 rotate-180 -scale-x-100" />
            </div>
          </div>
          <div className="flex items-center justify-center size-10 rounded-full bg-[rgba(117,117,117,0.64)]">
            <img src={dotsIcon} alt="" className="size-[22px]" />
          </div>
        </div>

        <div className="bg-white rounded-tl-[20px] rounded-tr-[20px] rounded-br-[20px] pt-4 pb-4 px-6 flex flex-col gap-5 flex-1 overflow-hidden">
          <div className="flex justify-center mb-2 shrink-0">
            <span className="text-xs text-[#2d2d2d] bg-[#f2f2f2] rounded-full px-2.5 py-1.5">
              17 January
            </span>
          </div>

          <div className="flex flex-col gap-[6px] shrink-0">
            <MessageBubble time="10:45 PM">Hi Aditi!</MessageBubble>
            <MessageBubble time="10:45 PM">what is the price of the plan</MessageBubble>
          </div>

          <div className="bg-[#f7f7f7] flex flex-col items-center gap-2 p-2 rounded-tl-[20px] rounded-tr-[20px] rounded-br-[20px] w-full shrink-0">
            <div className="bg-white rounded-[20px] flex items-center gap-2 p-2 w-full">
              <img src={playIcon} alt="" className="h-6 w-auto shrink-0" />
              <div className="flex items-center gap-[3px] flex-1">
                <WaveformTile src={waveformBar} className="flex-1" />
                <WaveformTile src={waveformBar} className="flex-1" />
                <WaveformTile src={waveformBar} className="flex-1" />
                <WaveformTile src={waveformBar} className="flex-1" />
              </div>
              <LogoBadge className="size-9 shrink-0" />
            </div>
            <div className="flex items-center justify-between w-full">
              <span className="text-[rgba(45,45,45,0.6)] text-[11px]">0:55</span>
              <span className="text-[13px] text-[#595959]">12:05 AM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
