import { LoginPayload, RegisterPayload } from '@/models'
import axiosClient from './axiosClient'
export const authApi = {
  login(payload: LoginPayload) {
    return axiosClient.post('/signin', payload)
  },
  create(payload: RegisterPayload) {
    return axiosClient.post('/register', payload)
  },
  logout() {
    return axiosClient.post('/logout')
  },
}
