import axiosInstance from "@/lib/axios";
import type { ApiResponse } from "@/types/response";

export class BaseService {
  protected BaseURL: string;

  constructor(baseURL: string) {
    this.BaseURL = baseURL;
  }

  protected async get<T>(url: string, params?: Record<string, any>): Promise<T> {
    const response = await axiosInstance.get(`${this.BaseURL}${url}`, {
      params,
    });
    return response.data;
  }

  protected async post<T>(url: string, data?: Record<string, unknown>): Promise<ApiResponse<T>> {
    const response = await axiosInstance.post(`${this.BaseURL}${url}`, data);
    return response.data;
  }

  protected async put<T>(url: string, data?: Record<string, unknown>): Promise<ApiResponse<T>> {
    const response = await axiosInstance.put(`${this.BaseURL}${url}`, data);
    return response.data;
  }

  protected async patch<T>(url: string, data?: Record<string, unknown>): Promise<ApiResponse<T>> {
    const response = await axiosInstance.patch(`${this.BaseURL}${url}`, data);
    return response.data;
  }

  protected async delete<T>(url: string, data?: Record<string, unknown>): Promise<ApiResponse<T>> {
    const response = await axiosInstance.delete(`${this.BaseURL}${url}`, {
      data,
    });
    return response.data;
  }
}
