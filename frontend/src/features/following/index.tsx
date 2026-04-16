import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "@/constants/routes";
import { usePreviewStateContext } from "@/contexts/preview-state-context";
import type { AsyncViewState } from "@/types/common";
import type { FollowingFeedType } from "@/types/note";
import { useFollowingFeedsQuery } from "./hooks";
import { FollowingContent, FollowingHeader } from "./components";

export const Following = () => {
  const { appState } = usePreviewStateContext() as { appState: AsyncViewState };
  const [filter, setFilter] = useState<FollowingFeedType>("全部");
  const navigate = useNavigate();
  const feedsQuery = useFollowingFeedsQuery({
    filter: filter === "全部" ? undefined : filter,
  });
  const filteredFeeds = feedsQuery.data.items;

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
