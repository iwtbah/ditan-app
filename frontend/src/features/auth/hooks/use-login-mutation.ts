import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/api/modules';
import { useAuthStore } from '@/stores/auth-store';
import type { LoginPayload } from '@/types';

export function useLoginMutation() {
  const setSession = useAuthStore((state) => state.setSession);

  return useMutation({
    mutationFn: (payload: LoginPayload) => authApi.login(payload),
    onSuccess: (session) => {
      setSession(session);
    },
  });
}
