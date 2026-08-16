import channelIcon from '../../assets/messenger-figma/icon-channel.svg'
import supportIcon from '../../assets/messenger-figma/icon-support.svg'
import timeIcon from '../../assets/messenger-figma/icon-time.svg'
import aiIcon from '../../assets/messenger-figma/icon-ai.svg'

const FEATURES = [
  {
    icon: channelIcon,
    title: 'Four channels',
    description: 'In-app chat, chat bot, rich messaging and voice bot driven from a single API',
  },
  {
    icon: supportIcon,
    title: 'A2P only',
    description: 'Enterprise traffic never competes with personal chat',
  },
  {
    icon: timeIcon,
    title: 'Seconds',
    description: 'Send to device on live delivery, tracked per message',
  },
  {
    icon: aiIcon,
    title: 'Self-hosted AI',
    description: 'chat and voice models run on ViH infrastructure, not a third party',
  },
]

export default function FeatureCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {FEATURES.map((feature) => (
        <div
          key={feature.title}
          className="bg-[rgba(235,235,235,0.68)] border border-[#cfcfcf] rounded-[24px] px-[22px] py-5 flex flex-col justify-between gap-4 min-h-[217px]"
        >
          <img src={feature.icon} alt="" className="size-6" />
          <div className="flex flex-col gap-2">
            <p className="text-[#212121] text-xl">{feature.title}</p>
            <p className="text-[#121212] text-lg leading-6">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
