export interface ApiResponse<T = unknown> {
  success: boolean
  message: string
  data: T
  meta?: {
    page: number
    limit: number
    total: number
    totalPages: number
    totalItems: number
  }
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
}

export interface GetMeResponse {}

export interface RefreshTokenResponse {
  accessToken: string
  refreshToken: string
}
