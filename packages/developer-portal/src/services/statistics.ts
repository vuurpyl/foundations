import { fetcher, setQueryParams } from '@reapit/elements'
import { URLS } from './constants'
import { generateHeaders } from './utils'
import { logger } from '@reapit/utils'

export type FetchStatisticsListParams = {
  appId?: string[]
  dateFrom?: string
  dateTo?: string
}

// UsageStatsModel is deprecated
// this endpoint is obsolete
// TODO: investigate, remove this code
export const fetchStatisticsList = async (params: FetchStatisticsListParams): Promise<any> => {
  try {
    const response = await fetcher({
      url: `${URLS.statistics}?${setQueryParams(params)}`,
      api: window.reapit.config.platformApiUrl,
      method: 'GET',
      headers: await generateHeaders(),
    })
    return response
  } catch (error) {
    logger(error)
    throw new Error(error)
  }
}
