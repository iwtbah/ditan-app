import { homeDiscoveryMock } from '@/mocks/home';
import { myProfileViewMock } from '@/mocks/social';
import type { SearchFilters, SearchResult } from '@/types';

const searchUsers = [
  myProfileViewMock.profile,
  {
    id: 'search-user-2',
    nickname: '城市探索指南',
    avatarUrl: 'https://images.unsplash.com/photo-1571513722275-4b41940f54b8?auto=format&fit=crop&w=120&q=80',
    bio: '专注本地平价好店与路线推荐',
    city: '北京',
  },
];

export function getMockSearchResults(filters: SearchFilters): SearchResult {
  const keyword = filters.keyword.trim().toLowerCase();

  if (!keyword) {
    return {
      shops: [],
      notes: [],
      users: [],
    };
  }

  const shops = homeDiscoveryMock.shops.filter((shop) => {
    const target = [shop.name, shop.category, shop.district, ...shop.tags.map((tag) => tag.label)].join(' ').toLowerCase();
    return target.includes(keyword);
  });

  const notes = homeDiscoveryMock.notes.filter((note) => {
    const target = [note.title, note.excerpt, note.author.nickname, note.category].join(' ').toLowerCase();
    return target.includes(keyword);
  });

  const users = searchUsers.filter((user) => {
    const target = [user.nickname, user.bio ?? '', user.city ?? ''].join(' ').toLowerCase();
    return target.includes(keyword);
  });

  if (filters.tab === 'shops') {
    return { shops, notes: [], users: [] };
  }

  if (filters.tab === 'notes') {
    return { shops: [], notes, users: [] };
  }

  if (filters.tab === 'users') {
    return { shops: [], notes: [], users };
  }

  return {
    shops,
    notes,
    users,
  };
}
