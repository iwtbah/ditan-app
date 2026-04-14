import type { DitanDiscoveryPayload } from '@/types';

export const ditanDiscoveryMock: DitanDiscoveryPayload = {
  city: '北京',
  cards: [
    {
      id: 'ditan-1',
      title: '极简纯白风咖啡馆，随便拍都出片',
      shopName: '半岛咖啡馆',
      distance: '1.2km',
      imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=900&q=80',
      tags: ['高颜值', '咖啡'],
    },
    {
      id: 'ditan-2',
      title: '绝美日落观景台，情侣约会必去',
      shopName: '云端观景台',
      distance: '3.5km',
      imageUrl: 'https://images.unsplash.com/photo-1516483638261-f40af5aa3228?auto=format&fit=crop&w=900&q=80',
      tags: ['夜景', '浪漫'],
    },
    {
      id: 'ditan-3',
      title: '隐藏在弄堂里的古着店，淘到宝了',
      shopName: '时光机复古杂货铺',
      distance: '5.0km',
      imageUrl: 'https://images.unsplash.com/photo-1555529771-835f59bfc50c?auto=format&fit=crop&w=900&q=80',
      tags: ['探店', '复古'],
    },
    {
      id: 'ditan-4',
      title: '这家深夜食堂，温暖了整个城市的胃口',
      shopName: '不打烊小酒馆',
      distance: '2.1km',
      imageUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=900&q=80',
      tags: ['精酿', '深夜食堂'],
    },
    {
      id: 'ditan-5',
      title: '周末和闺蜜的宝藏下午茶店打卡',
      shopName: '甜心烘焙坊',
      distance: '0.8km',
      imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80',
      tags: ['甜品', '下午茶'],
    },
  ],
};
