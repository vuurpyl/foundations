import * as React from 'react'
import CostCalculator from './cost-calculator'
import TransactionHistory from './transaction-history'
import { FlexContainerResponsive, FlexContainerBasic, Grid, GridItem } from '@reapit/elements'
import ErrorBoundary from '@/components/hocs/error-boundary'
import styles from '@/styles/pages/analytics.scss?mod'
import ServiceChart from './service-chart'
import CostExplorer from './cost-explorer'

export type BillingTabProps = {}

export const BillingTab: React.FC<BillingTabProps> = () => {
  return (
    <ErrorBoundary>
      <FlexContainerBasic hasPadding flexColumn>
        <FlexContainerResponsive flexColumn hasBackground hasPadding className={styles.wrapAnalytics}>
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

export default BillingTab
