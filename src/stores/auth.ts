import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/types'
import type { LoginRequest } from '@/types/request'
import { authService } from '@/services/AuthService'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isAuthenticated = computed(() => user.value !== null)
  const loading = ref<boolean>(false)
  const isBootstrapped = ref<boolean>(false)

  const lastBootstrapTime = ref<number>(0)
  const BOOTSTRAP_CACHE_TIME = 5000

  function setUser(payload: User | null) {
    user.value = payload
  }

  async function fetchMe() {
    try {
      const response = await authService.getMe()
      setUser(response.data?.data ?? response.data)
      return response
    } catch (error) {
      setUser(null)
      throw error
    }
  }

  async function login(payload: LoginRequest) {
    try {
      loading.value = true
      return await authService.signIn(payload.username, payload.password)
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  async function bootstrap(force: boolean = false) {
    if (loading.value) {
      return
    }

    const now = Date.now()
    if (!force && isBootstrapped.value && now - lastBootstrapTime.value < BOOTSTRAP_CACHE_TIME) {
      return
    }

    loading.value = true

    try {
      await fetchMe()
    } catch (error) {
      // fetchMe() đã tự động set user = null khi fail
    } finally {
      isBootstrapped.value = true
      lastBootstrapTime.value = now
      loading.value = false
    }
  }

  return {
    user,
    isAuthenticated,
    loading,
    login,
    setUser,
    fetchMe,
    bootstrap,
    isBootstrapped,
  }
})
