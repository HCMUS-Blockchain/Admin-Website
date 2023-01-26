import { statisticApi } from '@/api-client'
import useSWR from 'swr'

export function useStatisticGame() {
  const { data, error, mutate } = useSWR('/admin/statistics/game', {
    dedupingInterval: 60 * 60 * 1000,
    revalidateOnFocus: false,
  })

  async function getGameStatistic() {
    const x = await statisticApi.getGameStatistic()
    mutate(x, false)
  }
  return {
    data,
    error,
    getGameStatistic,
  }
}
