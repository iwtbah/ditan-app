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
  const fallbackEnabled = import.meta.env.VITE_ENABLE_API_FALLBACK === "true";

  try {
    return await request();
  } catch (error) {
    if (!fallbackEnabled) {
      throw error;
    }

    return fallback;
  }
}
