import React, { useState } from "react";
import { PullEndScrollArea } from "@/components/ditan";
import { resolveAsyncViewState } from "@/utils/resolve-async-view-state";
import { useMeProfileQuery } from "./hooks";
import { MeContentPanel, MeProfileCard } from "./components";

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
      (profileData?.shops.length ?? 0) === 0,
  });

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden relative">
      <PullEndScrollArea
        enabled={viewState === "Normal"}
        wrapperClassName="flex-1 relative overflow-hidden z-10"
        endHintBottomClassName="bottom-[92px]"
        scrollClassName="h-full overflow-y-auto pb-[90px] relative px-4 no-scrollbar overscroll-y-contain"
      >
        {profileData && <MeProfileCard profile={profileData.profile} />}
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
      </PullEndScrollArea>
    </div>
  );
};

export default Me;
