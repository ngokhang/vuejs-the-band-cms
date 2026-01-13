import type { LoginResponse, RefreshTokenResponse } from "@/types/response";
import { BaseService } from "./BaseService";

class AuthService extends BaseService {
  constructor() {
    super("/auth");
  }

  async signIn(username: string, password: string) {
    return this.post<LoginResponse>("/sign-in", { username, password });
  }

  async getMe() {
    return this.get<any>("/me");
  }

  async refreshToken() {
    return this.post<RefreshTokenResponse>("/refresh-token");
  }

  async logout() {
    return this.post("/logout");
  }
}

export const authService = new AuthService();
