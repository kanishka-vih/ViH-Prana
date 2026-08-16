import WorkflowDiagram from './WorkflowDiagram'
import EnterpriseBenefits from './EnterpriseBenefits'

export default function WorkflowSection() {
  return (
    <section className="flex flex-col items-center gap-[90px] w-full bg-[#f8f9fb] py-16">
      <WorkflowDiagram />
      <EnterpriseBenefits />
    </section>
  )
}
