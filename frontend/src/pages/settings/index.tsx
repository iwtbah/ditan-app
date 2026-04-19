import MeSettingsFeature from "@/features/me/settings";
import type { PageRouteMeta } from "@/types/page";

export const pageMeta: PageRouteMeta = {
  frameName: "设置页",
  showTabBar: false,
};

/**
 * 设置页路由承接层。
 * 当前阶段保持为薄包装，设置交互与退出登录逻辑下沉到 feature。
 */
export function SettingsPage() {
  return <MeSettingsFeature />;
}

export default SettingsPage;
