import { Link } from 'react-router-dom';
import { SectionCard } from '@/components/common/section-card';
import { AsyncState } from '@/components/feedback/async-state';
import { ROUTE_PATHS } from '@/constants/routes';
import { useShopDetailQuery } from '@/features/shops/hooks/use-shop-detail-query';
import { useShopNotesQuery } from '@/features/shops/hooks/use-shop-notes-query';

interface ShopDetailSectionProps {
  shopId: string;
}

export function ShopDetailSection({ shopId }: ShopDetailSectionProps) {
  const detailQuery = useShopDetailQuery(shopId);
  const notesQuery = useShopNotesQuery(shopId);
  const shop = detailQuery.data;
  const notes = notesQuery.data?.list ?? [];

  return (
    <div className="space-y-6">
      <SectionCard title="店铺详情" description="店铺主数据走 Query，页面只传入路由参数。">
        <AsyncState
          error={detailQuery.error}
          isEmpty={!shop}
          isError={detailQuery.isError}
          isLoading={detailQuery.isLoading}
          emptyMessage="未找到店铺信息"
        >
          <div className="grid gap-4 md:grid-cols-[2fr,1fr]">
            <div className="space-y-3">
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{shop?.name}</h1>
              <div className="flex flex-wrap gap-2 text-sm text-slate-500">
                <span>{shop?.category}</span>
                <span>{shop?.district}</span>
                <span>{shop?.averagePrice ? `人均 ¥${shop.averagePrice}` : '待补充人均'}</span>
              </div>
              <p className="text-sm text-slate-600">{shop?.address}</p>
              <div className="flex flex-wrap gap-2">
                {shop?.tags.map((tag) => (
                  <span key={tag.id} className="rounded-full bg-brand-50 px-3 py-1 text-xs text-brand-700">
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
              <div>评分：{shop?.rating ?? '-'}</div>
              <div className="mt-2">笔记：{shop?.noteCount ?? 0}</div>
              <div className="mt-2">评论：{shop?.commentCount ?? 0}</div>
              <div className="mt-2">营业时间：{shop?.businessHours ?? '待补充'}</div>
            </div>
          </div>
        </AsyncState>
      </SectionCard>

      <SectionCard title="关联探店笔记" description="列表数据同样由 feature 内的 query hook 负责。">
        <AsyncState
          error={notesQuery.error}
          isEmpty={notes.length === 0}
          isError={notesQuery.isError}
          isLoading={notesQuery.isLoading}
          emptyMessage="该店铺暂无公开笔记"
        >
          <div className="space-y-3">
            {notes.map((note) => (
              <Link
                key={note.id}
                className="block rounded-xl border border-slate-200 bg-slate-50/80 p-4 transition hover:bg-white"
                to={ROUTE_PATHS.noteDetail(note.id)}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="font-medium text-slate-900">{note.title}</div>
                    <p className="mt-1 text-sm text-slate-500">{note.excerpt}</p>
                  </div>
                  <div className="text-xs text-slate-400">{note.commentCount} 评论</div>
                </div>
              </Link>
            ))}
          </div>
        </AsyncState>
      </SectionCard>
    </div>
  );
}
