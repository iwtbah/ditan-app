import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "@/constants/routes";
import type { AsyncViewState } from "@/types/common";
import { useStateContext } from "@/prototype/context/StateContext";
import { FollowingContent, FollowingHeader } from "./components";
import { FOLLOWING_FEEDS } from "./mocks";

export const Following = () => {
  const { appState } = useStateContext() as { appState: AsyncViewState };
  const [filter, setFilter] = useState("全部");
  const navigate = useNavigate();

  const filteredFeeds = useMemo(
    () => FOLLOWING_FEEDS.filter((feed) => (filter === "全部" ? true : feed.type === filter)),
    [filter],
  );

  const isEmpty = appState === "Empty" || (appState === "Normal" && filteredFeeds.length === 0);
  const isLoading = appState === "Loading";

  return (
    <div className="flex flex-col h-full bg-background relative overflow-hidden">
      <FollowingHeader filter={filter} onFilterChange={setFilter} />
      <FollowingContent
        feeds={filteredFeeds}
        isEmpty={isEmpty}
        isLoading={isLoading}
        onGoHome={() => navigate(ROUTE_PATHS.home)}
      />
    </div>
  );
};

export default Following;
