import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { User } from "@/types";
import type { LoginRequest } from "@/types/request";
import { authService } from "@/services/AuthService";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const isAuthenticated = computed(() => user.value !== null);
  const loading = ref<boolean>(false);

  function setUser(payload: User | null) {
    user.value = payload;
  }

  async function fetchMe() {
    try {
      const response = await authService.getMe();
      // Giả định API trả về user trong response.data.data
      // Điều chỉnh nếu cấu trúc khác
      setUser(response.data?.data ?? response.data);
      return response;
    } catch (error) {
      setUser(null);
      throw error;
    }
  }

  async function login(payload: LoginRequest) {
    try {
      loading.value = true;
      return await authService.signIn(payload.username, payload.password);
    } catch (error) {
      throw error;
    } finally {
      loading.value = false;
    }
  }

  return { user, isAuthenticated, loading, login, setUser, fetchMe };
});
