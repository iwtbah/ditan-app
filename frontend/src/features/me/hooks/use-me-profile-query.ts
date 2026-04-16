import { withApiFallback } from "@/api/fallback";
import { useQuery } from "@tanstack/react-query";
import { unwrapApiEnvelope } from "@/api/client";
import { getMeProfile } from "@/api/modules/me";
import { QUERY_KEYS } from "@/constants/query-keys";
import { PROFILE_NOTES, PROFILE_SHOPS, PROFILE_SUMMARY } from "../mocks";

const meProfileFallback = {
  notes: PROFILE_NOTES,
  profile: PROFILE_SUMMARY,
  shops: PROFILE_SHOPS,
};

export function useMeProfileQuery(enabled = true) {
  return useQuery({
    enabled,
    initialData: meProfileFallback,
    queryKey: QUERY_KEYS.me.profile(),
    queryFn: async () =>
      withApiFallback(
        async () => unwrapApiEnvelope(await getMeProfile()),
        meProfileFallback,
      ),
  });
}
