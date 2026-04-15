import React, { useRef, useState } from "react";
import { useScroll, useTransform } from "motion/react";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "@/constants/routes";
import { ListContainer } from "@/components/ditan";
import type { AsyncViewState } from "@/types/common";
import type { NoteComment } from "@/types/note";
import { Skeleton } from "@/prototype/components/WireframeUI";
import { useStateContext } from "@/prototype/context/StateContext";
import {
  NOTE_DETAIL_INITIAL_COMMENTS,
  NOTE_DETAIL_MOCK_NOTE,
  NOTE_DETAIL_MOCK_STORE,
} from "../mocks";
import {
  NoteDetailCommentComposer,
  NoteDetailContent,
  NoteDetailGallery,
  NoteDetailOverlayHeader,
} from "./components";

export const NoteDetail = () => {
  const navigate = useNavigate();
  const { appState } = useStateContext() as { appState: AsyncViewState };
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [followState, setFollowState] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isCollected, setIsCollected] = useState(false);
  const [commenting, setCommenting] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<NoteComment[]>(NOTE_DETAIL_INITIAL_COMMENTS);

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
      <div className="p-5 flex-1 flex flex-col pt-6 bg-background rounded-t-[24px] -mt-6">
        <div className="flex items-center gap-3 mb-6">
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
    </div>
  );

  return (
    <div className="w-full h-full bg-background relative flex flex-col shadow-[-10px_0_20px_rgba(0,0,0,0.1)]">
      <ListContainer
        state={appState}
        loadingComponent={renderPageSkeleton()}
        emptyMessage="抱歉，该内容不存在或已被删除"
        className="flex-1 flex flex-col relative z-0 h-full"
      >
        <div ref={scrollRef} className="w-full h-full overflow-y-auto no-scrollbar relative">
          <NoteDetailOverlayHeader
            authorAvatar={NOTE_DETAIL_MOCK_NOTE.author.avatar}
            authorName={NOTE_DETAIL_MOCK_NOTE.author.name}
            headerOpacity={headerOpacity}
            headerY={headerY}
            onBack={() => navigate(-1)}
          />
          <NoteDetailGallery
            currentImageIndex={currentImageIndex}
            imageOpacity={imageOpacity}
            imageScale={imageScale}
            images={NOTE_DETAIL_MOCK_NOTE.images}
            onImageScroll={handleImageScroll}
          />
          <NoteDetailContent
            comments={comments}
            followState={followState}
            isCollected={isCollected}
            isLiked={isLiked}
            note={NOTE_DETAIL_MOCK_NOTE}
            store={NOTE_DETAIL_MOCK_STORE}
            onNavigateStore={() => navigate(ROUTE_PATHS.shopDetail(String(NOTE_DETAIL_MOCK_STORE.id)))}
            onOpenCommenting={() => setCommenting(true)}
            onToggleCollected={() => setIsCollected((current) => !current)}
            onToggleFollowState={() => setFollowState((current) => (current + 1) % 3)}
            onToggleLiked={() => setIsLiked((current) => !current)}
          />
        </div>

        <NoteDetailCommentComposer
          appState={appState}
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
      </ListContainer>
    </div>
  );
};

export default NoteDetail;
