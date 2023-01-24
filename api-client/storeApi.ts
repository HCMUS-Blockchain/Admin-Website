import axiosClient from './axiosClient'

export const storeApi = {
  getStore(id: string) {
    return axiosClient.get(`/admin/stores/${id}`)
  },
}
