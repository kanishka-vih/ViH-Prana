import polygonBlob from '../../assets/messenger-figma/polygon-blob.webp'
import PhoneMockup from './PhoneMockup'
import AnalyticsDashboard from './AnalyticsDashboard'
import FeatureCards from './FeatureCards'

// Figma (node 88:478, "Frame 2043683664") puts the dashboard/phone row AND
// the "Four channels" feature-card row inside ONE 979px-tall frame sharing
// ONE polygon-blob background — not two separately-backed sections. The
// blob sits behind both rows (bg positioned per that frame's exact
// coordinates: left 209px / top -11px of 1440px width, i.e. ~109px/-11px
// once translated into this project's 1240px content column), so it lives
// on this shared outer wrapper, not scoped to just the video/phone row.
export default function DashboardShowcase() {
  return (
    // min-h-[979px] matches Figma's frame height exactly — the row+cards
    // content only fills 768px of it (517 dashboard/phone row + 34 gap +
    // 217 cards row), leaving 211px of trailing space at the bottom. That
    // trailing space is where the blob visually fades out in the design;
    // without it, this container's overflow-hidden was clipping the blob
    // right at the cards' bottom edge instead of letting it fade — the
    // "cut off" look.
    <div className="relative isolate w-full overflow-hidden bg-white min-h-[979px]">
      {/* Reproduces Figma's exact 3-level nesting for this blob (node
          88:479) instead of flattening it into one rotated square — the
          raw image is NOT square and bleeds past its nominal 863px box by
          asymmetric negative insets (-21.78% top / -16.68% sides / -2.69%
          bottom), which is what gives it that soft, open, larger-than-its-
          box spread in the design. Collapsing that into a single
          `aspect-square` + `object-contain` box (the previous version)
          both undersized it and clipped/centered it evenly instead, which
          is why it read as small and "stuck" rather than open. */}
      <div
        className="absolute -z-10 flex items-center justify-center"
        style={{ left: 109.03, top: -10.97, width: 1041.395, height: 1041.395 }}
      >
        <div className="relative" style={{ width: 863, height: 863, transform: 'rotate(13.57deg)' }}>
          <div
            className="absolute"
            style={{ top: '-21.78%', right: '-16.68%', bottom: '-2.69%', left: '-16.68%' }}
          >
            <img src={polygonBlob} alt="" className="block w-full h-full" />
          </div>
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

      {/* 34px gap in Figma (cards top 551 - row bottom 517) */}
      <div className="relative mt-[34px]">
        <FeatureCards />
      </div>
    </div>
  )
}
