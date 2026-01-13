import axios, { AxiosError, type AxiosRequestConfig, type AxiosResponse } from "axios";

// Constants
const BASE_URL = "http://localhost:8000/api";
const REQUEST_TIMEOUT = 10000;
const REFRESH_COOLDOWN = 2000; // 2 seconds between refresh attempts

let navigateFn: ((path: string) => void) | null = null;
let clearAuthFn: (() => void) | null = null;

export const setNavigate = (fn: (path: string) => void) => {
  navigateFn = fn;
};

export const setClearAuth = (fn: () => void) => {
  clearAuthFn = fn;
};

// Types
interface RetryableConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

interface RefreshTokenResponse {
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

// Axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: REQUEST_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Refresh coordination state
let isRefreshing = false;
let lastRefreshAttempt = 0;
let queue: ((token: string | null) => void)[] = [];
let isRedirecting = false; // Flag để tránh multiple redirects

/**
 * Subscribe a callback to the refresh token queue
 */
function subscribe(cb: (token: string | null) => void): void {
  queue.push(cb);
}

/**
 * Resolve all queued requests with the new token or reject them
 */
function resolveQueue(token: string | null): void {
  queue.forEach((cb) => cb(token));
  queue = [];
}

/**
 * Perform refresh token using raw axios instance (no interceptors)
 * This avoids circular dependency with authService
 * Backend handles HTTP-only cookies automatically
 */
async function performRefreshToken(): Promise<RefreshTokenResponse["data"]> {
  try {
    // Use raw axios to avoid triggering interceptors
    // Refresh token is automatically sent via HTTP-only cookie
    const response = await axios.post<RefreshTokenResponse>(
      `${BASE_URL}/auth/refresh-token`,
      {},
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        timeout: REQUEST_TIMEOUT,
      },
    );

    return response.data.data;
  } catch (error) {
    console.error("[Auth] Refresh token request failed:", error);
    throw error;
  }
}

/**
 * Clear authentication and redirect to sign in
 * Backend handles clearing HTTP-only cookies
 */
function clearAuthAndRedirect(reason: string = "session_expired"): void {
  // Tránh multiple redirects
  if (isRedirecting) {
    console.warn("[Auth] Already redirecting, skipping...");
    return;
  }

  // Nếu đã ở trang login, không redirect nữa
  if (window.location.pathname === "/login") {
    console.warn("[Auth] Already on login page, skipping redirect");
    return;
  }

  console.warn("[Auth] Clearing auth and redirecting:", reason);
  isRedirecting = true;

  // Clear auth store nếu có callback
  if (clearAuthFn) {
    clearAuthFn();
  }

  // Ưu tiên dùng navigateFn (router.push) nếu đã được inject
  if (navigateFn) {
    navigateFn("/login");
    // Reset flag sau một khoảng thời gian để cho phép redirect lại nếu cần
    setTimeout(() => {
      isRedirecting = false;
    }, 1000);
    return;
  }

  // Fallback: reload trang về /login
  window.location.href = "/login";
}

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // HTTP-only cookies are automatically sent by browser
    // No need to manually attach tokens
    if (import.meta.env.DEV) {
      console.log("[Axios Request]", {
        method: config.method?.toUpperCase(),
        url: config.url,
        withCredentials: config.withCredentials,
      });
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (import.meta.env.DEV) {
      console.log("[Axios Response]", {
        status: response.status,
        url: response.config.url,
        data: response.data,
      });
    }

    return response;
  },
  async (error: AxiosError) => {
    const original = error.config as RetryableConfig;
    const status = error.response?.status;

    // Handle 401 - Unauthorized
    if (status === 401) {
      const isRefreshEndpoint = original.url?.includes("/auth/refresh-token");
      const isGetMeEndpoint = original.url?.includes("/auth/me");
      const isSignInPage = window.location.pathname === "/login";

      // Nếu đã ở trang login và request là /auth/me, chỉ reject không redirect
      // Điều này tránh vòng lặp khi router guard gọi fetchMe()
      if (isSignInPage && isGetMeEndpoint) {
        return Promise.reject(error);
      }

      // If /auth/me endpoint fails with 401 và đã retry, reject không redirect
      // This prevents infinite loop when checking authentication status
      if (isGetMeEndpoint && original._retry) {
        return Promise.reject(error);
      }

      // Nếu là refresh endpoint fail hoặc đã retry => logout
      if (isRefreshEndpoint || original._retry) {
        clearAuthAndRedirect("authentication_failed");
        return Promise.reject(error);
      }

      // Check cooldown để tránh rapid refresh attempts
      const now = Date.now();
      if (now - lastRefreshAttempt < REFRESH_COOLDOWN && !isRefreshing) {
        console.warn("[Auth] Multiple rapid refresh attempts detected, logging out");
        clearAuthAndRedirect("too_many_attempts");
        return Promise.reject(error);
      }

      // Nếu đang refresh, subscribe vào queue
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          subscribe((status) => {
            if (!status) {
              console.error("[Auth] Token refresh failed, rejecting queued request");
              return reject(error);
            }

            console.info("[Auth] Retrying queued request after token refresh");
            original._retry = true;
            resolve(axiosInstance(original));
          });
        });
      }

      // Start refresh process
      console.info("[Auth] Starting token refresh process");
      isRefreshing = true;
      lastRefreshAttempt = now;

      try {
        await performRefreshToken();

        // Backend sets new HTTP-only cookies automatically
        // Resolve tất cả pending requests with success indicator
        resolveQueue("refreshed");

        // Retry request hiện tại
        original._retry = true;
        return axiosInstance(original);
      } catch (refreshError) {
        console.error("[Auth] Token refresh failed:", refreshError);
        resolveQueue(null);
        clearAuthAndRedirect("session_expired");
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Handle other status codes - chỉ log, không auto-redirect
    // Để component tự quyết định xử lý
    if (status === 403) {
      console.warn("[Auth] Forbidden access (403)");
    } else if (status === 404) {
      console.warn("[API] Resource not found (404)");
    } else if (status === 500) {
      console.error("[API] Server error (500)");
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
