/**
 * 兼容旧命名。
 * 新代码优先使用 `useAppStore`，但保留 `useUiStore` 以减少初始化阶段重构成本。
 */
export { useAppStore as useUiStore } from '@/stores/app-store';
