import { userApi } from '@/api-client/userApi'
import useSWR from 'swr'
export function useUser() {
  const { data, error, mutate } = useSWR('/admin/users', {
    dedupingInterval: 60 * 60 * 1000,
    revalidateOnFocus: false,
  })

  async function getAllUsers() {
    await userApi.getAllUsers()
    // await mutate()
    // mutate([...data, newCampaign])
  }

  return {
    data,
    error,
    getAllUsers,
  }
}
