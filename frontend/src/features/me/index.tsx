import React, { useState } from "react";
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
      <div className="flex-1 overflow-y-auto pb-[90px] z-10 relative px-4 no-scrollbar">
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
      </div>
    </div>
  );
};

export default Me;
