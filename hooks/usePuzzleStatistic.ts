import { statisticApi } from '@/api-client'
import useSWR from 'swr'

export function usePuzzleStatistic() {
  const { data, error, mutate } = useSWR('/admin/statistics/puzzle', {
    dedupingInterval: 60 * 60 * 1000,
    revalidateOnFocus: false,
  })

  async function getPuzzleStatistic(payload: any) {
    const x = await statisticApi.getStatisticPuzzle(payload)
    mutate(x, false)
  }
  return {
    dataX: data,
    error,
    getPuzzleStatistic,
  }
}
