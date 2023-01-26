import { statisticApi } from '@/api-client'
import useSWR from 'swr'

export function useStatisticUser() {
  const { data, error, mutate } = useSWR('/admin/statistics/user/all', {
    dedupingInterval: 60 * 60 * 1000,
    revalidateOnFocus: false,
  })

  async function getUserStatistic(payload: any) {
    const x = await statisticApi.getUserStatistic(payload)
    mutate(x, false)
  }
  return {
    data,
    error,
    getUserStatistic,
  }
}
