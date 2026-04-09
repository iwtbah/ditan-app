import { useAuthStore } from '@/stores/auth-store';
import type { ApiEnvelope } from '@/types';

type QueryValue = string | number | boolean | null | undefined;
type RequestParams = Record<string, QueryValue> | object;
type RequestBody = BodyInit | object | unknown[];

export interface RequestOptions extends Omit<RequestInit, 'body'> {
  params?: RequestParams;
  body?: RequestBody;
  withAuth?: boolean;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api';

function buildUrl(path: string, params?: RequestParams) {
  const normalizedBase = API_BASE_URL.replace(/\/$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const url = new URL(`${normalizedBase}${normalizedPath}`, window.location.origin);

  Object.entries((params ?? {}) as Record<string, QueryValue>).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') {
      return;
    }
    url.searchParams.set(key, String(value));
  });

  return url.toString();
}

function isJsonBody(body: RequestOptions['body']) {
  if (!body) {
    return false;
  }

  return !(body instanceof FormData) && !(body instanceof URLSearchParams) && typeof body !== 'string';
}

function isApiEnvelope<T>(value: unknown): value is ApiEnvelope<T> {
  return typeof value === 'object' && value !== null && 'data' in value;
}

export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { params, body, headers, withAuth = true, ...init } = options;
  const token = useAuthStore.getState().session?.accessToken;
  const response = await fetch(buildUrl(path, params), {
    ...init,
    headers: {
      Accept: 'application/json',
      ...(isJsonBody(body) ? { 'Content-Type': 'application/json' } : {}),
      ...(withAuth && token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: isJsonBody(body) ? JSON.stringify(body) : (body as BodyInit | null | undefined),
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const payload = (await response.json()) as T | ApiEnvelope<T>;
  return isApiEnvelope<T>(payload) ? payload.data : payload;
}
