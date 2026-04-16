import type { ApiListResponse } from "@/types/api";

export function createListResponse<T>(items: T[]): ApiListResponse<T> {
  return {
    items,
    page: 1,
    pageSize: items.length,
    total: items.length,
  };
}

export async function withApiFallback<T>(request: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await request();
  } catch {
    return fallback;
  }
}
