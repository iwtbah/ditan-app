/**
 * 登录页骨架。
 * 初始化阶段只保留登录页面分区和表单结构，后续再接真实认证流程。
 */
import { SectionCard } from '@/components/common/section-card';
import { usePageTitle } from '@/hooks/use-page-title';

export function LoginPage() {
  usePageTitle('登录');

  return (
    <SectionCard
      title="登录页骨架"
      description="当前仅保留最小表单结构和登录方式占位，后续再接短信登录、验证码和第三方登录能力。"
    >
      <div className="space-y-4">
        <div className="rounded-xl border border-dashed border-slate-200 p-4 text-sm text-slate-500">
          手机号输入框占位
        </div>
        <div className="rounded-xl border border-dashed border-slate-200 p-4 text-sm text-slate-500">
          验证码输入与发送按钮占位
        </div>
        <div className="rounded-xl border border-dashed border-slate-200 p-4 text-sm text-slate-500">
          登录按钮与协议说明占位
        </div>
      </div>
    </SectionCard>
  );
}
