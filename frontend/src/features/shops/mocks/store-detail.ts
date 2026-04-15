import type { MasonryNoteData } from "@/types/note";
import type { StoreCoupon, StoreDetailData, StoreDish, StoreReview } from "@/types/shop";

export const STORE_DETAIL_STORE: StoreDetailData = {
  name: "时光机复古杂货铺",
  rating: "4.8",
  price: "￥120/人",
  tags: ["出片率高", "复古风", "手冲咖啡", "宠物友好"],
  address: "东城区交道口南大街15号院内",
  distance: "2.4km",
  walkTime: "步行约15分钟",
  images: [
    "https://images.unsplash.com/photo-1571217748526-261477b6ac62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    "https://images.unsplash.com/photo-1521017432531-fbd92d768814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    "https://images.unsplash.com/photo-1606757870480-975652100251?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
  ],
  image: "https://images.unsplash.com/photo-1571217748526-261477b6ac62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
};

export const STORE_DETAIL_COUPONS: StoreCoupon[] = [
  { id: 1, title: "79元 代 100元 饮品甜点券", sales: "半年售 1200+", type: "代金券", oldPrice: "100", newPrice: "79" },
  { id: 2, title: "双人复古下午茶套餐", sales: "半年售 800+", type: "套餐", oldPrice: "258", newPrice: "188" }
];

export const STORE_DETAIL_DISHES: StoreDish[] = [
  { id: 1, name: "招牌手冲瑰夏", reason: "进店必点", image: "https://images.unsplash.com/photo-1753109818506-2c4c39c16c9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400" },
  { id: 2, name: "焦糖海盐卷", reason: "甜而不腻", image: "https://images.unsplash.com/photo-1680090966795-06fdd0e7046b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400" },
  { id: 3, name: "牛油果轻食吐司", reason: "健康轻食", image: "https://images.unsplash.com/photo-1593903971086-da1ad90da20b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400" }
];

export const STORE_DETAIL_REVIEWS: StoreReview[] = [
  { id: 1, author: "咖啡脑袋", avatar: "https://images.unsplash.com/photo-1564752423896-11d52fbf3257?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100", content: "氛围感拉满，手冲味道很干净，老板人超级好！还会再来的宝藏店铺。", likes: 124, rating: 5 },
  { id: 2, author: "周末探店", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100", content: "位置有点隐蔽，但是进去别有洞天，非常适合拍照出片，强烈推荐大家下午光线好的时候来！", likes: 89, rating: 4 },
];

export const STORE_DETAIL_SELECTED_NOTES: MasonryNoteData[] = [
  { id: 1, title: "必打卡的复古小店，随手拍出大片感", author: "小透明", avatar: "https://images.unsplash.com/photo-1564752423896-11d52fbf3257?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100", likes: 234, image: "https://images.unsplash.com/photo-1688148484023-b56a9b91525a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800" },
  { id: 2, title: "在这里待了一整个下午，太治愈了", author: "审美控", avatar: "https://images.unsplash.com/photo-1572604745465-3f65869e2c67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100", likes: 89, image: "https://images.unsplash.com/photo-1704354924223-d44ef8283cce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800" },
  { id: 3, title: "打卡这杯手冲，口感很惊喜", author: "咖啡重度患者", avatar: "https://images.unsplash.com/photo-1617355453845-6996ffeee4de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100", likes: 156, image: "https://images.unsplash.com/photo-1622979059365-5952c36686e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800" }
];

export const STORE_DETAIL_ALL_NOTES: MasonryNoteData[] = [
  ...STORE_DETAIL_SELECTED_NOTES,
  { id: 4, title: "城市露营体验 | 推荐这家宝藏店", author: "户外探路", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100", likes: 102, height: "h-[220px]", image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800" },
  { id: 5, title: "周末探店指南，赶紧收藏", author: "吃货", avatar: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100", likes: 412, height: "h-[260px]", image: "https://images.unsplash.com/photo-1606757870480-975652100251?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800" },
  { id: 6, title: "私藏咖啡馆，一般人我不告诉他", author: "老北京", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100", likes: 55, height: "h-[180px]", image: "https://images.unsplash.com/photo-1571217748526-261477b6ac62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800" }
];
