import * as React from 'react'
import CostCalculator from './cost-calculator'
import TransactionHistory from './transaction-history'
import { FlexContainerResponsive, FlexContainerBasic, Grid, GridItem } from '@reapit/elements'
import ErrorBoundary from '@/components/hocs/error-boundary'
import ServiceChart from './service-chart'
import CostExplorer from './cost-explorer-component'

export type CostExplorerTabProps = {}

export const CostExplorerTab: React.FC<CostExplorerTabProps> = () => {
  return (
    <ErrorBoundary>
      <FlexContainerBasic flexColumn>
        <FlexContainerResponsive flexColumn hasBackground>
          <Grid isMultiLine className="mt-5 is-variable is-8">
            <GridItem className="is-half">
              <ServiceChart />
            </GridItem>
            <GridItem className="is-half">
              <TransactionHistory />
            </GridItem>
          </Grid>
          <Grid>
            <GridItem>
              <CostExplorer />
            </GridItem>
          </Grid>
          <CostCalculator />
        </FlexContainerResponsive>
      </FlexContainerBasic>
    </ErrorBoundary>
  )
}

export default CostExplorerTab
