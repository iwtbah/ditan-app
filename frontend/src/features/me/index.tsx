import React, { useState } from "react";
import { usePreviewStateContext } from "@/contexts/preview-state-context";
import type { AsyncViewState } from "@/types/common";
import { useMeProfileQuery } from "./hooks";
import { MeContentPanel, MeProfileCard } from "./components";

export const Me = () => {
  const { appState } = usePreviewStateContext() as { appState: AsyncViewState };
  const [activeTab, setActiveTab] = useState("笔记");
  const [subFilter, setSubFilter] = useState("全部");
  const profileQuery = useMeProfileQuery();

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden relative">
      <div className="flex-1 overflow-y-auto pb-[90px] z-10 relative px-4 no-scrollbar">
        <MeProfileCard profile={profileQuery.data.profile} />
        <MeContentPanel
          activeTab={activeTab}
          appState={appState}
          notes={profileQuery.data.notes}
          subFilter={subFilter}
          shops={profileQuery.data.shops}
          onSubFilterChange={setSubFilter}
          onTabChange={setActiveTab}
        />
      </div>
    </div>
  );
};

export default Me;
