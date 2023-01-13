import { authApi } from '@/api-client'
import { LoginPayload, RegisterPayload } from '@/models'
import useSWR from 'swr'

export function useAuth() {
  const {
    data: profile,
    error,
    mutate,
  } = useSWR('/admin/profile', {
    dedupingInterval: 60 * 60 * 1000,
    revalidateOnFocus: false,
  })

  const firstLoading = profile === undefined && error === undefined

  async function login(payload: LoginPayload) {
    await authApi.login(payload)
    await mutate()
  }

  async function register(payload: RegisterPayload) {
    await authApi.create(payload)
    // mutate({}, false)
  }

  async function logout() {
    await authApi.logout()
    mutate(null, false)
  }

  return {
    profile,
    error,
    login,
    logout,
    register,
    firstLoading,
  }
}
