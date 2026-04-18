import React from "react";

type PageHeaderProps = {
  actions?: React.ReactNode;
  center?: React.ReactNode;
  centerClassName?: string;
  className?: string;
  leading?: React.ReactNode;
  title: string;
  titleClassName?: string;
};

type HeaderActionButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
};

type HeaderMetaChipProps = {
  className?: string;
  icon?: React.ReactNode;
  label: string;
};

export const PageHeader = ({
  actions,
  center,
  centerClassName = "px-[96px]",
  className = "",
  leading,
  title,
  titleClassName = "text-[16px] font-bold tracking-[0.08em] text-text-primary",
}: PageHeaderProps) => {
  return (
    <div className={`pt-safe sticky top-0 z-20 bg-background/88 backdrop-blur-xl border-b border-border/40 shadow-sm ${className}`}>
      <div className="relative flex h-[56px] items-center px-4">
        <div className="relative z-10 flex min-w-[84px] items-center">{leading}</div>
        {center ? (
          <div className={`absolute inset-0 flex items-center justify-center ${centerClassName}`}>
            {center}
          </div>
        ) : (
          <div className={`pointer-events-none absolute inset-0 flex items-center justify-center ${centerClassName}`}>
            <span className={`truncate ${titleClassName}`}>{title}</span>
          </div>
        )}
        <div className="relative z-10 ml-auto flex min-w-[84px] items-center justify-end gap-2">
          {actions}
        </div>
      </div>
    </div>
  );
};

export const HeaderActionButton = ({ children, className = "", type = "button", ...props }: HeaderActionButtonProps) => (
  <button
    type={type}
    className={`flex h-9 w-9 items-center justify-center rounded-full border border-border/50 bg-card/72 text-text-primary shadow-sm backdrop-blur-xl transition-all active:scale-95 ${className}`}
    {...props}
  >
    {children}
  </button>
);

export const HeaderMetaChip = ({ className = "", icon, label }: HeaderMetaChipProps) => (
  <div className={`inline-flex h-9 items-center gap-1.5 rounded-full border border-border/50 bg-card/72 px-3 text-[12px] font-bold text-text-primary shadow-sm backdrop-blur-xl ${className}`}>
    {icon}
    <span>{label}</span>
  </div>
);
