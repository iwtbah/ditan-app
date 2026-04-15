import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "@/constants/routes";
import type { AsyncViewState } from "@/types/common";
import { useStateContext } from "@/prototype/context/StateContext";
import { HomeFeed, HomeHeader } from "./components";

export const Home = () => {
  const { appState } = useStateContext() as { appState: AsyncViewState };
  const navigate = useNavigate();
  const [contentType, setContentType] = useState("探店日记");
  const [activeCategory, setActiveCategory] = useState("推荐");

  return (
    <div className="flex flex-col h-full bg-muted">
      <HomeHeader
        activeCategory={activeCategory}
        contentType={contentType}
        onCategoryChange={setActiveCategory}
        onContentTypeChange={setContentType}
        onOpenSearch={() => navigate(ROUTE_PATHS.search)}
      />
      <HomeFeed activeCategory={activeCategory} appState={appState} contentType={contentType} />
    </div>
  );
};

export default Home;
