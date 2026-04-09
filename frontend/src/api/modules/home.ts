import { request } from '@/api/client';
import type { NoteCard, PageResponse, PaginationParams } from '@/types';

export function fetchHomeFeed(params: PaginationParams = { page: 1, pageSize: 10 }) {
  return request<PageResponse<NoteCard>>('/feed/recommendations', {
    params,
  });
}
