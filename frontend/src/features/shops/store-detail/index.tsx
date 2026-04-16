import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTE_PATHS } from "@/constants/routes";
import { EmptyState, ErrorState, Skeleton } from "@/components/feedback/wireframe-ui";
import { resolveAsyncViewState } from "@/utils/resolve-async-view-state";
import { useStoreDetailQuery } from "./hooks";
import {
  StoreCouponSheet,
  StoreDetailActionBar,
  StoreDetailHero,
  StoreDetailSections,
  StoreDetailSummaryCard,
} from "./components";

export const StoreDetail = () => {
  const navigate = useNavigate();
  const { shopId = "1" } = useParams();
  const storeDetailQuery = useStoreDetailQuery(shopId);
  const [isCollected, setIsCollected] = useState(false);
  const [isCouponOpen, setIsCouponOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const storeDetailData = storeDetailQuery.data;
  const viewState = resolveAsyncViewState({
    isError: storeDetailQuery.isError,
    isLoading: storeDetailQuery.isPending,
    isEmpty: !storeDetailData?.store,
  });

  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({ container: scrollRef });
  const imageScale = useTransform(scrollY, [0, 300], [1, 0.95]);
  const imageOpacity = useTransform(scrollY, [0, 300], [1, 0.72]);
  const imageY = useTransform(scrollY, [0, 300], [0, 80]);
  const coverOpacity = useTransform(scrollY, [0, 240], [0, 1]);
  const headerOpacity = useTransform(scrollY, [150, 220], [0, 1]);
  const headerY = useTransform(scrollY, [150, 220], [-10, 0]);

  const handleImageScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    const index = Math.round(target.scrollLeft / target.clientWidth);
    if (index !== currentImageIndex) setCurrentImageIndex(index);
  };

  const renderPageSkeleton = () => (
    <div className="flex-1 bg-background relative z-10 overflow-hidden">
      <Skeleton className="w-full h-[48vh] rounded-none bg-muted shrink-0" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
        className="relative z-10 bg-background min-h-[100vh] -mt-6 rounded-t-[24px] shadow-[0_-4px_30px_rgba(0,0,0,0.06)] pb-safe"
      >
        <div className="w-full flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-border/80 rounded-full" />
        </div>

        <div className="mx-4 -mt-20 bg-card rounded-[20px] p-5 shadow-sm">
          <Skeleton className="w-3/4 h-7 mb-4 rounded-md" />
          <Skeleton className="w-1/2 h-4 mb-4 rounded" />
          <div className="flex gap-2">
            <Skeleton className="w-16 h-8 rounded-lg" />
            <Skeleton className="w-16 h-8 rounded-lg" />
          </div>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="w-full h-full bg-background relative flex flex-col">
      <div ref={scrollRef} className="w-full h-full overflow-y-auto no-scrollbar relative pb-[90px]">
        {viewState === "Loading" ? (
          renderPageSkeleton()
        ) : viewState === "Error" ? (
          <div className="min-h-full flex items-center justify-center px-4">
            <ErrorState
              message="店铺详情加载失败"
              onRetry={() => {
                void storeDetailQuery.refetch();
              }}
            />
          </div>
        ) : viewState === "Empty" ? (
          <div className="min-h-full flex items-center justify-center px-4">
            <EmptyState message="抱歉，该店铺不存在或已打烊" />
          </div>
        ) : storeDetailData ? (
          <>
            <div className="relative">
              <StoreDetailHero
                coverOpacity={coverOpacity}
                currentImageIndex={currentImageIndex}
                headerOpacity={headerOpacity}
                headerY={headerY}
                imageOpacity={imageOpacity}
                imageScale={imageScale}
                imageY={imageY}
                store={storeDetailData.store}
                onBack={() => navigate(-1)}
                onImageScroll={handleImageScroll}
              />

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
                className="relative z-10 bg-background min-h-[100vh] -mt-6 rounded-t-[24px] shadow-[0_-4px_30px_rgba(0,0,0,0.06)] pb-safe"
              >
                <div className="w-full flex justify-center pt-3 pb-2">
                  <div className="w-10 h-1 bg-border/80 rounded-full" />
                </div>

                <StoreDetailSummaryCard store={storeDetailData.store} />
                <StoreDetailSections
                  allNotes={storeDetailData.allNotes.items}
                  dishes={storeDetailData.dishes}
                  reviews={storeDetailData.reviews}
                  selectedNotes={storeDetailData.selectedNotes}
                  onOpenCouponSheet={() => setIsCouponOpen(true)}
                  onOpenNote={(noteId) => navigate(ROUTE_PATHS.noteDetail(String(noteId)))}
                />
              </motion.div>
            </div>
          </>
        ) : null}
      </div>

      {storeDetailData && viewState === "Normal" && (
        <StoreDetailActionBar
          isCollected={isCollected}
          onToggleCollected={() => setIsCollected((current) => !current)}
        />
      )}

      {storeDetailData && (
        <StoreCouponSheet coupons={storeDetailData.coupons} isOpen={isCouponOpen} onClose={() => setIsCouponOpen(false)} />
      )}
    </div>
  );
};

export default StoreDetail;
