import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTE_PATHS } from "@/constants/routes";
import { EmptyState, ErrorState, Skeleton } from "@/components/feedback/wireframe-ui";
import { resolveAsyncViewState } from "@/utils/resolve-async-view-state";
import type { NoteComment } from "@/types/note";
import { useNoteDetailQuery } from "./hooks";
import {
  NoteDetailCommentComposer,
  NoteDetailContent,
  NoteDetailGallery,
  NoteDetailOverlayHeader,
} from "./components";

export const NoteDetail = () => {
  const navigate = useNavigate();
  const { noteId = "1" } = useParams();
  const noteDetailQuery = useNoteDetailQuery(noteId);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [followState, setFollowState] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isCollected, setIsCollected] = useState(false);
  const [commenting, setCommenting] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<NoteComment[]>([]);
  const noteDetailData = noteDetailQuery.data;
  const note = noteDetailData?.note;
  const store = noteDetailData?.store;
  const viewState = resolveAsyncViewState({
    isError: noteDetailQuery.isError,
    isLoading: noteDetailQuery.isPending,
    isEmpty: !noteDetailData?.note,
  });

  useEffect(() => {
    if (noteDetailData) {
      setComments(noteDetailData.comments.items);
    }
  }, [noteDetailData]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({ container: scrollRef });
  const imageScale = useTransform(scrollY, [0, 300], [1, 0.92]);
  const imageOpacity = useTransform(scrollY, [0, 400], [1, 0.4]);
  const headerOpacity = useTransform(scrollY, [150, 250], [0, 1]);
  const headerY = useTransform(scrollY, [150, 250], [-20, 0]);

  const handleImageScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    const index = Math.round(target.scrollLeft / target.clientWidth);
    if (index !== currentImageIndex) setCurrentImageIndex(index);
  };

  const handlePostComment = () => {
    if (!newComment.trim()) return;
    const newEntry: NoteComment = { id: Date.now(), author: "我", content: newComment, time: "刚刚", likes: 0, liked: false, hasReply: false };
    setComments([newEntry, ...comments]);
    setNewComment("");
    setCommenting(false);
  };

  const renderPageSkeleton = () => (
    <div className="flex-1 bg-background relative z-10">
      <Skeleton className="w-full h-[65vh] rounded-none bg-muted shrink-0" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
        className="relative z-10 bg-background min-h-[100vh] -mt-6 rounded-t-[24px] shadow-[0_-4px_30px_rgba(0,0,0,0.06)] pb-safe"
      >
        <div className="w-full flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-border/80 rounded-full" />
        </div>

        <div className="px-5">
          <div className="flex items-center gap-3 mb-6 mt-1">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="flex-1 flex flex-col gap-1.5">
              <Skeleton className="w-28 h-4 rounded" />
              <Skeleton className="w-16 h-3 rounded" />
            </div>
          </div>

          <Skeleton className="w-[85%] h-6 mb-6 rounded" />
          <Skeleton className="w-full h-4 mb-2.5 rounded" />
          <Skeleton className="w-[90%] h-4 mb-6 rounded" />
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="w-full h-full bg-background relative flex flex-col shadow-[-10px_0_20px_rgba(0,0,0,0.1)]">
      <div ref={scrollRef} className="w-full h-full overflow-y-auto no-scrollbar relative">
        {viewState === "Loading" ? (
          renderPageSkeleton()
        ) : viewState === "Error" ? (
          <div className="min-h-full flex items-center justify-center px-4">
            <ErrorState
              message="笔记详情加载失败"
              onRetry={() => {
                void noteDetailQuery.refetch();
              }}
            />
          </div>
        ) : viewState === "Empty" ? (
          <div className="min-h-full flex items-center justify-center px-4">
            <EmptyState message="抱歉，该内容不存在或已被删除" />
          </div>
        ) : note && store ? (
          <>
            <NoteDetailOverlayHeader
              authorAvatar={note.author.avatar}
              authorName={note.author.name}
              headerOpacity={headerOpacity}
              headerY={headerY}
              onBack={() => navigate(-1)}
            />
            <NoteDetailGallery
              currentImageIndex={currentImageIndex}
              imageOpacity={imageOpacity}
              imageScale={imageScale}
              images={note.images}
              onImageScroll={handleImageScroll}
            />
            <NoteDetailContent
              comments={comments}
              followState={followState}
              isCollected={isCollected}
              isLiked={isLiked}
              note={note}
              store={store}
              onNavigateStore={() => navigate(ROUTE_PATHS.shopDetail(String(store.id)))}
              onOpenCommenting={() => setCommenting(true)}
              onToggleCollected={() => setIsCollected((current) => !current)}
              onToggleFollowState={() => setFollowState((current) => (current + 1) % 3)}
              onToggleLiked={() => setIsLiked((current) => !current)}
            />
          </>
        ) : null}
      </div>

      {note && store && viewState === "Normal" && (
        <NoteDetailCommentComposer
          appState={viewState}
          commenting={commenting}
          isCollected={isCollected}
          isLiked={isLiked}
          newComment={newComment}
          onClose={() => setCommenting(false)}
          onCommentChange={setNewComment}
          onOpen={() => setCommenting(true)}
          onSubmit={handlePostComment}
          onToggleCollected={() => setIsCollected((current) => !current)}
          onToggleLiked={() => setIsLiked((current) => !current)}
        />
      )}
    </div>
  );
};

export default NoteDetail;
