export interface ApiEnvelope<T> {
  code: number;
  message: string;
  data: T;
}

export interface ApiErrorShape {
  code: number | string;
  message: string;
  details?: unknown;
}
