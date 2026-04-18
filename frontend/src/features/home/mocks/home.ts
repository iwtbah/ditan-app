import type { NoteCardData } from "@/types/note";
import type { ShopCardData } from "@/types/shop";
import { localizeMockData } from "@/features/shared/mocks/localize-mock-data";

export const HOME_NOTES: NoteCardData[] = localizeMockData([
  { id: 1, title: "周末和闺蜜的宝藏下午茶店打卡，拍照绝绝子", author: "小透明", likes: 234, height: "h-48", liked: true, image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080" },
  { id: 2, title: "城市露营体验 | 不出城也能拥抱大自然", author: "户外探路者", likes: 102, height: "h-64", liked: false, image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080" },
  { id: 3, title: "这家深夜食堂，温暖了整个城市的胃口", author: "吃货老陈", likes: 890, height: "h-56", liked: true, image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080" },
  { id: 4, title: "极简纯白风咖啡馆，随便拍都出片", author: "审美控", likes: 56, height: "h-40", liked: false, image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080" },
  { id: 5, title: "隐藏在弄堂里的古着店，淘到宝了", author: "复古女孩", likes: 412, height: "h-72", liked: false, image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080" },
  { id: 6, title: "绝美日落观景台，情侣约会必去", author: "浪漫主义者", likes: 1120, height: "h-48", liked: true, image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080" },
]);

export const HOME_SHOPS: ShopCardData[] = localizeMockData([
  { id: 1, name: "时光机复古杂货铺", rating: "4.8", distance: "1.2km", tags: ["复古", "杂货", "好店推荐"], price: "￥80/人", recommendation: "这里藏着80后的童年回忆", image: "https://images.unsplash.com/photo-1443884590026-2e4d21aee71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwc2hvcHxlbnwxfHx8fDE3NzYwODM0MTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: 2, name: "半岛咖啡馆", rating: "4.9", distance: "3.5km", tags: ["咖啡", "下午茶", "高颜值"], price: "￥65/人", recommendation: "拿铁和海盐卷盲点不出错", image: "https://images.unsplash.com/photo-1567880905822-56f8e06fe630?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxjYWZlfGVufDF8fHx8MTc3NjA4MzQyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: 3, name: "不打烊小酒馆", rating: "4.7", distance: "2.1km", tags: ["精酿", "氛围感", "深夜食堂"], price: "￥120/人", recommendation: "氛围绝佳，精酿啤酒种类多", image: "https://images.unsplash.com/photo-1558210598-89ba75b1724e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdWJ8ZW58MXx8fHwxNzc2MDgzNDI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: 4, name: "山居秋野民宿", rating: "5.0", distance: "15km", tags: ["周末好去处", "自然", "避世"], price: "￥300/人", recommendation: "推开窗就是漫山遍野的绿意", image: "https://images.unsplash.com/photo-1618111415065-c20b4e1afd41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWQlMjBhbmQlMjBicmVha2Zhc3R8ZW58MXx8fHwxNzc2MDgzNDMyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
]);
