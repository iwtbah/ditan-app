import type { FollowingFeedData } from "@/types/note";
import { localizeMockData } from "@/features/shared/mocks/localize-mock-data";

export const FOLLOWING_FEEDS: FollowingFeedData[] = localizeMockData([
  {
    id: 1,
    type: '笔记',
    author: { name: '早睡早起的小白', avatar: 'https://images.unsplash.com/photo-1595918989407-ae09b2f222bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMGdpcmwlMjBjdXRlfGVufDF8fHx8MTc3NjEzMjE3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
    time: '2小时前',
    title: '藏在深巷里的治愈系咖啡馆，周末好去处',
    content: '周末偶然发现的一家日系原木风咖啡馆，手冲咖啡味道很绝，还有两只可爱的店猫。绝对是放松心情的绝佳地点！',
    image: 'https://images.unsplash.com/photo-1597657399260-79eedfca3c85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwY2F0JTIwY2FmZXxlbnwxfHx8fDE3NzYxMzIxNjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    shopInfo: { name: '猫雨咖啡', city: '上海' },
    stats: { likes: 128, comments: 34, stars: 56, isLiked: true }
  },
  {
    id: 2,
    type: '店铺',
    author: { name: '城市探索指南', avatar: 'https://images.unsplash.com/photo-1571513722275-4b41940f54b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc2MTMyMTc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
    time: '5小时前',
    title: '本地人私藏的平价地道日料店',
    content: '绝对是N刷不腻的一家宝藏小店，招牌寿喜锅和厚切三文鱼分量超级足，性价比绝了！每天都要排队。',
    image: 'https://images.unsplash.com/photo-1696449241254-11cf7f18ce32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzc2MTMyMTY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    shopInfo: { name: '隐泉日式料理', city: '北京' },
    stats: { likes: 89, comments: 12, stars: 22, isLiked: false }
  }
]);
