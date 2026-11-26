export interface ApiClientConfig {
  baseUrl: string;
  timeoutMs?: number;
  mockMode?: boolean;
  csrfCookieName?: string;
  csrfHeaderName?: string;
  onUnauthorized?: () => void;
}

export interface RequestOptions {
  signal?: AbortSignal;
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean | undefined>;
}
