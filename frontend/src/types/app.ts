/**
 * 应用层共享类型。
 * 主要服务于本地状态、页面骨架和路由元信息等非接口领域对象。
 */
export interface AppSkeletonBlock {
  id: string;
  title: string;
  description: string;
}

export interface AppOptionItem {
  label: string;
  value: string;
}
