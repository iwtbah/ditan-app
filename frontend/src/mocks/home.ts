import type { HomeDiscoveryPayload } from '@/types';

export const homeDiscoveryMock: HomeDiscoveryPayload = {
  city: '北京',
  categories: ['推荐', '美食', '咖啡', '火锅', '运动', '景点', '展览'],
  notes: [
    {
      id: 'note-1',
      title: '周末和闺蜜的宝藏下午茶店打卡，拍照绝绝子',
      excerpt: '复古花砖、自然光和甜品都很稳，下午两点后最适合出片。',
      coverUrl:
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
      author: {
        id: 'user-1',
        nickname: '小透明',
        avatarUrl:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
      },
      likedCount: 234,
      commentCount: 28,
      publishedAt: '2小时前',
      isLiked: true,
      category: '咖啡',
    },
    {
      id: 'note-2',
      title: '城市露营体验，不出城也能拥抱大自然',
      excerpt: '草地、天幕和烤肠安排得明明白白，适合周末半日放空。',
      coverUrl:
        'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
      author: {
        id: 'user-2',
        nickname: '户外探路者',
        avatarUrl:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
      },
      likedCount: 102,
      commentCount: 16,
      publishedAt: '今天',
      isLiked: false,
      category: '景点',
    },
    {
      id: 'note-3',
      title: '这家深夜食堂，温暖了整个城市的胃口',
      excerpt: '晚上十点后依旧热闹，招牌牛杂煲和炒饭真的很稳。',
      coverUrl:
        'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=900&q=80',
      author: {
        id: 'user-3',
        nickname: '吃货老陈',
        avatarUrl:
          'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80',
      },
      likedCount: 890,
      commentCount: 54,
      publishedAt: '昨天',
      isLiked: true,
      category: '美食',
    },
    {
      id: 'note-4',
      title: '极简纯白风咖啡馆，随便拍都出片',
      excerpt: '空间很克制，奶油色和白墙搭得很舒服，下午阳光尤其好。',
      coverUrl:
        'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80',
      author: {
        id: 'user-4',
        nickname: '审美控',
        avatarUrl:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80',
      },
      likedCount: 56,
      commentCount: 7,
      publishedAt: '3天前',
      isLiked: false,
      category: '咖啡',
    },
    {
      id: 'note-5',
      title: '隐藏在弄堂里的古着店，淘到宝了',
      excerpt: '衣架上很多孤品，店主会帮你搭整套，适合慢慢逛。',
      coverUrl:
        'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
      author: {
        id: 'user-5',
        nickname: '复古女孩',
        avatarUrl:
          'https://images.unsplash.com/photo-1546961329-78bef0414d7c?auto=format&fit=crop&w=120&q=80',
      },
      likedCount: 412,
      commentCount: 32,
      publishedAt: '本周',
      isLiked: false,
      category: '展览',
    },
    {
      id: 'note-6',
      title: '绝美日落观景台，情侣约会必去',
      excerpt: '建议傍晚六点前到，视野开阔，城市天际线特别适合拍照。',
      coverUrl:
        'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80',
      author: {
        id: 'user-6',
        nickname: '浪漫主义者',
        avatarUrl:
          'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&q=80',
      },
      likedCount: 1120,
      commentCount: 83,
      publishedAt: '本周',
      isLiked: true,
      category: '景点',
    },
  ],
  shops: [
    {
      id: 'shop-1',
      name: '时光机复古杂货铺',
      category: '推荐',
      district: '东城区',
      rating: 4.8,
      averagePrice: 80,
      priceText: '￥80/人',
      distance: '1.2km',
      recommendation: '这里藏着80后的童年回忆',
      recommendedNoteTitle: '周末必须去打卡的绝美圣地',
      coverUrl:
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80',
      tags: [
        { id: 'tag-1', label: '复古' },
        { id: 'tag-2', label: '杂货' },
        { id: 'tag-3', label: '好店推荐' },
      ],
    },
    {
      id: 'shop-2',
      name: '半岛咖啡馆',
      category: '咖啡',
      district: '朝阳区',
      rating: 4.9,
      averagePrice: 65,
      priceText: '￥65/人',
      distance: '3.5km',
      recommendation: '拿铁和海盐卷盲点不出错',
      recommendedNoteTitle: '靠窗二楼位真的很适合出片',
      coverUrl:
        'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=900&q=80',
      tags: [
        { id: 'tag-4', label: '咖啡' },
        { id: 'tag-5', label: '下午茶' },
        { id: 'tag-6', label: '高颜值' },
      ],
    },
    {
      id: 'shop-3',
      name: '不打烊小酒馆',
      category: '美食',
      district: '西城区',
      rating: 4.7,
      averagePrice: 120,
      priceText: '￥120/人',
      distance: '2.1km',
      recommendation: '氛围绝佳，精酿啤酒种类多',
      recommendedNoteTitle: '夜里十一点之后气氛最好',
      coverUrl:
        'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=900&q=80',
      tags: [
        { id: 'tag-7', label: '精酿' },
        { id: 'tag-8', label: '氛围感' },
        { id: 'tag-9', label: '深夜食堂' },
      ],
    },
    {
      id: 'shop-4',
      name: '山居秋野民宿',
      category: '景点',
      district: '怀柔区',
      rating: 5.0,
      averagePrice: 300,
      priceText: '￥300/人',
      distance: '15km',
      recommendation: '推开窗就是漫山遍野的绿意',
      recommendedNoteTitle: '秋天来住一晚真的像电影画面',
      coverUrl:
        'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
      tags: [
        { id: 'tag-10', label: '周末好去处' },
        { id: 'tag-11', label: '自然' },
        { id: 'tag-12', label: '避世' },
      ],
    },
  ],
};
