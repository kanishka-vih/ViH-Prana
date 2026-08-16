import polygonBlob from '../../assets/messenger-figma/polygon-blob.webp'
import PhoneMockup from './PhoneMockup'
import FeatureCards from './FeatureCards'
import AnalyticsDashboard from './AnalyticsDashboard'

export default function DashboardShowcase() {
  return (
    <div className="relative isolate w-full overflow-hidden bg-white pb-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-[8%] -top-[4%] w-[85%] aspect-square rotate-[13.57deg] opacity-90">
          <img src={polygonBlob} alt="" className="size-full object-contain" />
        </div>
      </div>

      <div className="relative flex flex-col lg:flex-row items-stretch gap-4 w-full">
        <div
          className="rounded-[24px] overflow-hidden w-full lg:w-[62%] aspect-[753/517] px-[22px] py-[29px]"
          style={{
            backgroundImage:
              'linear-gradient(90deg, rgba(235,235,235,0.7) 0%, rgba(235,235,235,0.7) 100%), linear-gradient(90deg, rgba(243,248,255,0.2) 0%, rgba(243,248,255,0.2) 100%)',
          }}
        >
          <div className="relative size-full rounded-xl overflow-hidden">
            <AnalyticsDashboard />
          </div>
        </div>

        <div className="w-full lg:w-[38%] aspect-[461/517]">
          <PhoneMockup />
        </div>
      </div>

      <div className="relative mt-8">
        <FeatureCards />
      </div>
    </div>
  )
}
