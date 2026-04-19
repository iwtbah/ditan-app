import type { Location } from 'react-router-dom';
import { ROUTE_PATHS } from '@/constants/routes';

export const AUTH_REDIRECT_QUERY_KEY = 'redirect';

export function normalizePhoneNumber(value: string) {
  return value.replace(/\D/g, '').slice(0, 11);
}

export function isValidPhoneNumber(phone: string) {
  return /^1\d{10}$/.test(normalizePhoneNumber(phone));
}

export function buildLoginRedirectPath(
  location: Pick<Location, 'hash' | 'pathname' | 'search'>,
) {
  return `${location.pathname}${location.search}${location.hash}` || ROUTE_PATHS.home;
}

export function resolveSafeRedirectTarget(rawRedirect: string | null | undefined) {
  if (!rawRedirect) {
    return ROUTE_PATHS.home;
  }

  const target = rawRedirect.trim();

  if (!target.startsWith('/') || target.startsWith('//')) {
    return ROUTE_PATHS.home;
  }

  if (target.startsWith(ROUTE_PATHS.login)) {
    return ROUTE_PATHS.home;
  }

  return target;
}
