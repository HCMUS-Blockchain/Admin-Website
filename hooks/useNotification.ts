import { notificationApi } from '@/api-client/notificationApi'
import useSWR from 'swr'

export function useNotification() {
  const { data, error, mutate } = useSWR('/admin/notification', {
    dedupingInterval: 60 * 60 * 1000,
    revalidateOnFocus: false,
  })

  async function updateSeen() {
    await notificationApi.updateSeenNotification()
    mutate(data, true)
  }
  return {
    data,
    error,
    updateSeen,
  }
}
