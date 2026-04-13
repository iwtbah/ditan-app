/**
 * 笔记详情页骨架。
 * 先固定内容结构，后续将接口查询和交互逻辑迁移到独立 feature 中。
 */
import { useParams } from 'react-router-dom';
import { PageContainer } from '@/components/common/page-container';
import { SectionCard } from '@/components/common/section-card';
import { usePageTitle } from '@/hooks/use-page-title';

export function NoteDetailPage() {
  const { noteId = '' } = useParams();
  usePageTitle('笔记详情');

  return (
    <PageContainer>
      <SectionCard
        title="笔记详情骨架"
        description="当前页面只展示内容详情的信息架构，用于后续接入图文内容、店铺锚点和评论互动模块。"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-500">当前路由参数 noteId：{noteId || '未提供'}</p>
          <div className="rounded-xl border border-dashed border-slate-200 p-5 text-sm text-slate-500">
            作者信息与笔记标题占位
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-dashed border-slate-200 p-5 text-sm text-slate-500">
              图片 / 视频占位 1
            </div>
            <div className="rounded-xl border border-dashed border-slate-200 p-5 text-sm text-slate-500">
              图片 / 视频占位 2
            </div>
            <div className="rounded-xl border border-dashed border-slate-200 p-5 text-sm text-slate-500">
              图片 / 视频占位 3
            </div>
          </div>
          <div className="rounded-xl border border-dashed border-slate-200 p-5 text-sm text-slate-500">
            评论与互动区占位
          </div>
        </div>
      </SectionCard>
    </PageContainer>
  );
}
