import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "@/constants/routes";
import { ListContainer } from "@/components/ditan";
import type { AsyncViewState } from "@/types/common";
import { Skeleton } from "@/prototype/components/WireframeUI";
import { useStateContext } from "@/prototype/context/StateContext";
import {
  STORE_DETAIL_ALL_NOTES,
  STORE_DETAIL_COUPONS,
  STORE_DETAIL_DISHES,
  STORE_DETAIL_REVIEWS,
  STORE_DETAIL_SELECTED_NOTES,
  STORE_DETAIL_STORE,
} from "../mocks";
import {
  StoreCouponSheet,
  StoreDetailActionBar,
  StoreDetailHero,
  StoreDetailSections,
} from "./components";

export const StoreDetail = () => {
  const navigate = useNavigate();
  const { appState } = useStateContext() as { appState: AsyncViewState };
  const [isCollected, setIsCollected] = useState(false);
  const [isCouponOpen, setIsCouponOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({ container: scrollRef });
  const imageScale = useTransform(scrollY, [0, 300], [1, 0.95]);
  const imageOpacity = useTransform(scrollY, [0, 300], [1, 0.4]);
  const imageY = useTransform(scrollY, [0, 300], [0, 80]);
  const headerOpacity = useTransform(scrollY, [150, 220], [0, 1]);
  const headerY = useTransform(scrollY, [150, 220], [-10, 0]);

  const handleImageScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    const index = Math.round(target.scrollLeft / target.clientWidth);
    if (index !== currentImageIndex) setCurrentImageIndex(index);
  };

  const renderPageSkeleton = () => (
    <div className="flex-1 bg-background relative z-10 overflow-hidden">
      <Skeleton className="w-full h-[50vh] rounded-none bg-muted shrink-0" />
      <div className="relative z-20 mx-4 -mt-20 bg-card rounded-[20px] p-5 shadow-sm">
        <Skeleton className="w-3/4 h-7 mb-4 rounded-md" />
        <Skeleton className="w-1/2 h-4 mb-4 rounded" />
        <div className="flex gap-2">
          <Skeleton className="w-16 h-8 rounded-lg" />
          <Skeleton className="w-16 h-8 rounded-lg" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full h-full bg-background relative flex flex-col">
      <ListContainer
        state={appState}
        loadingComponent={renderPageSkeleton()}
        emptyMessage="抱歉，该店铺不存在或已打烊"
        className="flex-1 flex flex-col relative z-0 h-full bg-background"
      >
        <div ref={scrollRef} className="w-full h-full overflow-y-auto no-scrollbar relative pb-[90px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            className="relative z-10 min-h-[100vh]"
          >
            <StoreDetailHero
              currentImageIndex={currentImageIndex}
              headerOpacity={headerOpacity}
              headerY={headerY}
              imageOpacity={imageOpacity}
              imageScale={imageScale}
              imageY={imageY}
              store={STORE_DETAIL_STORE}
              onBack={() => navigate(-1)}
              onImageScroll={handleImageScroll}
            />

            <div className="absolute inset-x-0 bottom-0 -top-4 bg-background rounded-t-[32px] -z-10 shadow-[0_-4px_24px_rgba(0,0,0,0.02)]" />

            <StoreDetailSections
              allNotes={STORE_DETAIL_ALL_NOTES}
              dishes={STORE_DETAIL_DISHES}
              reviews={STORE_DETAIL_REVIEWS}
              selectedNotes={STORE_DETAIL_SELECTED_NOTES}
              onOpenCouponSheet={() => setIsCouponOpen(true)}
              onOpenNote={(noteId) => navigate(ROUTE_PATHS.noteDetail(String(noteId)))}
            />
          </motion.div>
        </div>

        <StoreDetailActionBar isCollected={isCollected} onToggleCollected={() => setIsCollected((current) => !current)} />
      </ListContainer>

      <StoreCouponSheet coupons={STORE_DETAIL_COUPONS} isOpen={isCouponOpen} onClose={() => setIsCouponOpen(false)} />
    </div>
  );
};

export default StoreDetail;
