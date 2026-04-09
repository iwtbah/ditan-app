export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

export interface PageResponse<T> {
  list: T[];
  page: number;
  pageSize: number;
  total: number;
  hasMore: boolean;
}
