import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookmarkIcon,
  HeartIcon,
  MessageSquareIcon,
  MoreHorizontalIcon,
  StarIcon,
} from '@/components/common/icons';
import { CommentList } from '@/components/detail/comment-list';
import { DetailActionOverlay } from '@/components/detail/detail-action-overlay';
import { ImageCarouselHero } from '@/components/detail/image-carousel-hero';
import { GlassIconButton } from '@/components/glass/glass-icon-button';
import { NoteCommentSheet } from '@/features/notes/components/note-comment-sheet';
import { NoteShopCard } from '@/features/notes/components/note-shop-card';
import { useNoteDetailQuery } from '@/features/notes/hooks/use-note-detail-query';
import { useScrollProgress } from '@/hooks/use-scroll-progress';
import type { CommentCardData } from '@/types';

interface NoteDetailSectionProps {
  noteId: string;
}

export function NoteDetailSection({ noteId }: NoteDetailSectionProps) {
  const navigate = useNavigate();
  const noteQuery = useNoteDetailQuery(noteId);
  const note = noteQuery.data;
  const [isLiked, setIsLiked] = useState(false);
  const [isCollected, setIsCollected] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [submittedComments, setSubmittedComments] = useState<CommentCardData[]>([]);
  const { progress, scrollTop, handleScroll } = useScrollProgress(220);

  if (noteQuery.isLoading) {
    return (
      <div className="flex h-full flex-col bg-background">
        <div className="h-[65vh] animate-pulse bg-muted" />
        <div className="-mt-6 rounded-t-[24px] bg-background p-5">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-10 w-10 animate-pulse rounded-full bg-muted" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-28 animate-pulse rounded bg-muted" />
              <div className="h-3 w-16 animate-pulse rounded bg-muted" />
            </div>
          </div>
          <div className="mb-6 h-6 w-[85%] animate-pulse rounded bg-muted" />
          <div className="mb-2.5 h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-[90%] animate-pulse rounded bg-muted" />
        </div>
      </div>
    );
  }

  if (noteQuery.isError || !note) {
    return (
      <div className="flex h-full items-center justify-center bg-background p-6">
        <div className="rounded-[18px] border border-red-200 bg-white px-4 py-5 text-center text-sm text-red-600 shadow-sm">
          {noteQuery.error?.message ?? '抱歉，该内容不存在或已被删除'}
        </div>
      </div>
    );
  }

  const comments = [...submittedComments, ...note.comments];
  const contentBlocks = note.contentBlocks ?? [note.content];

  return (
    <div className="relative flex h-full flex-col bg-background">
      <DetailActionOverlay
        onBack={() => navigate(-1)}
        progress={progress}
        title={note.title}
        trailing={
          <GlassIconButton tone={progress > 0.5 ? 'light' : 'dark'}>
            <MoreHorizontalIcon size={20} />
          </GlassIconButton>
        }
      />

      <div className="h-full overflow-y-auto no-scrollbar" onScroll={handleScroll}>
        <ImageCarouselHero
          alt={note.title}
          content={
            <div className="max-w-[80%]">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/22 px-3 py-1.5 shadow-[0_10px_24px_rgba(15,23,42,0.12)] backdrop-blur-xl">
                <div className="h-7 w-7 overflow-hidden rounded-full border border-white/20">
                  {note.author.avatarUrl ? (
                    <img alt={note.author.nickname} className="h-full w-full object-cover" src={note.author.avatarUrl} />
                  ) : null}
                </div>
                <span className="text-[12px] font-bold text-white">{note.author.nickname}</span>
              </div>
              <h1 className="text-[28px] font-bold leading-[1.25] tracking-tight text-white drop-shadow-[0_10px_28px_rgba(15,23,42,0.3)]">
                {note.title}
              </h1>
              <p className="mt-2 text-[12px] font-semibold text-white/78">
                {note.authorLocation ?? '北京'} • {note.publishedAt}
              </p>
            </div>
          }
          contentStyle={{
            opacity: Math.max(0, 1 - progress * 1.2),
            transform: `translate3d(0, ${progress * 24}px, 0)`,
          }}
          heightClassName="h-[65vh]"
          imageClassName="transition-transform duration-300 ease-out will-change-transform"
          imageStyle={{
            transform: `translate3d(0, ${Math.min(scrollTop * 0.24, 40)}px, 0) scale(${1 + progress * 0.08})`,
          }}
          images={note.imageUrls}
          overlayClassName="h-2/3 from-black/72 via-black/24 to-transparent"
        />

        <div
          className="-mt-6 min-h-[100vh] rounded-t-[24px] bg-background pb-[110px] shadow-[0_-8px_32px_rgba(0,0,0,0.08)]"
          style={{
            transform: `translate3d(0, ${Math.max(-progress * 8, -8)}px, 0)`,
          }}
        >
          <div className="flex w-full justify-center pb-2 pt-3">
            <div className="h-1 w-10 rounded-full bg-border/80" />
          </div>

          <div className="px-5">
            <div className="mb-5 mt-1 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 overflow-hidden rounded-full border border-border/60">
                  {note.author.avatarUrl ? (
                    <img alt={note.author.nickname} className="h-full w-full object-cover" src={note.author.avatarUrl} />
                  ) : null}
                </div>
                <div className="flex flex-col">
                  <span className="text-[15px] font-bold tracking-tight text-text-primary">{note.author.nickname}</span>
                  <span className="text-[11px] font-medium text-text-tertiary">
                    {note.authorLocation ?? '北京'} • {note.publishedAt}
                  </span>
                </div>
              </div>

              <button
                className="rounded-full bg-text-primary px-4 py-1.5 text-[13px] font-bold text-background transition-all active:scale-95"
                type="button"
              >
                关注
              </button>
            </div>

            <h1 className="mb-3 text-[19px] font-bold leading-[1.4] tracking-tight text-text-primary">
              {note.title}
            </h1>

            <div className="mb-6 space-y-4 text-[15px] leading-[1.75] text-text-primary/90">
              {contentBlocks.map((block, index) => (
                <p key={`${block}-${index}`}>{block}</p>
              ))}
            </div>

            <div className="mb-6 flex flex-wrap gap-2.5">
              {note.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-blue-50/80 px-3 py-1.5 text-[13px] font-bold text-blue-600/90"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="mb-5 text-[12px] text-text-tertiary">{note.editedAt ?? `编辑于 ${note.publishedAt}`}</div>

            {note.shop ? <NoteShopCard shop={note.shop} /> : null}

            <div className="mx-[-20px] my-6 h-px bg-border/40" />

            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <button className="flex items-center gap-1.5" onClick={() => setIsLiked((value) => !value)} type="button">
                  <HeartIcon className={isLiked ? 'fill-red-500 text-red-500' : 'text-text-secondary'} size={24} />
                  <span className={`text-[14px] font-bold ${isLiked ? 'text-red-500' : 'text-text-secondary'}`}>
                    {note.likedCount + (isLiked ? 1 : 0)}
                  </span>
                </button>

                <button
                  className="flex items-center gap-1.5"
                  onClick={() => setIsCollected((value) => !value)}
                  type="button"
                >
                  <StarIcon className={isCollected ? 'text-amber-400' : 'text-text-secondary'} size={24} />
                  <span className={`text-[14px] font-bold ${isCollected ? 'text-amber-500' : 'text-text-secondary'}`}>
                    {note.favoriteCount + (isCollected ? 1 : 0)}
                  </span>
                </button>

                <button className="flex items-center gap-1.5" onClick={() => setIsCommenting(true)} type="button">
                  <MessageSquareIcon className="text-text-secondary" size={24} />
                  <span className="text-[14px] font-bold text-text-secondary">{comments.length + 126}</span>
                </button>
              </div>
            </div>

            <div className="mb-8 flex items-center justify-between rounded-[16px] border border-border/40 bg-muted/40 p-3">
              <div className="flex -space-x-2.5 overflow-hidden px-1">
                {note.likedAvatarUrls.map((src, index) => (
                  <div
                    key={src}
                    className="relative z-10 h-[26px] w-[26px] shrink-0 overflow-hidden rounded-full border-2 border-background"
                    style={{ zIndex: note.likedAvatarUrls.length - index }}
                  >
                    <img alt="" className="h-full w-full object-cover" src={src} />
                  </div>
                ))}
              </div>
              <div className="mr-2 text-[12px] font-bold text-text-tertiary">等 {note.likedCount} 人觉得很赞</div>
            </div>

            <div>
              <h3 className="mb-5 text-[16px] font-bold text-text-primary">共 {comments.length + 126} 条评论</h3>
              <CommentList comments={comments} />
              <button
                className="mt-4 w-full rounded-full bg-muted/60 py-3 text-[13px] font-bold text-text-secondary transition-colors"
                type="button"
              >
                展开更多评论
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-50 px-3 pb-safe">
        <div className="glass-float flex items-center gap-3 rounded-t-[24px] border-t border-white/40 px-5 py-3">
          <button
            className="flex h-10 flex-1 items-center rounded-full border border-white/45 bg-white/55 px-4 text-left text-[14px] font-medium text-text-tertiary shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]"
            onClick={() => setIsCommenting(true)}
            type="button"
          >
            说点什么...
          </button>
          <div className="flex gap-4 px-2 text-text-primary">
            <button onClick={() => setIsLiked((value) => !value)} type="button">
              <HeartIcon className={isLiked ? 'fill-red-500 text-red-500' : 'text-text-primary'} size={26} />
            </button>
            <button onClick={() => setIsCollected((value) => !value)} type="button">
              <BookmarkIcon className={isCollected ? 'fill-amber-400 text-amber-400' : 'text-text-primary'} size={26} />
            </button>
          </div>
        </div>
      </div>

      <NoteCommentSheet
        onChange={setNewComment}
        onClose={() => setIsCommenting(false)}
        onSubmit={() => {
          if (!newComment.trim()) {
            return;
          }

          setSubmittedComments((current) => [
            {
              id: `local-comment-${Date.now()}`,
              author: '我',
              content: newComment.trim(),
              timeLabel: '刚刚',
              likes: 0,
            },
            ...current,
          ]);
          setNewComment('');
          setIsCommenting(false);
        }}
        open={isCommenting}
        value={newComment}
      />
    </div>
  );
}
