import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "@/constants/routes";
import { usePreviewStateContext } from "@/contexts/preview-state-context";
import type { AsyncViewState } from "@/types/common";
import { useHomeNotesQuery, useHomeShopsQuery } from "./hooks";
import { HomeFeed, HomeHeader } from "./components";

export const Home = () => {
  const { appState } = usePreviewStateContext() as { appState: AsyncViewState };
  const navigate = useNavigate();
  const [contentType, setContentType] = useState("探店日记");
  const [activeCategory, setActiveCategory] = useState("推荐");
  const notesQuery = useHomeNotesQuery({ category: activeCategory, contentType: "探店日记" });
  const shopsQuery = useHomeShopsQuery({ category: activeCategory, contentType: "店铺" });

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
        appState={appState}
        contentType={contentType}
        notes={notesQuery.data.items}
        shops={shopsQuery.data.items}
      />
    </div>
  );
};

export default Home;
