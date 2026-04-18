import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "@/constants/routes";
import { resolveAsyncViewState } from "@/utils/resolve-async-view-state";
import { useFollowingFeedsQuery } from "./hooks";
import { FollowingContent, FollowingHeader } from "./components";

export const Following = () => {
  const navigate = useNavigate();
  const feedsQuery = useFollowingFeedsQuery({ filter: "笔记" });
  const filteredFeeds = feedsQuery.data?.items ?? [];
  const viewState = resolveAsyncViewState({
    isError: feedsQuery.isError,
    isLoading: feedsQuery.isPending,
    isEmpty: filteredFeeds.length === 0,
  });

  return (
    <div className="flex flex-col h-full bg-background relative overflow-hidden">
      <FollowingHeader />
      <FollowingContent
        feeds={filteredFeeds}
        state={viewState}
        onGoHome={() => navigate(ROUTE_PATHS.home)}
        onRetry={() => {
          void feedsQuery.refetch();
        }}
      />
    </div>
  );
};

export default Following;
