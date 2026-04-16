import MeFeature from "@/features/me";
import type { PageRouteMeta } from "@/types/page";

export const pageMeta: PageRouteMeta = {
  frameName: "我的页",
  showTabBar: true,
};

/**
 * 我的页路由承接层。
 * 当前阶段保持为薄包装，后续再承接页面级参数和元信息。
 */
export function Me() {
  return <MeFeature />;
}

export default Me;
