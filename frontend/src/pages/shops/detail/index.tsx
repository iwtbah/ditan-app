/**
 * 店铺详情页骨架。
 * 页面仅承接路由参数和占位结构，真实详情查询后续下沉到 feature 层。
 */
import { useParams } from 'react-router-dom';
import { PageContainer } from '@/components/common/page-container';
import { SectionCard } from '@/components/common/section-card';
import { usePageTitle } from '@/hooks/use-page-title';

export function ShopDetailPage() {
  const { shopId = '' } = useParams();
  usePageTitle('店铺详情');

  return (
    <PageContainer>
      <SectionCard
        title="店铺详情骨架"
        description="当前用于承接店铺详情信息架构，后续逐步接入店铺基础信息、图集、笔记和评论区。"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-500">当前路由参数 shopId：{shopId || '未提供'}</p>
          <div className="grid gap-4 md:grid-cols-[2fr,1fr]">
            <div className="rounded-xl border border-dashed border-slate-200 p-5 text-sm text-slate-500">
              店铺基础信息占位
            </div>
            <div className="rounded-xl border border-dashed border-slate-200 p-5 text-sm text-slate-500">
              营业信息 / 标签占位
            </div>
          </div>
          <div className="rounded-xl border border-dashed border-slate-200 p-5 text-sm text-slate-500">
            店铺探店笔记与评论区占位
          </div>
        </div>
      </SectionCard>
    </PageContainer>
  );
}
