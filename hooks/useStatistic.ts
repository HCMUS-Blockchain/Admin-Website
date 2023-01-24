import { statisticApi } from '@/api-client'
import useSWR from 'swr'

export function useStatistic() {
  const { data, error, mutate } = useSWR('/admin/statistics/today', {
    dedupingInterval: 60 * 60 * 1000,
    revalidateOnFocus: false,
  })

  async function getGeneralStatis(option: string) {
    const x = await statisticApi.getGeneralStatistics(option)
    mutate(x, true)
  }
  return {
    data,
    error,
    getGeneralStatis,
  }
}
