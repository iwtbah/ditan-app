import React, { useState } from "react";
import { ChevronLeft, Search as SearchIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FeedCard, ListContainer, MasonryColumns, NoteFeedSkeletonCard, PullEndScrollArea, ShopCard, ShopListSkeleton } from "@/components/ditan";
import { resolveAsyncViewState } from "@/utils/resolve-async-view-state";
import { useSearchNotesQuery, useSearchShopsQuery } from "./hooks";

export const Search = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("日记");
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const keyword = query.trim();
  const notesQuery = useSearchNotesQuery({ keyword }, hasSearched && Boolean(keyword) && activeTab === "日记");
  const shopsQuery = useSearchShopsQuery({ keyword }, hasSearched && Boolean(keyword) && activeTab === "店铺");
  const notes = notesQuery.data?.items ?? [];
  const shops = shopsQuery.data?.items ?? [];
  const activeQuery = activeTab === "日记" ? notesQuery : shopsQuery;
  const viewState = resolveAsyncViewState({
    isError: activeQuery.isError,
    isLoading: activeQuery.isPending,
    isEmpty: activeTab === "日记" ? notes.length === 0 : shops.length === 0,
  });

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (query.trim()) {
      setHasSearched(true);
    }
  };

  const renderSkeleton = () => {
    if (activeTab === "店铺") {
      return <div className="mt-md"><ShopListSkeleton /></div>;
    }

    return (
      <div className="mt-md">
        <MasonryColumns
          items={[
            { id: "search-skeleton-1", height: "h-48" },
            { id: "search-skeleton-2", height: "h-40" },
            { id: "search-skeleton-3", height: "h-48" },
            { id: "search-skeleton-4", height: "h-40" },
          ]}
          renderItem={(item) => <NoteFeedSkeletonCard key={item.id} height={item.height} />}
        />
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-muted">
      <div className="pt-safe bg-background z-10 sticky top-0 shadow-sm flex flex-col">
        <div className="flex items-center px-sm py-md gap-sm border-b border-border">
          <button
            onClick={() => navigate(-1)}
            className="p-sm text-text-secondary active:bg-muted rounded-full"
          >
            <ChevronLeft size={24} />
          </button>

          <form
            onSubmit={handleSearch}
            className="flex-1 bg-muted h-9 rounded-full flex items-center px-md gap-sm"
          >
            <SearchIcon size={16} className="text-text-secondary" />
            <input
              type="text"
              placeholder="搜索日记或店铺..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              autoFocus
              className="bg-transparent border-none outline-none text-body w-full placeholder:text-text-secondary text-text-primary"
            />
          </form>

          <button
            onClick={handleSearch}
            className="px-md py-sm text-body font-bold text-text-primary active:text-primary"
          >
            搜索
          </button>
        </div>

        {hasSearched && (
          <div className="flex items-center justify-center gap-2xl border-b border-border pt-sm bg-background">
            <div
              onClick={() => setActiveTab("日记")}
              className={`pb-sm text-body relative cursor-pointer transition-colors ${
                activeTab === "日记"
                  ? "text-text-primary font-bold"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              日记
              {activeTab === "日记" && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[3px] bg-primary rounded-full" />
              )}
            </div>
            <div
              onClick={() => setActiveTab("店铺")}
              className={`pb-sm text-body relative cursor-pointer transition-colors ${
                activeTab === "店铺"
                  ? "text-text-primary font-bold"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              店铺
              {activeTab === "店铺" && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[3px] bg-primary rounded-full" />
              )}
            </div>
          </div>
        )}
      </div>

      <PullEndScrollArea
        enabled={hasSearched && viewState === "Normal"}
        wrapperClassName="flex-1 relative overflow-hidden bg-muted"
        endHintBottomClassName="bottom-5"
        scrollClassName="h-full overflow-y-auto no-scrollbar overscroll-y-contain p-sm relative"
      >
        {!hasSearched ? (
          <div className="mt-lg">
            <h3 className="text-caption font-bold text-text-secondary px-sm mb-md">历史搜索</h3>
            <div className="flex flex-wrap gap-md px-sm">
              {["咖啡馆", "下午茶", "精酿小酒馆", "露营"].map((term) => (
                <span
                  key={term}
                  onClick={() => {
                    setQuery(term);
                    setHasSearched(true);
                  }}
                  className="px-md py-xs bg-card border border-border rounded-full text-caption text-text-primary cursor-pointer active:bg-muted"
                >
                  {term}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <ListContainer
            state={viewState}
            loadingComponent={renderSkeleton()}
            emptyMessage={`未找到与 "${query}" 相关的${activeTab}`}
            errorMessage="加载失败"
            onRetry={() => {
              void activeQuery.refetch();
            }}
          >
            <div className="mt-md">
              {activeTab === "日记" ? (
                <MasonryColumns
                  items={notes}
                  renderItem={(note) => (
                    <FeedCard
                      key={note.id}
                      id={note.id}
                      title={note.title}
                      author={note.author}
                      likes={note.likes}
                      liked={note.liked}
                      imageClassName={note.height}
                    />
                  )}
                />
              ) : (
                <div className="flex flex-col gap-sm">
                  {shops.map((shop) => (
                    <ShopCard
                      key={shop.id}
                      id={shop.id}
                      name={shop.name}
                      rating={shop.rating}
                      price={shop.price}
                      recommendation={shop.recommendation}
                      image={shop.image}
                      distance={shop.distance}
                      tags={shop.tags}
                    />
                  ))}
                </div>
              )}
            </div>
          </ListContainer>
        )}
      </PullEndScrollArea>
    </div>
  );
};

export default Search;
