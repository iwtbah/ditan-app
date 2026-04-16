import SearchFeature from "@/features/search";
import type { PageRouteMeta } from "@/types/page";

export const pageMeta: PageRouteMeta = {
  frameName: "搜索页",
  showTabBar: true,
};

/**
 * 搜索页路由承接层。
 * 当前阶段保持为薄包装，后续再承接页面级参数和元信息。
 */
export function Search() {
  return <SearchFeature />;
}

export default Search;
