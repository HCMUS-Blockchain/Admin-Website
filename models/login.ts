export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  email: string
  fullName: string
  password: string
  confirmPassword: string
  role?: string
}
