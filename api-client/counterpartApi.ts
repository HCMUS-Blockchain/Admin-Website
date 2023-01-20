import axiosClient from './axiosClient'

export const counterpartApi = {
  updateCounterpart(data: any) {
    return axiosClient.post('/admin/counterparts', data)
  },
}
