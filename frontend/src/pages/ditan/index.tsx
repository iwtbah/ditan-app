import DitanFeature from "@/features/ditan";
import type { PageRouteMeta } from "@/types/page";

export const pageMeta: PageRouteMeta = {
  frameName: "迪探页",
  showTabBar: true,
};

/**
 * 迪探页路由承接层。
 * 当前阶段保持为薄包装，后续再承接页面级参数和元信息。
 */
export function Ditan() {
  return <DitanFeature />;
}

export default Ditan;
