import axiosInstance from "./apiClient";
import { AxiosRequestConfig, AxiosResponse } from "axios";

/**
 * Generic API response type
 */
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status: number;
}

/**
 * API Error response type
 */
export interface ApiError {
  message: string;
  status?: number;
  errors?: Record<string, string[]>;
}

export const apiRequest = async <T = any>(
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  url: string,
  data?: any,
  params?: Record<string, any>,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance({
      method,
      url,
      data,
      params,
      ...config,
    });

    return {
      data: response.data,
      status: response.status,
    };
  } catch (error: any) {
    // Handle and throw formatted error
    const apiError: ApiError = {
      message:
        error.response?.data?.message || error.message || "An error occurred",
      status: error.response?.status,
      errors: error.response?.data?.errors,
    };

    throw apiError;
  }
};

// GET request
export const get = <T = any>(
  url: string,
  params?: Record<string, any>,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  return apiRequest<T>("GET", url, undefined, params, config);
};

// Export all methods as a single object
export const api = {
  request: apiRequest,
  get,
};

export default api;
