import HomeFeature from "@/features/home";
import type { PageRouteMeta } from "@/types/page";

export const pageMeta: PageRouteMeta = {
  frameName: "首页",
  showTabBar: true,
};

/**
 * 首页路由承接层。
 * 当前阶段保持为薄包装，后续再承接页面级参数和元信息。
 */
export function Home() {
  return <HomeFeature />;
}

export default Home;
