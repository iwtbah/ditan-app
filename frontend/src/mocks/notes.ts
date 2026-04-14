import { homeDiscoveryMock } from '@/mocks/home';
import type { NoteDetail, PageResponse, NoteCard } from '@/types';

const noteDetails: Record<string, NoteDetail> = {
  'note-1': {
    ...homeDiscoveryMock.notes[0],
    title: '周末和闺蜜的宝藏下午茶店打卡，拍照绝绝子，随便拍都出片！',
    content:
      '今天去了收藏已久的这家纯白极简风咖啡馆，真的没有让我失望！店内的每个角落都被精心布置过，光影随着时间变化在墙上游走，自带一种高级的克制美学。特别推荐他们家的手冲咖啡和海盐卷，甜度刚刚好。',
    contentBlocks: [
      '今天去了收藏已久的这家纯白极简风咖啡馆，真的没有让我失望！',
      '店内的每个角落都被精心布置过，光影随着时间变化在墙上游走，自带一种高级的克制美学。最爱他们家的这面老墙，配合落地窗透进来的阳光，仿佛一切都慢了下来。',
      '特别推荐他们家的手冲咖啡和海盐卷，甜度刚刚好。建议下午三四点的时候去，阳光照进来的感觉太治愈了，拍照完全不需要滤镜，原相机直出就很美。',
    ],
    imageUrls: [
      'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1606757870480-975652100251?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1688148484023-b56a9b91525a?auto=format&fit=crop&w=1200&q=80',
    ],
    tags: ['北京探店', '咖啡馆', '周末去哪儿', '极简美学'],
    authorLocation: '北京',
    editedAt: '编辑于 2小时前',
    favoriteCount: 856,
    likedAvatarUrls: [
      'https://images.unsplash.com/photo-1572604745465-3f65869e2c67?auto=format&fit=crop&w=120&q=80',
      'https://images.unsplash.com/photo-1617355453845-6996ffeee4de?auto=format&fit=crop&w=120&q=80',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
      'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&w=120&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    ],
    comments: [
      {
        id: 'comment-1',
        author: '夏日限定',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
        content: '真的很好看！上周刚去过，老板人超好。',
        timeLabel: '昨天 18:00',
        likes: 45,
        liked: false,
        hasReply: true,
      },
      {
        id: 'comment-2',
        author: '抹茶不加糖',
        avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80',
        content: '请问具体位置在哪里呀？周末想带朋友去。',
        timeLabel: '2小时前',
        likes: 12,
        liked: true,
      },
    ],
    shop: {
      id: 'shop-2',
      name: '半岛咖啡馆 Peninsula Coffee',
      category: '咖啡',
      district: '朝阳区',
      rating: 4.9,
      averagePrice: 65,
      coverUrl: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=400&q=80',
      tags: [
        { id: 'st-1', label: '咖啡' },
        { id: 'st-2', label: '高颜值' },
        { id: 'st-3', label: '距你 1.2km' },
      ],
    },
  },
};

export function getMockNoteDetail(noteId: string) {
  return noteDetails[noteId] ?? noteDetails['note-1'];
}

export function getMockShopNotes(_shopId: string): PageResponse<NoteCard> {
  const list = homeDiscoveryMock.notes.map((note) => ({
    ...note,
    imageUrls: undefined,
  })) as NoteCard[];

  return {
    list,
    page: 1,
    pageSize: list.length,
    total: list.length,
    hasMore: false,
  };
}
