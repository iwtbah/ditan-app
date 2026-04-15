export interface ApiErrorPayload {
  code: string;
  message: string;
  details?: unknown;
}

export interface ApiListParams {
  page?: number;
  pageSize?: number;
}

export interface ApiListResponse<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
}

export interface ApiEnvelope<T> {
  data: T;
  error?: ApiErrorPayload;
  success: boolean;
}
