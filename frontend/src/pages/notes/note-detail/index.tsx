import NoteDetailFeature from "@/features/notes/note-detail";
import type { PageRouteMeta } from "@/types/page";

export const pageMeta: PageRouteMeta = {
  frameName: "笔记详情",
  showTabBar: false,
};

/**
 * 笔记详情页路由承接层。
 * 当前阶段保持为薄包装，后续再承接路由参数和页面级元信息。
 */
export function NoteDetail() {
  return <NoteDetailFeature />;
}

export default NoteDetail;
