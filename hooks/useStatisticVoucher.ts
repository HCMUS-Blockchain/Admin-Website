import { statisticApi } from '@/api-client'
import useSWR from 'swr'

export function useStatisticVoucher() {
  const { data, error, mutate } = useSWR('/admin/statistics/voucher/all', {
    dedupingInterval: 60 * 60 * 1000,
    revalidateOnFocus: false,
  })

  async function getVoucherStatistic(payload: any) {
    const x = await statisticApi.getVoucherStatistic(payload)
    mutate(x, false)
  }
  return {
    data,
    error,
    getVoucherStatistic,
  }
}
