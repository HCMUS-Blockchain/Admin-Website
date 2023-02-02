import { searchApi } from '@/api-client'
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

  async function searchUser(payload: any) {
    const result = await searchApi.searchUser(payload)
    mutate(result, false) // await mutate()
  }

  async function updateUser(payload: any) {
    const object = JSON.parse(JSON.stringify(Object.fromEntries(payload)))
    const item = data.data.users.findIndex((obj: any) => obj._id === object.id)
    data.data.users[item].isBlock = object.isBlock === 'true'
    console.log(data)
    await userApi.updateUser(payload)
    mutate(data, true)
  }

  return {
    data,
    error,
    getAllUsers,
    updateUser,
    searchUser,
  }
}
