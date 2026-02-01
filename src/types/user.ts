import type { AvatarUploadParams } from './cloudinary'

/** User entity từ API (fetch one user, getMe, v.v.) */
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

/** Payload cập nhật user – avatar có thể là URL (sau Cloudinary) hoặc File (gửi uploadAvatar: true) */
export type UpdateUserPayload = Partial<
  Omit<CreateUserPayload, 'username' | 'password' | 'avatar'>
> & {
  username?: string
  password?: string
  avatar?: string | File | null
}

/** Response data khi tạo/cập nhật user với uploadAvatar: true */
export interface CreateOrUpdateUserData {
  user: User
  avatarUpload?: AvatarUploadParams
}
