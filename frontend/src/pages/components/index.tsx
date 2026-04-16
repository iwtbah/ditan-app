import ComponentsShowcaseFeature from "@/features/components-showcase";
import type { PageRouteMeta } from "@/types/page";

export const pageMeta: PageRouteMeta = {
  frameName: "组件面板",
  showTabBar: false,
};

export const ComponentsShowcase = () => <ComponentsShowcaseFeature />;

export default ComponentsShowcase;
