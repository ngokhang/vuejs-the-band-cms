import type { ApiResponse } from '@/types/response'
import type { MemberListParams } from '@/types/member'
import type {
  CreateOrUpdateUserData,
  CreateUserPayload,
  UpdateUserPayload,
  User,
} from '@/types/user'
import { BaseService } from './BaseService'

class UserService extends BaseService {
  constructor() {
    super('/users')
  }

  async getUserById(id: string) {
    return this.get<User>(`/${id}`)
  }

  async createUser(payload: CreateUserPayload): Promise<ApiResponse<CreateOrUpdateUserData>> {
    const { avatar, ...jsonPayload } = payload
    const body: Record<string, unknown> = {
      ...jsonPayload,
      uploadAvatar: payload.avatar instanceof File,
    }
    return this.post<CreateOrUpdateUserData>('/', body)
  }

  async updateUser(
    id: string,
    payload: UpdateUserPayload
  ): Promise<ApiResponse<CreateOrUpdateUserData>> {
    const { avatar, ...rest } = payload
    const body: Record<string, unknown> = {
      ...rest,
      uploadAvatar: payload.avatar instanceof File,
    }
    if (typeof avatar === 'string') {
      body.avatar = avatar
    }
    return this.put<CreateOrUpdateUserData>(`/${id}`, body)
  }

  async getUserWithPagination(params: MemberListParams): Promise<ApiResponse<User[]>> {
    const { page, pageSize, q, sortBy } = params
    return this.get<ApiResponse<User[]>>('/', { page, pageSize, q, sortBy })
  }
}

export const userService = new UserService()
