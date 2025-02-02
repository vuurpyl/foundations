import { TopicModel } from '@/services/webhooks'
import { ReduxState } from '@/types/core'

export const selectTopicsData = (state: ReduxState): TopicModel[] => {
  return state?.webhooksTopics?.list?._embedded || []
}

export const selectTopicsLoading = (state: ReduxState): boolean => {
  return state?.webhooksTopics?.list?.isLoading
}
