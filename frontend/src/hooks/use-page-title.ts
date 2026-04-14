/**
 * 页面标题同步 Hook。
 * 统一同步浏览器标题和应用级标题状态，供布局层展示当前页面上下文。
 */
import { useEffect } from 'react';
import { useAppStore } from '@/stores/app-store';

const APP_NAME = '迪探';

export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = `${title} | ${APP_NAME}`;
    useAppStore.getState().setPageTitle(title);

    return () => {
      useAppStore.getState().setPageTitle('');
      document.title = APP_NAME;
    };
  }, [title]);
}
