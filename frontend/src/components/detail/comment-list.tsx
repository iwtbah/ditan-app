import { StarIcon, ThumbsUpIcon } from '@/components/common/icons';
import type { CommentCardData } from '@/types';
import { cn } from '@/utils/cn';

interface CommentListProps {
  comments: CommentCardData[];
  variant?: 'thread' | 'review';
}

export function CommentList({ comments, variant = 'thread' }: CommentListProps) {
  return (
    <div className={cn('space-y-5', variant === 'review' ? 'space-y-3' : '')}>
      {comments.map((comment) => (
        <div
          key={comment.id}
          className={cn(
            variant === 'review'
              ? 'flex gap-3 rounded-[14px] border border-border/40 bg-muted/40 p-3.5'
              : 'flex gap-md',
          )}
        >
          <div
            className={cn(
              'shrink-0 overflow-hidden rounded-full border border-border/60 bg-muted',
              variant === 'review' ? 'h-8 w-8' : 'h-8 w-8',
            )}
          >
            {comment.avatarUrl ? (
              <img alt={comment.author} className="h-full w-full object-cover" src={comment.avatarUrl} />
            ) : null}
          </div>
          <div className={cn('flex-1', variant === 'thread' ? 'border-b border-border pb-md' : '')}>
            <div className="flex items-center justify-between">
              <span className="text-caption font-semibold text-text-secondary">{comment.author}</span>
              <div className="flex items-center gap-1 text-text-tertiary">
                {variant === 'review' ? <ThumbsUpIcon size={12} /> : null}
                <span className="text-[10px] font-bold">{comment.likes}</span>
              </div>
            </div>

            {variant === 'review' && comment.rating ? (
              <div className="mb-1.5 mt-1 flex items-center gap-0.5 text-amber-400">
                {Array.from({ length: 5 }).map((_, index) => (
                  <StarIcon
                    key={index}
                    className={cn(index < comment.rating! ? 'opacity-100' : 'opacity-25')}
                    size={10}
                  />
                ))}
              </div>
            ) : null}

            <p
              className={cn(
                'mt-sm text-text-primary',
                variant === 'review' ? 'line-clamp-2 text-[13px] leading-[1.5] text-text-secondary' : 'text-body',
              )}
            >
              {comment.content}
            </p>

            <div className="mt-sm flex items-center gap-2 text-caption font-medium text-text-secondary">
              <span>{comment.timeLabel}</span>
              {variant === 'thread' && comment.hasReply ? <span className="font-bold">回复</span> : null}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
