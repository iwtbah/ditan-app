export const ROUTE_PATHS = {
  home: '/',
  ditan: '/ditan',
  publish: '/publish',
  following: '/following',
  search: '/search',
  shopDetail: (shopId = ':shopId') => `/shops/${shopId}`,
  noteDetail: (noteId = ':noteId') => `/notes/${noteId}`,
  userProfile: (userId = ':userId') => `/users/${userId}`,
  my: '/me',
  login: '/auth/login',
} as const;
