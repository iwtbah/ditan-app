import PublishFeature from "@/features/notes/publish";
import type { PageRouteMeta } from "@/types/page";

export const pageMeta: PageRouteMeta = {
  frameName: "发布页",
  showTabBar: false,
};

/**
 * 发布页路由承接层。
 * 当前阶段保持为薄包装，后续再承接页面级参数和元信息。
 */
export function Publish() {
  return <PublishFeature />;
}

export default Publish;
