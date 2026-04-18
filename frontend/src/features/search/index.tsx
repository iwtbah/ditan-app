import React, { useMemo, useState } from "react";
import {
  ChevronLeft,
  Clock3,
  Flame,
  NotebookText,
  Search as SearchIcon,
  Store,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  FeedCard,
  HeaderActionButton,
  ListContainer,
  MasonryColumns,
  NoteFeedSkeletonCard,
  PageHeader,
  PullEndScrollArea,
  ShopCard,
  ShopListSkeleton,
} from "@/components/ditan";
import { resolveAsyncViewState } from "@/utils/resolve-async-view-state";
import { useSearchNotesQuery, useSearchShopsQuery } from "./hooks";
import {
  SEARCH_HISTORY_TERMS,
  SEARCH_NOTES,
  SEARCH_SHOPS,
  SEARCH_TRENDING_TERMS,
} from "./mocks";

type SearchTab = "全部" | "店铺" | "笔记";

const normalizeKeyword = (value: string) => value.trim().toLowerCase();

const includesKeyword = (value: string, keyword: string) => normalizeKeyword(value).includes(normalizeKeyword(keyword));

const pushUniqueTerm = (items: string[], term: string) => {
  const trimmed = term.trim();
  if (!trimmed) return items;

  return [trimmed, ...items.filter((item) => item !== trimmed)].slice(0, 8);
};

export const Search = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<SearchTab>("全部");
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [historyTerms, setHistoryTerms] = useState(SEARCH_HISTORY_TERMS);
  const keyword = query.trim();
  const isTyping = Boolean(keyword) && !hasSearched;
  const isResultMode = hasSearched && Boolean(keyword);

  const notesQuery = useSearchNotesQuery(
    { keyword },
    isResultMode && (activeTab === "全部" || activeTab === "笔记"),
  );
  const shopsQuery = useSearchShopsQuery(
    { keyword },
    isResultMode && (activeTab === "全部" || activeTab === "店铺"),
  );

  const notes = notesQuery.data?.items ?? [];
  const shops = shopsQuery.data?.items ?? [];

  const resultViewState = resolveAsyncViewState({
    isError:
      activeTab === "全部"
        ? notesQuery.isError && shopsQuery.isError
        : activeTab === "笔记"
          ? notesQuery.isError
          : shopsQuery.isError,
    isLoading:
      activeTab === "全部"
        ? notesQuery.isPending || shopsQuery.isPending
        : activeTab === "笔记"
          ? notesQuery.isPending
          : shopsQuery.isPending,
    isEmpty:
      activeTab === "全部"
        ? notes.length === 0 && shops.length === 0
        : activeTab === "笔记"
          ? notes.length === 0
          : shops.length === 0,
  });

  const searchSuggestionPool = useMemo(
    () => Array.from(
      new Set([
        ...historyTerms,
        ...SEARCH_TRENDING_TERMS,
      ]),
    ),
    [historyTerms],
  );

  const inputSuggestions = useMemo(
    () => searchSuggestionPool.filter((item) => includesKeyword(item, keyword)).slice(0, 6),
    [keyword, searchSuggestionPool],
  );

  const matchedShopSuggestions = useMemo(
    () => SEARCH_SHOPS.filter((shop) =>
      [shop.name, shop.recommendation ?? "", ...(shop.tags ?? [])].some((field) => includesKeyword(field, keyword)))
      .slice(0, 3),
    [keyword],
  );

  const matchedNoteSuggestions = useMemo(
    () => SEARCH_NOTES.filter((note) => includesKeyword(note.title, keyword) || includesKeyword(note.author, keyword)).slice(0, 3),
    [keyword],
  );

  const runSearch = (term = query, tab?: SearchTab) => {
    const nextKeyword = term.trim();
    if (!nextKeyword) return;

    setQuery(nextKeyword);
    setHasSearched(true);
    setHistoryTerms((current) => pushUniqueTerm(current, nextKeyword));
    if (tab) setActiveTab(tab);
  };

  const handleSearch = (event?: React.FormEvent | React.MouseEvent) => {
    event?.preventDefault();

    if (!keyword) {
      navigate(-1);
      return;
    }

    runSearch();
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;
    setQuery(nextValue);

    if (!nextValue.trim()) {
      setHasSearched(false);
      setActiveTab("全部");
      return;
    }

    if (hasSearched) {
      setHasSearched(false);
    }
  };

  const renderSkeleton = () => {
    if (activeTab === "店铺") {
      return <div className="mt-4"><ShopListSkeleton /></div>;
    }

    if (activeTab === "全部") {
      return (
        <div className="space-y-5 pt-4">
          <ResultSection title="推荐店铺">
            <ShopListSkeleton />
          </ResultSection>
          <ResultSection title="相关日记">
            <MasonryColumns
              items={[
                { id: "search-all-skeleton-1", height: "h-48" },
                { id: "search-all-skeleton-2", height: "h-40" },
                { id: "search-all-skeleton-3", height: "h-44" },
                { id: "search-all-skeleton-4", height: "h-52" },
              ]}
              renderItem={(item) => <NoteFeedSkeletonCard key={item.id} height={item.height} />}
            />
          </ResultSection>
        </div>
      );
    }

    return (
      <div className="mt-4">
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

  const renderResultContent = () => {
    if (activeTab === "店铺") {
      return (
        <div className="mt-4 flex flex-col gap-3">
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
      );
    }

    if (activeTab === "笔记") {
      return (
        <div className="mt-4">
          <MasonryColumns
            items={notes}
            renderItem={(note) => (
              <FeedCard
                key={note.id}
                id={note.id}
                title={note.title}
                author={note.author}
                authorAvatar={note.authorAvatar}
                likes={note.likes}
                liked={note.liked}
                image={note.image}
                imageClassName={note.height}
              />
            )}
          />
        </div>
      );
    }

    return (
      <div className="space-y-5 pt-4">
        <ResultSection title={`推荐店铺 · ${shops.length}`}>
          <div className="flex flex-col gap-3">
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
        </ResultSection>

        <ResultSection title={`相关日记 · ${notes.length}`}>
          <MasonryColumns
            items={notes}
            renderItem={(note) => (
              <FeedCard
                key={note.id}
                id={note.id}
                title={note.title}
                author={note.author}
                authorAvatar={note.authorAvatar}
                likes={note.likes}
                liked={note.liked}
                image={note.image}
                imageClassName={note.height}
              />
            )}
          />
        </ResultSection>
      </div>
    );
  };

  return (
    <div className="flex h-full flex-col bg-muted">
      <div className="pt-safe sticky top-0 z-20 flex flex-col bg-background/96 shadow-sm backdrop-blur-xl">
        <PageHeader
          className="static border-b-0 bg-transparent pt-0 shadow-none backdrop-blur-none"
          title="搜索"
          centerClassName="px-[60px]"
          leading={(
            <HeaderActionButton
              aria-label="返回上一页"
              className="border-transparent bg-transparent shadow-none"
              onClick={() => navigate(-1)}
            >
              <ChevronLeft size={22} strokeWidth={2.4} />
            </HeaderActionButton>
          )}
          center={(
            <form
              onSubmit={handleSearch}
              className="flex h-10 w-full items-center gap-2 rounded-full border border-border/50 bg-input px-4 shadow-inner"
            >
              <SearchIcon size={16} className="shrink-0 text-text-secondary" />
              <input
                type="text"
                placeholder="搜索日记、店铺或灵感关键词"
                value={query}
                onChange={handleQueryChange}
                autoFocus
                className="w-full bg-transparent text-[14px] text-text-primary outline-none placeholder:text-text-secondary"
              />
            </form>
          )}
          actions={(
            <button
              onClick={handleSearch}
              className="px-1 py-2 text-[14px] font-bold text-text-primary transition-colors active:text-primary"
            >
              {keyword ? "搜索" : "取消"}
            </button>
          )}
        />

        {isResultMode && (
          <div className="flex items-center gap-2 border-b border-border/40 bg-background px-4 pt-2">
            {(["全部", "店铺", "笔记"] as const).map((tab) => (
              <ResultTabButton
                key={tab}
                active={activeTab === tab}
                count={tab === "全部" ? notes.length + shops.length : tab === "店铺" ? shops.length : notes.length}
                label={tab}
                onClick={() => setActiveTab(tab)}
              />
            ))}
          </div>
        )}
      </div>

      <PullEndScrollArea
        enabled={isResultMode && resultViewState === "Normal"}
        wrapperClassName="relative flex-1 overflow-hidden bg-muted"
        endHintBottomClassName="bottom-5"
        hintText="已经到底了"
        scrollClassName="relative h-full overflow-y-auto no-scrollbar overscroll-y-contain px-4 pb-8 pt-4"
      >
        {!keyword ? (
          <DefaultSearchView
            historyTerms={historyTerms}
            onClearHistory={() => setHistoryTerms([])}
            onSelectTerm={(term) => runSearch(term)}
          />
        ) : isTyping ? (
          <TypingSuggestionView
            keyword={keyword}
            noteSuggestions={matchedNoteSuggestions}
            searchSuggestions={inputSuggestions}
            shopSuggestions={matchedShopSuggestions}
            onSelectKeyword={(term) => runSearch(term)}
            onSelectNote={(term) => runSearch(term, "笔记")}
            onSelectShop={(term) => runSearch(term, "店铺")}
          />
        ) : (
          <ListContainer
            state={resultViewState}
            loadingComponent={renderSkeleton()}
            emptyMessage={`未找到与 "${query}" 相关的内容`}
            errorMessage="搜索结果加载失败"
            onRetry={() => {
              void notesQuery.refetch();
              void shopsQuery.refetch();
            }}
          >
            {renderResultContent()}
          </ListContainer>
        )}
      </PullEndScrollArea>
    </div>
  );
};

type DefaultSearchViewProps = {
  historyTerms: string[];
  onClearHistory: () => void;
  onSelectTerm: (term: string) => void;
};

const DefaultSearchView = ({ historyTerms, onClearHistory, onSelectTerm }: DefaultSearchViewProps) => (
  <div className="space-y-5 pb-8">
    <section className="rounded-[22px] border border-border/40 bg-background px-4 py-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      <SectionTitle
        action={historyTerms.length > 0 ? (
          <button
            type="button"
            onClick={onClearHistory}
            className="inline-flex items-center gap-1 text-[12px] font-medium text-text-tertiary transition-colors active:text-text-primary"
          >
            <Trash2 size={13} strokeWidth={2.2} />
            <span>清空历史</span>
          </button>
        ) : undefined}
        icon={<Clock3 size={15} strokeWidth={2.4} />}
        title="历史搜索"
      />

      {historyTerms.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {historyTerms.map((term) => (
            <DiscoveryChip key={term} label={term} onClick={() => onSelectTerm(term)} />
          ))}
        </div>
      ) : (
        <p className="mt-3 text-[13px] text-text-tertiary">还没有历史搜索，试试从热门词开始。</p>
      )}
    </section>

    <section className="rounded-[22px] border border-border/40 bg-background px-4 py-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      <SectionTitle icon={<Flame size={15} strokeWidth={2.4} className="text-warning" />} title="热门搜索" />
      <div className="mt-3 grid grid-cols-2 gap-2">
        {SEARCH_TRENDING_TERMS.map((term, index) => (
          <button
            key={term}
            type="button"
            onClick={() => onSelectTerm(term)}
            className="flex items-center gap-3 rounded-2xl border border-border/40 bg-card px-3 py-3 text-left transition-all active:scale-[0.98]"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-[12px] font-bold text-primary">
              {index + 1}
            </span>
            <span className="truncate text-[13px] font-medium text-text-primary">{term}</span>
          </button>
        ))}
      </div>
    </section>

  </div>
);

type TypingSuggestionViewProps = {
  keyword: string;
  noteSuggestions: typeof SEARCH_NOTES;
  searchSuggestions: string[];
  shopSuggestions: typeof SEARCH_SHOPS;
  onSelectKeyword: (term: string) => void;
  onSelectNote: (term: string) => void;
  onSelectShop: (term: string) => void;
};

const TypingSuggestionView = ({
  keyword,
  noteSuggestions,
  searchSuggestions,
  shopSuggestions,
  onSelectKeyword,
  onSelectNote,
  onSelectShop,
}: TypingSuggestionViewProps) => (
  <div className="space-y-5 pb-8">
    <div className="rounded-[22px] border border-border/40 bg-background px-4 py-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      <SectionTitle icon={<SearchIcon size={15} strokeWidth={2.4} />} title="搜索建议" />
      <div className="mt-3 space-y-2">
        {(searchSuggestions.length > 0 ? searchSuggestions : [`${keyword} 店铺`, `${keyword} 攻略`, `${keyword} 附近`]).map((term) => (
          <SuggestionRow key={term} label={term} onClick={() => onSelectKeyword(term)} />
        ))}
      </div>
    </div>

    <div className="rounded-[22px] border border-border/40 bg-background px-4 py-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      <SectionTitle icon={<Store size={15} strokeWidth={2.4} />} title="匹配店铺" />
      <div className="mt-3 space-y-2">
        {shopSuggestions.length > 0 ? (
          shopSuggestions.map((shop) => (
            <button
              key={shop.id}
              type="button"
              onClick={() => onSelectShop(shop.name)}
              className="flex w-full items-center justify-between rounded-2xl border border-border/40 bg-card px-3 py-3 text-left transition-all active:scale-[0.98]"
            >
              <div>
                <p className="text-[14px] font-bold text-text-primary">{shop.name}</p>
                <p className="mt-1 text-[12px] text-text-tertiary">{shop.tags.join(" / ")}</p>
              </div>
              <span className="rounded-full bg-primary/8 px-2.5 py-1 text-[11px] font-bold text-primary/90">店铺</span>
            </button>
          ))
        ) : (
          <p className="text-[13px] text-text-tertiary">暂无更精确的店铺建议，点击上方搜索词也可以直接进入结果页。</p>
        )}
      </div>
    </div>

    <div className="rounded-[22px] border border-border/40 bg-background px-4 py-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      <SectionTitle icon={<NotebookText size={15} strokeWidth={2.4} />} title="匹配日记" />
      <div className="mt-3 space-y-2">
        {noteSuggestions.length > 0 ? (
          noteSuggestions.map((note) => (
            <button
              key={note.id}
              type="button"
              onClick={() => onSelectNote(note.title)}
              className="flex w-full items-center justify-between rounded-2xl border border-border/40 bg-card px-3 py-3 text-left transition-all active:scale-[0.98]"
            >
              <div className="min-w-0">
                <p className="truncate text-[14px] font-bold text-text-primary">{note.title}</p>
                <p className="mt-1 text-[12px] text-text-tertiary">{note.author}</p>
              </div>
              <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-bold text-text-secondary">日记</span>
            </button>
          ))
        ) : (
          <p className="text-[13px] text-text-tertiary">当前没有更贴近的日记建议，可以直接提交关键词搜索。</p>
        )}
      </div>
    </div>
  </div>
);

type SectionTitleProps = {
  action?: React.ReactNode;
  icon?: React.ReactNode;
  title: string;
};

const SectionTitle = ({ action, icon, title }: SectionTitleProps) => (
  <div className="flex items-center justify-between gap-3">
    <div className="flex items-center gap-2">
      <span className="text-text-secondary">{icon}</span>
      <h3 className="text-[15px] font-bold text-text-primary">{title}</h3>
    </div>
    {action}
  </div>
);

type DiscoveryChipProps = {
  label: string;
  onClick: () => void;
};

const DiscoveryChip = ({ label, onClick }: DiscoveryChipProps) => (
  <button
    type="button"
    onClick={onClick}
    className="rounded-full border border-border/50 bg-card px-3.5 py-2 text-[13px] font-medium text-text-primary transition-all active:scale-[0.98]"
  >
    {label}
  </button>
);

type SuggestionRowProps = {
  label: string;
  onClick: () => void;
};

const SuggestionRow = ({ label, onClick }: SuggestionRowProps) => (
  <button
    type="button"
    onClick={onClick}
    className="flex w-full items-center gap-3 rounded-2xl border border-border/40 bg-card px-3 py-3 text-left transition-all active:scale-[0.98]"
  >
    <div className="rounded-full bg-muted p-2 text-text-secondary">
      <SearchIcon size={14} strokeWidth={2.4} />
    </div>
    <span className="truncate text-[14px] font-medium text-text-primary">{label}</span>
  </button>
);

type ResultSectionProps = {
  children: React.ReactNode;
  title: string;
};

const ResultSection = ({ children, title }: ResultSectionProps) => (
  <section className="rounded-[22px] border border-border/40 bg-background px-4 py-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
    <SectionTitle title={title} />
    <div className="mt-3">{children}</div>
  </section>
);

type ResultTabButtonProps = {
  active: boolean;
  count: number;
  label: SearchTab;
  onClick: () => void;
};

const ResultTabButton = ({ active, count, label, onClick }: ResultTabButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    className={`relative rounded-t-2xl px-3 py-2 text-[14px] font-bold transition-colors ${
      active ? "text-text-primary" : "text-text-secondary"
    }`}
  >
    <span>{label}</span>
    <span className="ml-1 text-[12px] text-text-tertiary">{count}</span>
    {active && <span className="absolute inset-x-0 bottom-0 mx-auto h-[3px] w-5 rounded-full bg-primary" />}
  </button>
);

export default Search;
