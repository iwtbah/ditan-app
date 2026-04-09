import { PageContainer } from '@/components/common/page-container';
import { SectionCard } from '@/components/common/section-card';
import { usePageTitle } from '@/hooks/use-page-title';

export function HomePage() {
  usePageTitle('首页');

  return (
    <PageContainer>
      <SectionCard
        title="Hello World"
        description="前端工程已完成最小可运行验证。首页当前使用静态骨架，确保在后端接口未联调前也可以直接启动。"
      >
        <div className="space-y-3 text-sm text-slate-600">
          <p>hello world</p>
          <p>下一步可以在此基础上继续接入真实接口、页面原型和业务模块。</p>
        </div>
      </SectionCard>
    </PageContainer>
  );
}
