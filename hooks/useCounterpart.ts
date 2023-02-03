import { counterpartApi, searchApi } from '@/api-client'
import { userApi } from '@/api-client/userApi'
import useSWR from 'swr'
export function useCounterpart() {
  const { data, error, mutate } = useSWR('/admin/counterparts', {
    dedupingInterval: 60 * 60 * 1000,
    revalidateOnFocus: false,
  })

  //   async function get() {
  //     await userApi.getAllUsers()
  //     // await mutate()
  //     // mutate([...data, newCampaign])
  //   }

  async function searchCounterpart(payload: any) {
    const result = await searchApi.searchCounterpart(payload)
    mutate(result, false)
  }

  async function updateCounterpart(payload: any) {
    const object = JSON.parse(JSON.stringify(Object.fromEntries(payload)))
    const item = data.data.counterparts.findIndex((obj: any) => obj._id === object.id)
    data.data.counterparts[item].isBlock = object.isBlock === 'true'
    await counterpartApi.updateCounterpart(payload)
    mutate(data, true)
  }

  return {
    data,
    error,
    updateCounterpart,
    searchCounterpart,
  }
}
