import iconPhoneOutgoing from '../../assets/messenger-figma/icon-phone-outgoing.svg'
import iconAudioWaveform from '../../assets/messenger-figma/icon-audio-waveform.svg'
import iconRefreshCw from '../../assets/messenger-figma/icon-refresh-cw.svg'
import iconArrowUpRight from '../../assets/messenger-figma/icon-arrow-up-right.svg'
import iconArrowDownRight from '../../assets/messenger-figma/icon-arrow-down-right.svg'
import iconBarChart from '../../assets/messenger-figma/icon-bar-chart.svg'

function FlowCard({ icon, title, description, className = '' }) {
  return (
    <div
      className={`bg-white border border-[#ddd] shadow-[0px_4px_3px_rgba(0,0,0,0.02)] flex flex-col justify-center gap-2 items-start p-4 rounded-xl ${className}`}
    >
      <div className="flex gap-2 items-center w-full">
        <img src={icon} alt="" className="size-4 shrink-0" />
        <p className="flex-1 font-semibold text-[15px] text-[#0f172a]">{title}</p>
      </div>
      <p className="text-[13px] leading-[18px] text-[#64748b]">{description}</p>
    </div>
  )
}

function VerticalConnector({ className = '' }) {
  return <div className={`w-[1.5px] connector-dash-y ${className}`} />
}

function RowConnector() {
  return (
    <div className="hidden md:flex h-9 w-6 shrink-0 items-center justify-center">
      <div className="h-[1.5px] w-full connector-dash-x" />
    </div>
  )
}

function BranchConnector({ horizontalAt = 'top' }) {
  return (
    <div className="relative w-full h-6">
      <div className="absolute left-[20%] top-0 h-full w-[1.5px] connector-dash-y" />
      <div className="absolute right-[20%] top-0 h-full w-[1.5px] connector-dash-y" />
      <div
        className={`absolute left-[20%] right-[20%] h-[1.5px] connector-dash-x ${
          horizontalAt === 'top' ? 'top-0' : 'bottom-0'
        }`}
      />
    </div>
  )
}

export default function WorkflowDiagram() {
  return (
    <div className="flex flex-col items-center gap-[59px] w-full md:w-310 px-6">
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start w-full">
        <h2 className="flex-1 font-light text-3xl md:text-[36px] leading-[36px] text-[#131313]">
          From your system to your customer&apos;s inbox
        </h2>
        <p className="flex-1 text-lg md:text-xl leading-6 text-[#737373]">
          ViH Messenger connects your existing systems to your customer app, handling routing,
          delivery, fallback, and status seamlessly.
        </p>
      </div>

      <div className="flex flex-col items-center w-full">
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-0 w-full">
          <FlowCard
            icon={iconPhoneOutgoing}
            title="You send"
            description="Trigger from the Enterprise Panel, or call the REST API from your own systems — with templates, media and buttons attached."
            className="w-full md:w-[397px] shrink-0"
          />
          <RowConnector />
          <FlowCard
            icon={iconAudioWaveform}
            title="Policy & routing"
            description="The message is validated against policy OTP, promotional, blacklist and routed to the right channel for that customer."
            className="w-full md:w-[398px] md:h-[112px] shrink-0"
          />
          <RowConnector />
          <FlowCard
            icon={iconRefreshCw}
            title="Delivery"
            description="Pushed into the in-app inbox via FCM or APNs, with SMS, email or voice falling in behind if the device isn't reachable."
            className="w-full md:w-[397px] md:h-[112px] shrink-0"
          />
        </div>

        <div className="flex flex-col items-center w-full max-w-[540px]">
          <VerticalConnector className="h-6" />
          <BranchConnector horizontalAt="top" />

          <div className="flex items-start justify-between w-full">
            <FlowCard
              icon={iconArrowUpRight}
              title="Delivered"
              description="Does the set action"
              className="w-[45%]"
            />
            <FlowCard
              icon={iconArrowDownRight}
              title="Queued"
              description="Does the set action"
              className="w-[45%]"
            />
          </div>

          <BranchConnector horizontalAt="bottom" />
          <VerticalConnector className="h-6" />

          <FlowCard
            icon={iconBarChart}
            title="Status back"
            description="Sent, delivered and seen stream live to the panel and mirror out to your systems through signed webhooks."
            className="w-full max-w-[300px]"
          />
        </div>
      </div>
    </div>
  )
}
