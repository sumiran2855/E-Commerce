import { ApiClientError } from '../errors/api-error';
import type { ApiClientConfig, RequestOptions } from '../types';

export interface ServerRequestOptions extends RequestOptions {
  cache?: RequestCache;
  revalidate?: number | false;
  tags?: string[];
  cookieHeader?: string;
}

export interface ServerApiClient {
  get<T>(path: string, options?: ServerRequestOptions): Promise<T>;
  post<T, B = unknown>(path: string, body?: B, options?: ServerRequestOptions): Promise<T>;
}

export function createServerApiClient(config: ApiClientConfig): ServerApiClient {
  const { baseUrl, timeoutMs = 10_000 } = config;

  async function request<T>(
    method: string,
    path: string,
    body?: unknown,
    options?: ServerRequestOptions,
  ): Promise<T> {
    const url = new URL(path.replace(/^\//, ''), baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`);

    if (options?.params) {
      for (const [key, value] of Object.entries(options.params)) {
        if (value !== undefined) {
          url.searchParams.set(key, String(value));
        }
      }
    }

    const headers: Record<string, string> = {
      Accept: 'application/json',
      ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      ...(options?.cookieHeader ? { Cookie: options.cookieHeader } : {}),
      ...options?.headers,
    };

    const timeoutSignal = AbortSignal.timeout(timeoutMs);
    const signal = options?.signal
      ? AbortSignal.any([options.signal, timeoutSignal])
      : timeoutSignal;

    const response = await fetch(url.toString(), {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal,
      cache: options?.cache,
      next:
        options?.revalidate !== undefined || options?.tags !== undefined
          ? { revalidate: options.revalidate, tags: options.tags }
          : undefined,
    } as RequestInit);

    if (!response.ok) {
      let message = `Request failed with status ${response.status}`;
      let code = 'SERVER_HTTP_ERROR';
      try {
        const errBody = (await response.json()) as { message?: string; code?: string };
        message = errBody.message ?? message;
        code = errBody.code ?? code;
      } catch {
        // Ignore JSON parse error on non-JSON error responses
      }
      throw new ApiClientError({
        code,
        message,
        statusCode: response.status,
      });
    }

    return (await response.json()) as T;
  }

  return {
    get<T>(path: string, options?: ServerRequestOptions): Promise<T> {
      return request<T>('GET', path, undefined, options);
    },
    post<T, B = unknown>(path: string, body?: B, options?: ServerRequestOptions): Promise<T> {
      return request<T>('POST', path, body, options);
    },
  };
}
