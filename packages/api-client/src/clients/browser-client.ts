import axios, { AxiosError, type AxiosInstance } from 'axios';
import { ApiClientError } from '../errors/api-error';
import { isStateChangingMethod, readCookieValue } from '../interceptors/csrf';
import type { ApiClientConfig, RequestOptions } from '../types';

export interface BrowserApiClient {
  get<T>(path: string, options?: RequestOptions): Promise<T>;
  post<T, B = unknown>(path: string, body?: B, options?: RequestOptions): Promise<T>;
  put<T, B = unknown>(path: string, body?: B, options?: RequestOptions): Promise<T>;
  patch<T, B = unknown>(path: string, body?: B, options?: RequestOptions): Promise<T>;
  delete<T>(path: string, options?: RequestOptions): Promise<T>;
  raw: AxiosInstance;
}

export function createBrowserApiClient(config: ApiClientConfig): BrowserApiClient {
  const {
    baseUrl,
    timeoutMs = 15_000,
    csrfCookieName = 'nc_csrf_token',
    csrfHeaderName = 'X-CSRF-Token',
    onUnauthorized,
  } = config;

  const instance = axios.create({
    baseURL: baseUrl,
    timeout: timeoutMs,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  instance.interceptors.request.use((reqConfig) => {
    if (isStateChangingMethod(reqConfig.method)) {
      const csrfToken = readCookieValue(csrfCookieName);
      if (csrfToken) {
        reqConfig.headers.set(csrfHeaderName, csrfToken);
      }
    }
    return reqConfig;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{ message?: string; code?: string; requestId?: string }>) => {
      const statusCode = error.response?.status ?? 500;
      if (statusCode === 401 && onUnauthorized) {
        onUnauthorized();
      }

      const apiError = new ApiClientError({
        code: error.response?.data?.code ?? error.code ?? 'HTTP_ERROR',
        message: error.response?.data?.message ?? error.message ?? 'Request failed',
        statusCode,
        requestId: error.response?.data?.requestId,
      });

      return Promise.reject(apiError);
    },
  );

  return {
    async get<T>(path: string, options?: RequestOptions): Promise<T> {
      const res = await instance.get<T>(path, options);
      return res.data;
    },
    async post<T, B = unknown>(path: string, body?: B, options?: RequestOptions): Promise<T> {
      const res = await instance.post<T>(path, body, options);
      return res.data;
    },
    async put<T, B = unknown>(path: string, body?: B, options?: RequestOptions): Promise<T> {
      const res = await instance.put<T>(path, body, options);
      return res.data;
    },
    async patch<T, B = unknown>(path: string, body?: B, options?: RequestOptions): Promise<T> {
      const res = await instance.patch<T>(path, body, options);
      return res.data;
    },
    async delete<T>(path: string, options?: RequestOptions): Promise<T> {
      const res = await instance.delete<T>(path, options);
      return res.data;
    },
    raw: instance,
  };
}
