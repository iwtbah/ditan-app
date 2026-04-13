/**
 * API 层通用类型。
 * 用于约束统一响应包裹结构和通用错误结构。
 */
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
