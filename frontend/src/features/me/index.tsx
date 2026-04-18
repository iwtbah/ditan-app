import React, { useState } from "react";
import { PullEndScrollArea } from "@/components/ditan";
import { resolveAsyncViewState } from "@/utils/resolve-async-view-state";
import { useMeProfileQuery } from "./hooks";
import { MeContentPanel, MeRecentBrowsePanel, ProfileHeader } from "./components";

export const Me = () => {
  const [activeTab, setActiveTab] = useState("笔记");
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
        {profileData && <ProfileHeader profile={profileData.profile} />}
        <div className="relative z-10 -mt-3 space-y-4 px-4">
          <MeRecentBrowsePanel items={profileData?.recentBrowse ?? []} />
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
        </div>
      </PullEndScrollArea>
    </div>
  );
};

export default Me;
