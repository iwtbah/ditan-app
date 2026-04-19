import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PullEndScrollArea } from "@/components/ditan";
import { resolveAsyncViewState } from "@/utils/resolve-async-view-state";
import { useMeProfileQuery } from "./hooks";
import { MeContentPanel, MeRecentBrowsePanel, ProfileHeader } from "./components";
import MeSettings from "./settings";

export const Me = () => {
  const [activeTab, setActiveTab] = useState("笔记");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [subFilter, setSubFilter] = useState("全部");
  const profileQuery = useMeProfileQuery();
  const profileData = profileQuery.data;
  const viewState = resolveAsyncViewState({
    isError: profileQuery.isError,
    isLoading: profileQuery.isPending,
    isEmpty:
      Boolean(profileData) &&
      (profileData?.notes.length ?? 0) === 0 &&
      (profileData?.shops.length ?? 0) === 0 &&
      (profileData?.recentBrowse.length ?? 0) === 0,
  });

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden relative">
      <PullEndScrollArea
        enabled={viewState === "Normal"}
        wrapperClassName="flex-1 relative overflow-hidden z-10 [touch-action:pan-y]"
        endHintBottomClassName="bottom-[92px]"
        scrollClassName="h-full overflow-y-auto overflow-x-hidden pb-[90px] relative no-scrollbar overscroll-y-contain overscroll-x-none [touch-action:pan-y]"
      >
        {profileData && (
          <ProfileHeader
            profile={profileData.profile}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />
        )}
        <div className="relative z-10 -mt-3 space-y-4 px-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <MeRecentBrowsePanel items={profileData?.recentBrowse ?? []} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24, delay: 0.03, ease: [0.22, 1, 0.36, 1] }}
          >
            <MeContentPanel
              activeTab={activeTab}
              appState={viewState}
              notes={profileData?.notes ?? []}
              subFilter={subFilter}
              shops={profileData?.shops ?? []}
              onRetry={() => {
                void profileQuery.refetch();
              }}
              onSubFilterChange={setSubFilter}
              onTabChange={setActiveTab}
            />
          </motion.div>
        </div>
      </PullEndScrollArea>

      <AnimatePresence initial={false}>
        {isSettingsOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.16, ease: "easeOut" }}
              className="absolute inset-0 z-30 bg-[#0E1513]/8"
              onClick={() => setIsSettingsOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 z-40 transform-gpu will-change-transform shadow-[-16px_0_36px_rgba(0,0,0,0.08)]"
            >
              <MeSettings onClose={() => setIsSettingsOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Me;
