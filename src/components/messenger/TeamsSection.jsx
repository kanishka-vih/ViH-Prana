import teamsBlob from '../../assets/messenger-figma/teams-blob.webp'

const FEATURES = [
  {
    title: 'Rich messaging',
    description:
      'Images, video, audio, documents, buttons, carousels and surveys, delivered natively rather than as a link out.',
  },
  {
    title: 'AI chat & voicebot',
    description:
      'LLM answers grounded in your own knowledge base, plus real-time in-app voice calls over WebRTC.',
  },
  {
    title: 'Delivery tracking',
    description:
      'Sent, delivered and seen captured per message, streamed live to the panel and mirrored out via HMAC-signed webhooks.',
  },
  {
    title: 'Live agent & flow builder',
    description:
      'Escalate to a human, or automate the path with a visual flow builder — the customer stays in the same thread.',
  },
  {
    title: 'Campaigns & templates',
    description:
      'Bulk and transactional sends, scheduling, sender-ID and blacklist management, all from one control plane.',
  },
  {
    title: 'Developer API & SDKs',
    description:
      'An OpenAPI-documented REST API, a Kotlin library on Maven Central and a Swift package for iOS 14+.',
  },
]

export default function TeamsSection() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-white px-6 md:px-[100px] py-16">
      <div className="absolute -z-10 left-1/2 -translate-x-1/2 -top-24 w-[900px] max-w-none aspect-square rotate-[53.1deg] opacity-90">
        <img src={teamsBlob} alt="" className="size-full object-contain" />
      </div>

      <div className="flex flex-col gap-10 w-full md:w-310 mx-auto">
        <h2 className="font-light text-3xl md:text-[36px] leading-[40px] tracking-[-1.2px] text-black">
          Built for the teams
          <br />
          that actually answer.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col gap-[10px] rounded-[24px] border border-[#cfcfcf] bg-[#fafafa] px-[22px] py-5"
            >
              <p className="text-xl tracking-[0.2px] text-black">{feature.title}</p>
              <p className="font-inter text-sm leading-5 tracking-[0.14px] text-[#2e2e2e]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
