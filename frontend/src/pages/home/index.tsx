/**
 * 首页骨架页。
 * 初始化阶段只展示首页信息架构占位，不在页面层直接接入复杂业务逻辑。
 */
import { PageContainer } from '@/components/common/page-container';
import { SectionCard } from '@/components/common/section-card';
import { usePageTitle } from '@/hooks/use-page-title';

export function HomePage() {
  usePageTitle('首页');

  return (
    <PageContainer>
      <SectionCard
        title="首页骨架"
        description="当前页面只保留首页的模块分区，用于后续逐步接入推荐流、店铺卡片、探店笔记和搜索入口。"
      >
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-dashed border-slate-200 p-4 text-sm text-slate-500">
            首页头部区域占位
          </div>
          <div className="rounded-xl border border-dashed border-slate-200 p-4 text-sm text-slate-500">
            推荐店铺模块占位
          </div>
          <div className="rounded-xl border border-dashed border-slate-200 p-4 text-sm text-slate-500">
            探店笔记流占位
          </div>
        </div>
      </SectionCard>
    </PageContainer>
  );
}
