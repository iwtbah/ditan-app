import { ChevronLeft, LogOut, MoonStar, Bell, ShieldCheck, Smartphone, CircleHelp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { PageHeader, HeaderActionButton } from "@/components/ditan/page-header";
import { ROUTE_PATHS } from "@/constants/routes";
import { useAuthStore } from "@/stores/auth-store";

const SETTINGS_GROUPS = [
  {
    title: "账号",
    items: [
      {
        label: "账号与安全",
        description: "手机号、登录设备与账号保护",
        icon: Smartphone,
      },
    ],
  },
  {
    title: "偏好",
    items: [
      {
        label: "通知设置",
        description: "消息提醒、互动与系统通知",
        icon: Bell,
      },
      {
        label: "隐私设置",
        description: "谁可以看到我、黑名单与权限管理",
        icon: ShieldCheck,
      },
      {
        label: "外观模式",
        description: "跟随系统外观，更多主题后续开放",
        icon: MoonStar,
      },
    ],
  },
  {
    title: "支持",
    items: [
      {
        label: "帮助与反馈",
        description: "常见问题、意见反馈与版本说明",
        icon: CircleHelp,
      },
    ],
  },
] as const;

type MeSettingsProps = {
  onClose?: () => void;
};

export default function MeSettings({ onClose }: MeSettingsProps) {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const userInfo = useAuthStore((state) => state.userInfo);

  const handleBack = () => {
    if (onClose) {
      onClose();
      return;
    }

    navigate(-1);
  };

  const handleLogout = () => {
    logout();
    toast.success("已退出登录");
    navigate(ROUTE_PATHS.home, { replace: true });
  };

  return (
    <div className="flex h-full flex-col bg-background">
      <PageHeader
        title="设置"
        leading={(
          <HeaderActionButton aria-label="返回我的页面" onClick={handleBack}>
            <ChevronLeft size={18} strokeWidth={2.4} />
          </HeaderActionButton>
        )}
      />

      <div className="flex-1 overflow-y-auto px-4 pb-8 pt-4 no-scrollbar">
        <section className="rounded-[28px] border border-border/50 bg-white/92 p-5 shadow-[0_16px_36px_rgba(26,28,27,0.06)]">
          <p className="text-[12px] font-bold tracking-[0.14em] text-text-tertiary">当前账号</p>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-[18px] font-bold text-primary">
              {userInfo?.name.slice(-2) ?? "游客"}
            </div>
            <div className="min-w-0">
              <div className="truncate text-[18px] font-bold text-text-primary">
                {userInfo?.name ?? "迪探用户"}
              </div>
              <div className="mt-1 text-[13px] text-text-secondary">
                {userInfo?.phone ?? "未绑定手机号"}
              </div>
            </div>
          </div>
        </section>

        <div className="mt-5 space-y-4">
          {SETTINGS_GROUPS.map((group) => (
            <section
              key={group.title}
              className="rounded-[28px] border border-border/50 bg-card/96 px-4 py-3 shadow-[0_10px_28px_rgba(26,28,27,0.04)]"
            >
              <div className="px-2 pb-2 pt-1 text-[12px] font-bold tracking-[0.14em] text-text-tertiary">
                {group.title}
              </div>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => toast.message(`${item.label}暂未开放`)}
                      className="flex w-full items-center gap-3 rounded-[22px] px-3 py-3 text-left transition-colors hover:bg-muted/70 active:scale-[0.99]"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Icon size={18} strokeWidth={2.2} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-[15px] font-semibold text-text-primary">
                          {item.label}
                        </div>
                        <div className="mt-1 text-[12px] text-text-secondary">
                          {item.description}
                        </div>
                      </div>
                      <div className="text-[18px] text-text-tertiary">›</div>
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-[24px] border border-[#F1C9C5] bg-[#FFF5F4] px-4 py-4 text-[15px] font-semibold text-[#C24E45] shadow-[0_8px_24px_rgba(194,78,69,0.08)] transition hover:bg-[#FFEDEC] active:scale-[0.99]"
        >
          <LogOut size={18} strokeWidth={2.2} />
          退出登录
        </button>
      </div>
    </div>
  );
}
