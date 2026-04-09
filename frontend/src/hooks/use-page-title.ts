import { useEffect } from 'react';
import { useUiStore } from '@/stores/ui-store';

const APP_NAME = '地探';

export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = `${title} | ${APP_NAME}`;
    useUiStore.getState().setPageTitle(title);

    return () => {
      useUiStore.getState().setPageTitle('');
      document.title = APP_NAME;
    };
  }, [title]);
}
