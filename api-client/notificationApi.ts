import axiosClient from './axiosClient'

export const notificationApi = {
  updateSeenNotification() {
    return axiosClient.get('/admin/notification/seen')
  },
}
