import { useEffect, useMemo, useState } from 'react';
import { Apple, MessageCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { ROUTE_PATHS } from '@/constants/routes';
import {
  AUTH_REDIRECT_QUERY_KEY,
  isValidPhoneNumber,
  normalizePhoneNumber,
  resolveSafeRedirectTarget,
} from '@/features/auth/utils';
import { useAuthStore } from '@/stores/auth-store';

const CODE_COUNTDOWN_SECONDS = 60;

const THIRD_PARTY_LOGIN_OPTIONS = [
  { label: '微信登录', icon: MessageCircle },
  { label: 'Apple 登录', icon: Apple },
  { label: '更多方式', icon: Sparkles },
];

function getRedirectHint(redirectTarget: string) {
  if (redirectTarget.startsWith(ROUTE_PATHS.ditan)) {
    return '登录后继续进入迪探';
  }

  if (redirectTarget.startsWith(ROUTE_PATHS.publish)) {
    return '登录后继续发布新日记';
  }

  if (redirectTarget.startsWith(ROUTE_PATHS.following)) {
    return '登录后继续查看关注动态';
  }

  if (redirectTarget.startsWith(ROUTE_PATHS.my)) {
    return '登录后继续进入我的页面';
  }

  return '登录后继续探索迪探';
}

export default function LoginFeature() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const isLogin = useAuthStore((state) => state.isLogin);
  const redirectAfterLogin = useAuthStore((state) => state.redirectAfterLogin);
  const setRedirectAfterLogin = useAuthStore((state) => state.setRedirectAfterLogin);
  const clearRedirectAfterLogin = useAuthStore((state) => state.clearRedirectAfterLogin);
  const loginWithPhoneCode = useAuthStore((state) => state.loginWithPhoneCode);
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const rawRedirect = searchParams.get(AUTH_REDIRECT_QUERY_KEY);

  const redirectTarget = useMemo(
    () => resolveSafeRedirectTarget(rawRedirect ?? redirectAfterLogin),
    [rawRedirect, redirectAfterLogin],
  );
  const redirectHint = useMemo(
    () => getRedirectHint(redirectTarget),
    [redirectTarget],
  );

  useEffect(() => {
    setRedirectAfterLogin(
      rawRedirect ? resolveSafeRedirectTarget(rawRedirect) : null,
    );
  }, [rawRedirect, setRedirectAfterLogin]);

  useEffect(() => {
    if (countdown <= 0) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setCountdown((current) => current - 1);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [countdown]);

  if (!isHydrated) {
    return (
      <div className="flex h-full items-center justify-center bg-background px-6 text-center text-[13px] text-text-secondary">
        正在恢复登录状态...
      </div>
    );
  }

  if (isLogin) {
    return <Navigate replace to={redirectTarget} />;
  }

  const canSubmit =
    isValidPhoneNumber(phone) && Boolean(verificationCode.trim()) && !isSubmitting;

  const handleSendCode = () => {
    const normalizedPhone = normalizePhoneNumber(phone);

    if (!isValidPhoneNumber(normalizedPhone)) {
      toast.error('请输入正确的 11 位手机号');
      return;
    }

    setPhone(normalizedPhone);
    setCountdown(CODE_COUNTDOWN_SECONDS);

    // TODO: 后续接真实短信发送接口时，在这里替换为真实的验证码下发请求。
    toast.success('演示模式已发送验证码，可输入任意内容继续登录');
  };

  const handleLogin = async () => {
    const normalizedPhone = normalizePhoneNumber(phone);

    if (!isValidPhoneNumber(normalizedPhone)) {
      toast.error('请输入正确的 11 位手机号');
      return;
    }

    if (!verificationCode.trim()) {
      toast.error('请输入验证码');
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => {
        window.setTimeout(resolve, 600);
      });

      loginWithPhoneCode({ phone: normalizedPhone });
      clearRedirectAfterLogin();
      toast.success('登录成功');
      navigate(redirectTarget, { replace: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGuestBrowse = () => {
    clearRedirectAfterLogin();
    navigate(ROUTE_PATHS.home, { replace: true });
  };

  return (
    <div className="relative flex h-full flex-col overflow-y-auto bg-background">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top,_rgba(74,93,90,0.18),_transparent_65%)]" />
      <div className="pointer-events-none absolute inset-x-6 top-10 h-28 rounded-[32px] bg-white/55 blur-2xl" />

      <div className="relative flex min-h-full flex-col px-6 pb-8 pt-6">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-white/90 px-3 py-1 text-[12px] font-medium text-text-secondary shadow-sm">
            <ShieldCheck size={14} className="text-primary" />
            验证码登录
          </div>

          <button
            type="button"
            className="rounded-full px-3 py-1.5 text-[13px] font-medium text-text-secondary transition hover:bg-muted"
            onClick={handleGuestBrowse}
          >
            先逛逛
          </button>
        </div>

        <div className="mt-10">
          <h1 className="text-[30px] font-semibold tracking-tight text-text-primary">
            欢迎回到迪探
          </h1>
          <p className="mt-3 text-[14px] leading-6 text-text-secondary">
            {redirectHint}。当前为前端演示流程，验证码无需真实校验。
          </p>
        </div>

        <div className="mt-8 rounded-[28px] border border-white/70 bg-white/92 p-5 shadow-[0_16px_36px_rgba(26,28,27,0.08)]">
          <div className="space-y-4">
            <label className="block">
              <span className="mb-2 block text-[13px] font-medium text-text-secondary">
                手机号
              </span>
              <input
                inputMode="numeric"
                autoComplete="tel"
                maxLength={11}
                value={phone}
                onChange={(event) => setPhone(normalizePhoneNumber(event.target.value))}
                placeholder="请输入手机号"
                className="w-full rounded-2xl border border-border/80 bg-muted/70 px-4 py-4 text-[15px] text-text-primary outline-none transition placeholder:text-text-tertiary focus:border-primary/40 focus:bg-white focus:ring-4 focus:ring-primary/10"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-[13px] font-medium text-text-secondary">
                验证码
              </span>
              <div className="flex items-center gap-3">
                <input
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  value={verificationCode}
                  onChange={(event) => setVerificationCode(event.target.value.replace(/\s/g, ''))}
                  placeholder="输入验证码"
                  className="min-w-0 flex-1 rounded-2xl border border-border/80 bg-muted/70 px-4 py-4 text-[15px] text-text-primary outline-none transition placeholder:text-text-tertiary focus:border-primary/40 focus:bg-white focus:ring-4 focus:ring-primary/10"
                />
                <button
                  type="button"
                  disabled={countdown > 0}
                  onClick={handleSendCode}
                  className="shrink-0 rounded-2xl border border-primary/20 bg-primary/10 px-4 py-4 text-[13px] font-semibold text-primary transition disabled:cursor-not-allowed disabled:border-border disabled:bg-muted disabled:text-text-tertiary"
                >
                  {countdown > 0 ? `${countdown}s` : '获取验证码'}
                </button>
              </div>
            </label>
          </div>

          <button
            type="button"
            disabled={!canSubmit}
            onClick={handleLogin}
            className="mt-6 flex w-full items-center justify-center rounded-2xl bg-primary px-4 py-4 text-[15px] font-semibold text-primary-foreground shadow-[0_14px_32px_rgba(74,93,90,0.28)] transition hover:translate-y-[-1px] disabled:cursor-not-allowed disabled:bg-primary/40 disabled:shadow-none"
          >
            {isSubmitting ? '登录中...' : '登录'}
          </button>

          <p className="mt-4 text-center text-[12px] leading-5 text-text-tertiary">
            登录即表示你已阅读并同意《用户协议》与《隐私政策》
          </p>
        </div>

        <div className="mt-8">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-[12px] text-text-tertiary">其他登录方式</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {THIRD_PARTY_LOGIN_OPTIONS.map((option) => {
              const Icon = option.icon;

              return (
                <button
                  key={option.label}
                  type="button"
                  className="rounded-[22px] border border-border/70 bg-white/88 px-3 py-4 text-center shadow-sm transition hover:border-primary/25 hover:bg-white"
                  onClick={() => toast.message(`${option.label}暂未开放`)}
                >
                  <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon size={20} />
                  </div>
                  <div className="mt-2 text-[12px] font-medium text-text-secondary">
                    {option.label}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-auto pt-8 text-center text-[12px] leading-5 text-text-tertiary">
          游客模式仍可访问首页、搜索和详情页；仅迪探、发布、关注、我的需要登录后进入。
        </div>
      </div>
    </div>
  );
}
