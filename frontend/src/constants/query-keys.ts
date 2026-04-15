export const QUERY_KEYS = {
  following: {
    feeds: (filter?: string) => ["following", "feeds", filter ?? "all"] as const,
  },
  home: {
    notes: (category?: string) => ["home", "notes", category ?? "all"] as const,
    shops: (category?: string) => ["home", "shops", category ?? "all"] as const,
  },
  me: {
    profile: () => ["me", "profile"] as const,
  },
  notes: {
    detail: (noteId: string) => ["notes", "detail", noteId] as const,
  },
  search: {
    notes: (keyword: string) => ["search", "notes", keyword] as const,
    shops: (keyword: string) => ["search", "shops", keyword] as const,
  },
  shops: {
    detail: (shopId: string) => ["shops", "detail", shopId] as const,
  },
} as const;
