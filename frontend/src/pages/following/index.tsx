import FollowingFeature from "@/features/following";
import type { PageRouteMeta } from "@/types/page";

export const pageMeta: PageRouteMeta = {
  frameName: "关注页",
  showTabBar: true,
};

/**
 * 关注页路由承接层。
 * 当前阶段保持为薄包装，后续再承接页面级参数和元信息。
 */
export function Following() {
  return <FollowingFeature />;
}

export default Following;
