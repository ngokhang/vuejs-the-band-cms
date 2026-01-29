import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ApiResponse } from '@/types/response'
import { userService, type CreateUserPayload, type User } from '@/services/UserService'

export const useMemberStore = defineStore('member', () => {
  const creating = ref<boolean>(false)
  const fetching = ref<boolean>(false)
  const updating = ref<boolean>(false)
  const error = ref<string | null>(null)
  const currentUser = ref<User | null>(null)

  async function createMember(payload: CreateUserPayload): Promise<ApiResponse<User>> {
    try {
      creating.value = true
      error.value = null

      const response = await userService.createUser(payload)
      return response
    } catch (err: any) {
      // Handle different types of errors
      let errorMessage = 'Đã xảy ra lỗi khi tạo thành viên'

      if (err.response) {
        // API returned an error response
        const status = err.response.status
        const data = err.response.data

        if (data?.message) {
          errorMessage = data.message
        } else if (status === 400) {
          errorMessage = 'Dữ liệu không hợp lệ. Vui lòng kiểm tra lại thông tin.'
        } else if (status === 401) {
          errorMessage = 'Bạn chưa đăng nhập hoặc phiên đăng nhập đã hết hạn.'
        } else if (status === 403) {
          errorMessage = 'Bạn không có quyền thực hiện thao tác này.'
        } else if (status === 409) {
          errorMessage = 'Tên đăng nhập hoặc email đã tồn tại.'
        } else if (status === 500) {
          errorMessage = 'Lỗi máy chủ. Vui lòng thử lại sau.'
        } else {
          errorMessage = `Lỗi ${status}: ${data?.message || 'Đã xảy ra lỗi không xác định'}`
        }
      } else if (err.request) {
        // Request was made but no response received
        errorMessage = 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng.'
      } else {
        // Something else happened
        errorMessage = err.message || errorMessage
      }

      error.value = errorMessage
      throw new Error(errorMessage)
    } finally {
      creating.value = false
    }
  }

  async function fetchMemberById(id: string): Promise<User> {
    try {
      fetching.value = true
      error.value = null

      const response = await userService.getUserById(id)
      // BaseService.get trả về raw data; backend có thể wrap theo ApiResponse
      const user = (response as any)?.data ?? response
      currentUser.value = user as User
      return user as User
    } catch (err: any) {
      let errorMessage = 'Không thể tải thông tin thành viên'
      if (err?.response?.data?.message) errorMessage = err.response.data.message
      error.value = errorMessage
      currentUser.value = null
      throw new Error(errorMessage)
    } finally {
      fetching.value = false
    }
  }

  async function updateMember(
    id: string,
    payload: Omit<CreateUserPayload, 'username' | 'password'> & {
      username?: string
      password?: string
    }
  ): Promise<ApiResponse<User>> {
    try {
      updating.value = true
      error.value = null

      const response = await userService.updateUser(id, payload)
      return response
    } catch (err: any) {
      let errorMessage = 'Đã xảy ra lỗi khi cập nhật thành viên'
      if (err?.response?.data?.message) errorMessage = err.response.data.message
      error.value = errorMessage
      throw new Error(errorMessage)
    } finally {
      updating.value = false
    }
  }

  function clearError() {
    error.value = null
  }

  return {
    creating,
    fetching,
    updating,
    error,
    currentUser,
    createMember,
    fetchMemberById,
    updateMember,
    clearError,
  }
})
