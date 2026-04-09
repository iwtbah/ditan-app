import { useState, type FormEvent } from 'react';
import { SectionCard } from '@/components/common/section-card';
import { useLoginMutation } from '@/features/auth/hooks/use-login-mutation';

export function LoginPanel() {
  const loginMutation = useLoginMutation();
  const [mobile, setMobile] = useState('');
  const [verifyCode, setVerifyCode] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    loginMutation.mutate({
      mobile,
      verifyCode,
    });
  }

  return (
    <SectionCard title="登录" description="当前阶段保留最小表单骨架，后续可替换成短信登录、OAuth 等完整流程。">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-brand-400"
          onChange={(event) => setMobile(event.target.value)}
          placeholder="手机号"
          value={mobile}
        />
        <input
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-brand-400"
          onChange={(event) => setVerifyCode(event.target.value)}
          placeholder="验证码"
          value={verifyCode}
        />
        <button
          className="w-full rounded-xl bg-brand-600 px-4 py-3 text-sm font-medium text-white disabled:opacity-60"
          disabled={loginMutation.isPending}
          type="submit"
        >
          {loginMutation.isPending ? '登录中...' : '登录'}
        </button>
        {loginMutation.isError ? (
          <p className="text-sm text-red-600">{loginMutation.error.message || '登录失败，请检查接口配置'}</p>
        ) : null}
      </form>
    </SectionCard>
  );
}
