import type { ApiEnvelope, ApiErrorPayload } from "@/types/api";

type ApiQueryValue = string | number | boolean | undefined | null;

export interface ApiRequestConfig extends Omit<RequestInit, "body"> {
  body?: BodyInit | object | null;
  query?: object;
}

export class ApiRequestError extends Error {
  status: number;
  payload?: ApiErrorPayload;

  constructor(message: string, status: number, payload?: ApiErrorPayload) {
    super(message);
    this.name = "ApiRequestError";
    this.status = status;
    this.payload = payload;
  }
}

function buildQueryString(query?: ApiRequestConfig["query"]) {
  if (!query) return "";

  const params = new URLSearchParams();

  Object.entries(query as Record<string, ApiQueryValue>).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    params.set(key, String(value));
  });

  const serialized = params.toString();
  return serialized ? `?${serialized}` : "";
}

function resolveBody(body?: ApiRequestConfig["body"]) {
  if (!body || typeof body !== "object" || body instanceof FormData || body instanceof URLSearchParams) {
    return body ?? null;
  }

  return JSON.stringify(body);
}

function resolveBaseUrl() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL?.trim();

  if (!baseUrl) {
    return "";
  }

  return baseUrl.replace(/\/+$/, "");
}

function resolveRequestUrl(path: string, query?: ApiRequestConfig["query"]) {
  const resolvedPath = `${path}${buildQueryString(query)}`;
  const baseUrl = resolveBaseUrl();

  if (!baseUrl || /^https?:\/\//.test(path)) {
    return resolvedPath;
  }

  return `${baseUrl}${resolvedPath.startsWith("/") ? resolvedPath : `/${resolvedPath}`}`;
}

export async function apiRequest<T>(
  path: string,
  { headers, query, body, ...init }: ApiRequestConfig = {},
): Promise<T> {
  const resolvedBody = resolveBody(body);
  const resolvedHeaders =
    body && typeof body === "object" && !(body instanceof FormData)
      ? {
          "Content-Type": "application/json",
          ...headers,
        }
      : headers;

  const response = await fetch(resolveRequestUrl(path, query), {
    ...init,
    body: resolvedBody,
    headers: resolvedHeaders,
  });

  if (!response.ok) {
    throw new ApiRequestError(`Request failed with status ${response.status}`, response.status);
  }

  return (await response.json()) as T;
}

export function unwrapApiEnvelope<T>(envelope: ApiEnvelope<T>) {
  if (!envelope.success) {
    throw new ApiRequestError(envelope.error?.message ?? "Request failed", 200, envelope.error);
  }

  return envelope.data;
}
