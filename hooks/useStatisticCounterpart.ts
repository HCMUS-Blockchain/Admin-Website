import { statisticApi } from '@/api-client'
import useSWR from 'swr'

export function useStatisticCounterpart() {
  const { data, error, mutate } = useSWR('/admin/statistics/counterpart', {
    dedupingInterval: 60 * 60 * 1000,
    revalidateOnFocus: false,
  })

  async function getCounterpartStatistic(payload: any) {
    const x = await statisticApi.getCounterpartStatistic(payload)
    mutate(x, false)
  }
  return {
    data,
    error,
    getCounterpartStatistic,
  }
}
