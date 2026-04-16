import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "@/constants/routes";
import { resolveAsyncViewState } from "@/utils/resolve-async-view-state";
import { useHomeNotesQuery, useHomeShopsQuery } from "./hooks";
import { HomeFeed, HomeHeader } from "./components";

export const Home = () => {
  const navigate = useNavigate();
  const [contentType, setContentType] = useState("探店日记");
  const [activeCategory, setActiveCategory] = useState("推荐");
  const notesQuery = useHomeNotesQuery(
    { category: activeCategory, contentType: "探店日记" },
    contentType === "探店日记",
  );
  const shopsQuery = useHomeShopsQuery(
    { category: activeCategory, contentType: "店铺" },
    contentType === "店铺",
  );
  const activeQuery = contentType === "探店日记" ? notesQuery : shopsQuery;
  const notes = notesQuery.data?.items ?? [];
  const shops = shopsQuery.data?.items ?? [];
  const viewState = resolveAsyncViewState({
    isError: activeQuery.isError,
    isLoading: activeQuery.isPending,
    isEmpty: contentType === "探店日记" ? notes.length === 0 : shops.length === 0,
  });

  return (
    <div className="flex flex-col h-full bg-muted">
      <HomeHeader
        activeCategory={activeCategory}
        contentType={contentType}
        onCategoryChange={setActiveCategory}
        onContentTypeChange={setContentType}
        onOpenSearch={() => navigate(ROUTE_PATHS.search)}
      />
      <HomeFeed
        activeCategory={activeCategory}
        contentType={contentType}
        notes={notes}
        shops={shops}
        state={viewState}
        onRetry={() => {
          void activeQuery.refetch();
        }}
      />
    </div>
  );
};

export default Home;
