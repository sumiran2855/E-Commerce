export interface ApiErrorDetails {
  code: string;
  message: string;
  statusCode: number;
  requestId?: string;
}

export class ApiClientError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly requestId?: string;

  constructor(details: ApiErrorDetails) {
    super(details.message);
    this.name = 'ApiClientError';
    this.code = details.code;
    this.statusCode = details.statusCode;
    this.requestId = details.requestId;
  }
}

export function normalizeApiError(error: unknown): ApiClientError {
  if (error instanceof ApiClientError) {
    return error;
  }

  if (error instanceof Error) {
    return new ApiClientError({
      code: 'UNKNOWN_ERROR',
      message: error.message || 'An unexpected error occurred',
      statusCode: 500,
    });
  }

  return new ApiClientError({
    code: 'UNKNOWN_ERROR',
    message: 'An unexpected error occurred',
    statusCode: 500,
  });
}
