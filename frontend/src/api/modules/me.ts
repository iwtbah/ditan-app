import type { NoteCardData } from "@/types/note";
import type { ShopCardData } from "@/types/shop";
import type { ProfileSummary } from "@/types/user";
import type { ApiEnvelope } from "@/types/api";
import { apiRequest } from "@/api/client";

export interface MeProfileResponse {
  notes: NoteCardData[];
  profile: ProfileSummary;
  shops: ShopCardData[];
}

export function getMeProfile() {
  return apiRequest<ApiEnvelope<MeProfileResponse>>("/api/me/profile");
}
