import axiosClient from './axiosClient'

export const userApi = {
  updateUser(data: any) {
    return axiosClient.post('admin/users', data)
  },
  getAllUsers() {
    return axiosClient.get('/admin/users')
  },
}
