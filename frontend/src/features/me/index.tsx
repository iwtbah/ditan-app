import React, { useState } from "react";
import type { AsyncViewState } from "@/types/common";
import { useStateContext } from "@/prototype/context/StateContext";
import { MeContentPanel, MeProfileCard } from "./components";

export const Me = () => {
  const { appState } = useStateContext() as { appState: AsyncViewState };
  const [activeTab, setActiveTab] = useState("笔记");
  const [subFilter, setSubFilter] = useState("全部");

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden relative">
      <div className="flex-1 overflow-y-auto pb-[90px] z-10 relative px-4 no-scrollbar">
        <MeProfileCard />
        <MeContentPanel
          activeTab={activeTab}
          appState={appState}
          subFilter={subFilter}
          onSubFilterChange={setSubFilter}
          onTabChange={setActiveTab}
        />
      </div>
    </div>
  );
};

export default Me;
