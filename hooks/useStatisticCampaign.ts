import { statisticApi } from '@/api-client'
import useSWR from 'swr'

export function useStatisticCampaign() {
  const { data, error, mutate } = useSWR('/admin/statistics/campaign', {
    dedupingInterval: 60 * 60 * 1000,
    revalidateOnFocus: false,
  })

  async function getStatisticCampaign(payload: any) {
    const x = await statisticApi.getStatisticCampaign(payload)
    mutate(x, false)
  }
  return {
    data,
    error,
    getStatisticCampaign,
  }
}
