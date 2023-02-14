import { searchApi } from '@/api-client/searchApi'
import useSWR from 'swr'

export function usePayment() {
  const { data, error, mutate } = useSWR('/admin/payment', {
    dedupingInterval: 60 * 60 * 1000,
    revalidateOnFocus: false,
  })
  async function searchPayment(payload: any) {
    const result = await searchApi.searchPayment(payload)
    mutate(result, false)
  }
  return {
    data,
    error,
    searchPayment,
  }
}
