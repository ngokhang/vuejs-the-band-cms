import { BaseService } from './BaseService'
import axiosInstance from '@/lib/axios'

export interface CreateUserPayload {
  username: string
  password: string
  email: string
  phoneNumber: string
  firstName: string
  lastName: string
  avatar?: File | null
  bandRoles: string[]
  userRoles: string[]
}

export interface User {
  id: string
  username: string
  email: string
  phoneNumber: string
  firstName: string
  lastName: string
  avatar?: string
  bandRoles: string[]
  systemRoles: string[]
}

class UserService extends BaseService {
  constructor() {
    super('/users')
  }

  async getUserById(id: string) {
    return this.get<User>(`/${id}`)
  }

  async createUser(payload: CreateUserPayload) {
    // Convert FormData nếu có avatar file, otherwise send JSON
    if (payload.avatar instanceof File) {
      const formData = new FormData()
      formData.append('username', payload.username)
      formData.append('password', payload.password)
      formData.append('email', payload.email)
      formData.append('phoneNumber', payload.phoneNumber)
      formData.append('firstName', payload.firstName)
      formData.append('lastName', payload.lastName)
      formData.append('bandRoles', JSON.stringify(payload.bandRoles))
      formData.append('systemRoles', JSON.stringify(payload.userRoles))
      formData.append('avatar', payload.avatar)

      // Gửi FormData trực tiếp qua axiosInstance
      const response = await axiosInstance.post(`${this.BaseURL}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data
    }

    // Send JSON payload without avatar
    const { avatar, ...jsonPayload } = payload
    return this.post<User>('/', jsonPayload as Record<string, unknown>)
  }

  async updateUser(
    id: string,
    payload: Omit<CreateUserPayload, 'username' | 'password'> & {
      username?: string
      password?: string
    }
  ) {
    // Hiện tại xử lý JSON; nếu cần update avatar dạng file có thể mở rộng sau
    const { avatar, ...jsonPayload } = payload
    return this.put<User>(`/${id}`, jsonPayload as Record<string, unknown>)
  }
}

export const userService = new UserService()
