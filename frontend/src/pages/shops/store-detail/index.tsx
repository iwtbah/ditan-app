import StoreDetailFeature from "@/features/shops/store-detail";
import type { PageRouteMeta } from "@/types/page";

export const pageMeta: PageRouteMeta = {
  frameName: "店铺详情",
  showTabBar: false,
};

/**
 * 店铺详情页路由承接层。
 * 当前阶段保持为薄包装，后续再承接路由参数和页面级元信息。
 */
export function StoreDetail() {
  return <StoreDetailFeature />;
}

export default StoreDetail;
