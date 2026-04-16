import React from "react";

type CategoryTabsProps = {
  activeTab?: string;
  className?: string;
  onChange?: (tab: string) => void;
  tabs: string[];
};

export const CategoryTabs = ({ tabs, activeTab, onChange, className = "" }: CategoryTabsProps) => (
  <div className={`flex px-lg overflow-x-auto no-scrollbar gap-xl pt-sm pb-0 bg-background ${className}`}>
    {tabs.map((tab: string, idx: number) => {
      const isActive = activeTab === tab || (activeTab === undefined && idx === 0);
      return (
        <div
          key={tab}
          onClick={() => onChange && onChange(tab)}
          className={`whitespace-nowrap pb-sm text-body font-medium relative cursor-pointer transition-colors ${
            isActive ? "text-text-primary font-bold" : "text-text-secondary hover:text-text-primary"
          }`}
        >
          {tab}
          {isActive && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[3px] bg-primary rounded-full" />}
        </div>
      );
    })}
  </div>
);

type FollowButtonProps = {
  className?: string;
  disabled?: boolean;
  following?: boolean;
  onClick?: () => void;
};

export const FollowButton = ({
  following = false,
  disabled = false,
  onClick,
  className = "",
}: FollowButtonProps) => {
  if (following) {
    return (
      <button
        disabled={disabled}
        onClick={(e) => {
          e.preventDefault();
          onClick && onClick();
        }}
        className={`h-8 px-lg text-caption font-bold rounded-full border border-border text-text-secondary bg-muted ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100 active:scale-95"} transition-all ${className}`}
      >
        已关注
      </button>
    );
  }

  return (
    <button
      disabled={disabled}
      onClick={(e) => {
        e.preventDefault();
        onClick && onClick();
      }}
      className={`h-8 px-lg text-caption font-bold rounded-full border border-primary text-primary ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-primary hover:text-white active:scale-95"} transition-all ${className}`}
    >
      关注
    </button>
  );
};

type PublishButtonProps = {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  variant?: "primary" | "secondary";
};

export const PublishButton = ({
  variant = "primary",
  disabled = false,
  onClick,
  children,
  className = "",
}: PublishButtonProps) => {
  const base =
    "rounded-full font-bold shadow-sm flex items-center justify-center transition-all active:scale-[0.98]";
  const variants: Record<NonNullable<PublishButtonProps["variant"]>, string> = {
    primary: "bg-primary text-white hover:opacity-90",
    secondary: "bg-card text-text-primary border border-border hover:bg-muted",
  };

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
    >
      {children}
    </button>
  );
};
