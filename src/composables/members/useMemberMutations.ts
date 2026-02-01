import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { ApiResponse } from '@/types/response'
import type { CreateUserPayload, User } from '@/types/user'
import { uploadAvatarToCloudinary, validateAvatarFile } from '@/lib/cloudinary'
import { userService } from '@/services/UserService'
import { memberKeys } from './memberKeys'

export function useMemberMutations() {
  const queryClient = useQueryClient()

  const createMemberMutation = useMutation({
    mutationFn: async (payload: CreateUserPayload): Promise<ApiResponse<User>> => {
      if (payload.avatar instanceof File) {
        const validation = validateAvatarFile(payload.avatar)
        if (!validation.valid) throw new Error(validation.message)
      }
      const response = await userService.createUser(payload)
      const data = response.data
      if (!data?.user) throw new Error(response.message || 'Tạo user thất bại')
      let finalUser = data.user
      const avatarFile = payload.avatar instanceof File ? payload.avatar : null
      if (data.avatarUpload && avatarFile) {
        const secureUrl = await uploadAvatarToCloudinary(avatarFile, data.avatarUpload)
        const updateRes = await userService.updateUser(data.user.id, { avatar: secureUrl })
        if (updateRes.data?.user) finalUser = updateRes.data.user
      }
      return { success: response.success, message: response.message, data: finalUser }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: memberKeys.all })
    },
  })

  const updateMemberMutation = useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string
      payload: Omit<CreateUserPayload, 'username' | 'password'> & {
        username?: string
        password?: string
      }
    }): Promise<ApiResponse<User>> => {
      const avatarFile = payload.avatar instanceof File ? payload.avatar : null
      if (avatarFile) {
        const validation = validateAvatarFile(avatarFile)
        if (!validation.valid) throw new Error(validation.message)
      }
      const response = await userService.updateUser(id, payload)
      const data = response.data
      if (!data?.user) throw new Error(response.message || 'Cập nhật user thất bại')
      let finalUser = data.user
      if (data.avatarUpload && avatarFile) {
        const secureUrl = await uploadAvatarToCloudinary(avatarFile, data.avatarUpload)
        const updateRes = await userService.updateUser(id, { avatar: secureUrl })
        if (updateRes.data?.user) finalUser = updateRes.data.user
      }
      return { success: response.success, message: response.message, data: finalUser }
    },
    onSuccess: (result, variables) => {
      queryClient.invalidateQueries({ queryKey: memberKeys.all })
      if (result?.data) {
        queryClient.setQueryData(memberKeys.detail(variables.id), result.data)
      }
    },
  })

  return {
    createMemberMutation,
    updateMemberMutation,
  }
}
