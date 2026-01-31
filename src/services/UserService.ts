import type { ApiResponse } from '@/types/response'
import type { AvatarUploadParams } from '@/lib/cloudinary'
import { BaseService } from './BaseService'

export interface CreateUserPayload {
  username: string
  password: string
  email: string
  phoneNumber: string
  firstName: string
  lastName: string
  avatar?: File | null
  systemRoles: string[]
  bandRoles: string[]
  uploadAvatar?: boolean
}

/** API FetchOneUser trả về systemRoles + bandRoles */
export interface User {
  id: string
  username: string
  email: string
  phoneNumber: string
  firstName: string
  lastName: string
  avatar?: string | null
  systemRoles: string[]
  bandRoles: string[]
}

/** Response data khi tạo/cập nhật user với uploadAvatar: true */
export interface CreateOrUpdateUserData {
  user: User
  avatarUpload?: AvatarUploadParams
}

class UserService extends BaseService {
  constructor() {
    super('/users')
  }

  async getUserById(id: string) {
    return this.get<User>(`/${id}`)
  }

  /**
   * Tạo user (JSON). Gửi uploadAvatar: true khi có avatar file để nhận avatarUpload.
   * File avatar không gửi trong request này – upload lên Cloudinary bằng avatarUpload, rồi PUT avatar URL.
   */
  async createUser(payload: CreateUserPayload): Promise<ApiResponse<CreateOrUpdateUserData>> {
    const { avatar, ...jsonPayload } = payload
    const body: Record<string, unknown> = {
      ...jsonPayload,
      uploadAvatar: payload.avatar instanceof File,
    }
    return this.post<CreateOrUpdateUserData>('/', body)
  }

  /**
   * Cập nhật user (JSON). Gửi uploadAvatar: true khi có avatar file để nhận avatarUpload.
   * File avatar không gửi ở đây – upload lên Cloudinary rồi PUT { avatar: secure_url }.
   */
  /** Payload có thể chỉ gồm avatar (URL) khi chỉ cập nhật avatar sau upload Cloudinary */
  async updateUser(
    id: string,
    payload: Partial<Omit<CreateUserPayload, 'username' | 'password' | 'avatar'>> & {
      username?: string
      password?: string
      /** URL sau khi upload lên Cloudinary hoặc File khi chọn ảnh mới (gửi uploadAvatar: true) */
      avatar?: string | File | null
    }
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
}

export const userService = new UserService()
