import type { FollowingFeedPayload, MyProfileView } from '@/types';

const avatarUrl =
  'https://images.unsplash.com/photo-1572604745465-3f65869e2c67?auto=format&fit=crop&w=1080&q=80';

export const followingFeedMock: FollowingFeedPayload = {
  items: [
    {
      id: 'following-1',
      type: '笔记',
      author: {
        name: '早睡早起的小白',
        avatarUrl:
          'https://images.unsplash.com/photo-1595918989407-ae09b2f222bf?auto=format&fit=crop&w=1080&q=80',
      },
      timeLabel: '2小时前',
      title: '藏在深巷里的治愈系咖啡馆，周末好去处',
      content:
        '周末偶然发现的一家日系原木风咖啡馆，手冲咖啡味道很绝，还有两只可爱的店猫。绝对是放松心情的绝佳地点！',
      imageUrl:
        'https://images.unsplash.com/photo-1597657399260-79eedfca3c85?auto=format&fit=crop&w=1080&q=80',
      shopInfo: {
        name: '猫雨咖啡',
        city: '上海',
      },
      stats: {
        likes: 128,
        comments: 34,
        favorites: 56,
        isLiked: true,
      },
    },
    {
      id: 'following-2',
      type: '店铺',
      author: {
        name: '城市探索指南',
        avatarUrl:
          'https://images.unsplash.com/photo-1571513722275-4b41940f54b8?auto=format&fit=crop&w=1080&q=80',
      },
      timeLabel: '5小时前',
      title: '本地人私藏的平价地道日料店',
      content:
        '绝对是N刷不腻的一家宝藏小店，招牌寿喜锅和厚切三文鱼分量超级足，性价比绝了！每天都要排队。',
      imageUrl:
        'https://images.unsplash.com/photo-1696449241254-11cf7f18ce32?auto=format&fit=crop&w=1080&q=80',
      shopInfo: {
        name: '隐泉日式料理',
        city: '北京',
      },
      stats: {
        likes: 89,
        comments: 12,
        favorites: 22,
        isLiked: false,
      },
    },
  ],
};

const baseNotes = [
  {
    id: 'profile-note-1',
    title: '绝美日落观景台',
    excerpt: '傍晚六点之后的城市边界线最好看。',
    coverUrl:
      'https://images.unsplash.com/photo-1617965215075-b1f768dc8a61?auto=format&fit=crop&w=1080&q=80',
    author: {
      id: 'me',
      nickname: '明明',
      avatarUrl,
    },
    likedCount: 121,
    commentCount: 12,
    publishedAt: '昨天',
    category: '景点',
  },
  {
    id: 'profile-note-2',
    title: '隐藏在弄堂里的古着店',
    excerpt: '小店不大，但几乎件件都想试穿。',
    coverUrl:
      'https://images.unsplash.com/photo-1721884258144-5d788061e4c4?auto=format&fit=crop&w=1080&q=80',
    author: {
      id: 'me',
      nickname: '明明',
      avatarUrl,
    },
    likedCount: 122,
    commentCount: 18,
    publishedAt: '本周',
    category: '复古',
  },
  {
    id: 'profile-note-3',
    title: '周末城市公园野餐指南',
    excerpt: '带上折叠椅和水果，下午四点最舒服。',
    coverUrl:
      'https://images.unsplash.com/photo-1668009219418-4ece0d9e36c4?auto=format&fit=crop&w=1080&q=80',
    author: {
      id: 'me',
      nickname: '明明',
      avatarUrl,
    },
    likedCount: 89,
    commentCount: 7,
    publishedAt: '上周',
    category: '景点',
  },
  {
    id: 'profile-note-4',
    title: '极简纯白风咖啡馆打卡',
    excerpt: '奶油色空间和自然光真的太适合拍照。',
    coverUrl:
      'https://images.unsplash.com/photo-1648462908676-8305f0eff8e0?auto=format&fit=crop&w=1080&q=80',
    author: {
      id: 'me',
      nickname: '明明',
      avatarUrl,
    },
    likedCount: 210,
    commentCount: 25,
    publishedAt: '本月',
    category: '咖啡',
  },
];

const baseShops = [
  {
    id: 'profile-shop-1',
    name: '时光机复古杂货铺',
    category: '店铺',
    district: '北京',
    rating: 4.8,
    averagePrice: 80,
    priceText: '￥80/人',
    distance: '1.2km',
    recommendation: '这里藏着80后的童年回忆',
    coverUrl:
      'https://images.unsplash.com/photo-1721884258144-5d788061e4c4?auto=format&fit=crop&w=1080&q=80',
    tags: [
      { id: 'shop-tag-1', label: '复古' },
      { id: 'shop-tag-2', label: '杂货' },
      { id: 'shop-tag-3', label: '好店推荐' },
    ],
  },
  {
    id: 'profile-shop-2',
    name: '半岛咖啡馆',
    category: '店铺',
    district: '北京',
    rating: 4.9,
    averagePrice: 65,
    priceText: '￥65/人',
    distance: '3.5km',
    recommendation: '拿铁和海盐卷盲点不出错',
    coverUrl:
      'https://images.unsplash.com/photo-1648462908676-8305f0eff8e0?auto=format&fit=crop&w=1080&q=80',
    tags: [
      { id: 'shop-tag-4', label: '咖啡' },
      { id: 'shop-tag-5', label: '下午茶' },
      { id: 'shop-tag-6', label: '高颜值' },
    ],
  },
];

export const myProfileViewMock: MyProfileView = {
  profile: {
    id: 'me',
    nickname: '小明的小名叫明明',
    avatarUrl,
    bio: '爱好摄影，喜欢打卡各种宝藏小店。关注我，带你发现城市里的美好~',
    city: '北京',
    followerCount: 3400,
    followingCount: 128,
    noteCount: 12,
    likeCount: 12500,
    badge: '探店达人',
  },
  notes: baseNotes,
  favoriteNotes: baseNotes.slice(0, 3),
  favoriteShops: baseShops,
  likedNotes: baseNotes.slice(1),
  likedShops: baseShops.slice(0, 1),
};
