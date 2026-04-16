import React, { useState } from "react";
import { ChevronLeft, Search as SearchIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FeedCard, ListContainer, ShopCard } from "@/components/ditan";
import { Skeleton } from "@/components/feedback/wireframe-ui";
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
      return (
        <div className="flex flex-col gap-sm mt-md">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-card rounded-xl p-md flex items-center justify-between border border-border"
            >
              <div className="flex items-center gap-md w-full">
                <Skeleton className="w-12 h-12 rounded-lg" />
                <div className="flex flex-col gap-xs flex-1">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-3 w-1/3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="flex gap-sm mt-md">
        <div className="flex-1 flex flex-col gap-sm">
          {[1, 2].map((item) => (
            <div
              key={item}
              className="bg-card rounded-lg overflow-hidden flex flex-col shadow-card border border-border p-md"
            >
              <Skeleton className="w-full h-48 mb-sm rounded-md bg-muted" />
              <Skeleton className="h-4 w-[90%] mb-[8px]" />
              <Skeleton className="h-4 w-[60%] mb-[16px]" />
            </div>
          ))}
        </div>
        <div className="flex-1 flex flex-col gap-sm">
          {[3, 4].map((item) => (
            <div
              key={item}
              className="bg-card rounded-lg overflow-hidden flex flex-col shadow-card border border-border p-md"
            >
              <Skeleton className="w-full h-40 mb-sm rounded-md bg-muted" />
              <Skeleton className="h-4 w-[90%] mb-[8px]" />
              <Skeleton className="h-4 w-[60%] mb-[16px]" />
            </div>
          ))}
        </div>
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

      <div className="flex-1 overflow-y-auto bg-muted p-sm relative">
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
                <div className="flex gap-sm">
                  <div className="flex-1 flex flex-col gap-sm">
                    {notes.filter((_, index) => index % 2 === 0).map((note) => (
                      <FeedCard
                        key={note.id}
                        id={note.id}
                        title={note.title}
                        author={note.author}
                        likes={note.likes}
                        liked={note.liked}
                        imageClassName={note.height}
                      />
                    ))}
                  </div>
                  <div className="flex-1 flex flex-col gap-sm">
                    {notes.filter((_, index) => index % 2 !== 0).map((note) => (
                      <FeedCard
                        key={note.id}
                        id={note.id}
                        title={note.title}
                        author={note.author}
                        likes={note.likes}
                        liked={note.liked}
                        imageClassName={note.height}
                      />
                    ))}
                  </div>
                </div>
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
      </div>
    </div>
  );
};

export default Search;
