import { localizeMockData } from "@/features/shared/mocks/localize-mock-data";

export const SEARCH_NOTES = [
  {
    id: 1,
    title: "周末和闺蜜的宝藏下午茶店打卡，拍照绝绝子",
    author: "小透明",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200",
    likes: 234,
    height: "h-48",
    liked: true,
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
  },
  {
    id: 2,
    title: "绝美日落观景台，情侣约会必去",
    author: "浪漫主义者",
    authorAvatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200",
    likes: 1120,
    height: "h-40",
    liked: true,
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
  },
  {
    id: 3,
    title: "新开的社区小酒馆，工作日晚上也很有氛围",
    author: "薄荷拿铁",
    authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200",
    likes: 486,
    height: "h-52",
    liked: false,
    image: "https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
  },
  {
    id: 4,
    title: "城市边缘的展览馆，适合周末慢慢逛一下午",
    author: "阿择",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200",
    likes: 302,
    height: "h-44",
    liked: false,
    image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
  },
];

export const SEARCH_SHOPS = localizeMockData([
  { id: 1, name: "时光机复古杂货铺", rating: "4.8", distance: "1.2km", tags: ["复古", "杂货", "好店推荐"], price: "￥80/人", recommendation: "这里藏着80后的童年回忆", image: "https://images.unsplash.com/photo-1443884590026-2e4d21aee71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwc2hvcHxlbnwxfHx8fDE3NzYwODM0MTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: 2, name: "半岛咖啡馆", rating: "4.9", distance: "3.5km", tags: ["咖啡", "下午茶", "高颜值"], price: "￥65/人", recommendation: "拿铁和海盐卷盲点不出错", image: "https://images.unsplash.com/photo-1567880905822-56f8e06fe630?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxjYWZlfGVufDF8fHx8MTc3NjA4MzQyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: 3, name: "光影书店", rating: "4.7", distance: "2.1km", tags: ["书店", "安静", "文艺"], price: "￥48/人", recommendation: "靠窗座位适合待一整晚", image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
  { id: 4, name: "山间烘焙实验室", rating: "4.8", distance: "4.2km", tags: ["面包", "早午餐", "新店"], price: "￥72/人", recommendation: "可颂和奶油吐司是人气前二", image: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
]);

export const SEARCH_HISTORY_TERMS = ["咖啡馆", "下午茶", "精酿小酒馆", "露营"];

export const SEARCH_TRENDING_TERMS = [
  "复古杂货铺",
  "看展",
  "落日观景台",
  "城市骑行",
  "早午餐",
  "约会餐厅",
];
