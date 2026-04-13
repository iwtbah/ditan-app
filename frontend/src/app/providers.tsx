/**
 * 全局 Provider 聚合层。
 * 初始化阶段先统一挂载 QueryClientProvider，后续可继续追加主题、国际化等 Provider。
 */
import type { PropsWithChildren } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/app/query-client';

export function AppProviders({ children }: PropsWithChildren) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
