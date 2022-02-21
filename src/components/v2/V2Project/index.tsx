import ProjectHeader from 'components/shared/ProjectHeader'
import { V2ProjectContext } from 'contexts/v2/projectContext'
import { useContext } from 'react'
import { fromPermille } from 'utils/formatNumber'

export default function V2Project() {
  const { projectId, projectMetadata, fundingCycle } =
    useContext(V2ProjectContext)
  if (!projectId) return null

  const start = fundingCycle?.start
    ? new Date(fundingCycle?.start?.mul(1000).toNumber())
    : null

  const end =
    fundingCycle?.start && fundingCycle?.duration
      ? new Date(
          fundingCycle?.start.add(fundingCycle?.duration).mul(1000).toNumber(),
        )
      : null

  return (
    <div>
      <ProjectHeader metadata={projectMetadata} />
      {fundingCycle && (
        <div>
          <ul>
            <li>FC#{fundingCycle?.number.toNumber()}</li>
            <li>Discount rate: {fromPermille(fundingCycle.discountRate)}%</li>
            <li>Start: {start?.toISOString()}</li>
            <li>End: {end?.toISOString()}</li>
            <li>Weight: {fundingCycle.weight.toString()}</li>
            <li>Metadata: {fundingCycle?.metadata.toString()}</li>
          </ul>
        </div>
      )}
    </div>
  )
}
