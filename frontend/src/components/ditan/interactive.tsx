import React from "react";
import { Heart } from "lucide-react";

type LikeButtonProps = {
  className?: string;
  count?: number;
  disabled?: boolean;
  liked?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const LikeButton = ({ liked = false, count, disabled = false, onClick, className = "" }: LikeButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={(e) => {
        e.preventDefault();
        onClick && onClick(e);
      }}
      className={`flex items-center gap-1.5 transition-colors ${disabled ? "opacity-50 cursor-not-allowed" : "hover:text-text-primary active:scale-95"} ${liked ? "text-primary" : "text-text-secondary"} ${className}`}
    >
      <Heart size={16} fill={liked ? "currentColor" : "none"} className={liked ? "text-primary" : ""} />
      {count !== undefined && <span className="text-xs font-medium text-text-secondary">{count}</span>}
    </button>
  );
};

type FollowButtonProps = {
  className?: string;
  disabled?: boolean;
  following?: boolean;
  onClick?: () => void;
};

export const FollowButton = ({ following = false, disabled = false, onClick, className = "" }: FollowButtonProps) => {
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

export const PublishButton = ({ variant = "primary", disabled = false, onClick, children, className = "" }: PublishButtonProps) => {
  const base = "rounded-full font-bold shadow-sm flex items-center justify-center transition-all active:scale-[0.98]";
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
