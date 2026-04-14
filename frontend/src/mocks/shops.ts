import { homeDiscoveryMock } from '@/mocks/home';
import type { ShopDetail } from '@/types';

const shopDetails: Record<string, ShopDetail> = {
  'shop-1': {
    ...homeDiscoveryMock.shops[0],
    address: '东城区交道口南大街15号院内',
    phone: '010-6288-1024',
    businessHours: '10:00 - 23:00',
    noteCount: 24,
    commentCount: 342,
    photoUrls: [
      'https://images.unsplash.com/photo-1571217748526-261477b6ac62?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1606757870480-975652100251?auto=format&fit=crop&w=1200&q=80',
    ],
    distance: '2.4km',
    walkTime: '步行约15分钟',
    rankingText: '本地人气榜第1名',
    coupons: [
      {
        id: 'coupon-1',
        title: '79元 代 100元 饮品券',
        sales: '半年售 1200+',
        type: '代金券',
        oldPrice: '100',
        newPrice: '79',
      },
      {
        id: 'coupon-2',
        title: '双人复古下午茶套餐',
        sales: '半年售 800+',
        type: '套餐',
        oldPrice: '258',
        newPrice: '188',
      },
    ],
    recommendedDishes: [
      {
        id: 'dish-1',
        name: '招牌手冲瑰夏',
        reason: '进店必点',
        imageUrl: 'https://images.unsplash.com/photo-1753109818506-2c4c39c16c9c?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: 'dish-2',
        name: '焦糖海盐卷',
        reason: '甜而不腻',
        imageUrl: 'https://images.unsplash.com/photo-1680090966795-06fdd0e7046b?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: 'dish-3',
        name: '牛油果轻食吐司',
        reason: '健康轻食',
        imageUrl: 'https://images.unsplash.com/photo-1593903971086-da1ad90da20b?auto=format&fit=crop&w=400&q=80',
      },
    ],
    reviews: [
      {
        id: 'review-1',
        author: '咖啡脑袋',
        avatarUrl: 'https://images.unsplash.com/photo-1564752423896-11d52fbf3257?auto=format&fit=crop&w=120&q=80',
        content: '氛围感拉满，手冲味道很干净，老板人超级好，还会再来的宝藏店铺。',
        likes: 124,
        rating: 5,
        timeLabel: '2天前',
      },
      {
        id: 'review-2',
        author: '周末探店',
        avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
        content: '位置有点隐蔽，但是进去别有洞天，非常适合拍照出片，建议下午光线好的时候来。',
        likes: 89,
        rating: 4,
        timeLabel: '昨天',
      },
    ],
    selectedNotes: [
      {
        id: 'note-1',
        title: '必打卡的复古小店，随手拍出大片感',
        author: '小透明',
        avatarUrl: 'https://images.unsplash.com/photo-1564752423896-11d52fbf3257?auto=format&fit=crop&w=120&q=80',
        likes: 234,
        imageUrl: 'https://images.unsplash.com/photo-1688148484023-b56a9b91525a?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'note-2',
        title: '在这里待了一整个下午，太治愈了',
        author: '审美控',
        avatarUrl: 'https://images.unsplash.com/photo-1572604745465-3f65869e2c67?auto=format&fit=crop&w=120&q=80',
        likes: 89,
        imageUrl: 'https://images.unsplash.com/photo-1704354924223-d44ef8283cce?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'note-3',
        title: '打卡这杯手冲，口感很惊喜',
        author: '咖啡重度患者',
        avatarUrl: 'https://images.unsplash.com/photo-1617355453845-6996ffeee4de?auto=format&fit=crop&w=120&q=80',
        likes: 156,
        imageUrl: 'https://images.unsplash.com/photo-1622979059365-5952c36686e0?auto=format&fit=crop&w=800&q=80',
      },
    ],
    liked: false,
  },
};

export function getMockShopDetail(shopId: string) {
  return shopDetails[shopId] ?? shopDetails['shop-1'];
}
