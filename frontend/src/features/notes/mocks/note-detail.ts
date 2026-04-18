import type { NoteComment, NoteDetailData } from "@/types/note";
import type { LinkedStoreData } from "@/types/shop";
import { localizeMockData } from "@/features/shared/mocks/localize-mock-data";

export const NOTE_DETAIL_MOCK_NOTE: NoteDetailData = localizeMockData({
  images: [
    "https://images.unsplash.com/photo-1521017432531-fbd92d768814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    "https://images.unsplash.com/photo-1606757870480-975652100251?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    "https://images.unsplash.com/photo-1688148484023-b56a9b91525a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
  ],
  author: {
    name: "审美控_林",
    avatar: "https://images.unsplash.com/photo-1564752423896-11d52fbf3257?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    location: "北京",
    time: "2小时前"
  },
  title: "周末和闺蜜的宝藏下午茶店打卡，拍照绝绝子，随便拍都出片！",
  content: [
    "今天去了收藏已久的这家纯白极简风咖啡馆，真的没有让我失望！",
    "店内的每个角落都被精心布置过，光影随着时间变化在墙上游走，自带一种高级的克制美学。最爱他们家的这面老墙，配合落地窗透进来的阳光，仿佛一切都慢了下来。",
    "特别推荐他们家的手冲咖啡和海盐卷，甜度刚刚好。建议下午三四点的时候去，阳光照进来的感觉太治愈了，拍照完全不需要滤镜，原相机直出就很美～",
  ],
  tags: ["北京探店", "咖啡馆", "周末去哪儿", "极简美学"],
  likes: 1254,
  collected: 856,
  likedAvatars: [
    "https://images.unsplash.com/photo-1572604745465-3f65869e2c67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
    "https://images.unsplash.com/photo-1617355453845-6996ffeee4de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
    "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
  ]
});

export const NOTE_DETAIL_MOCK_STORE: LinkedStoreData = localizeMockData({
  id: 1,
  name: "半岛咖啡馆 Peninsula Coffee",
  tags: ["咖啡", "高颜值", "距你 1.2km"],
  image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
  rating: "4.9"
});

export const NOTE_DETAIL_INITIAL_COMMENTS: NoteComment[] = [
  { id: 1, author: "夏日限定", content: "真的很好看！上周刚去过，老板人超好！", time: "昨天 18:00", likes: 45, liked: false, hasReply: true },
  { id: 2, author: "抹茶不加糖", content: "请问具体位置在哪里呀？周末想带朋友去。", time: "2小时前", likes: 12, liked: true, hasReply: false }
];
