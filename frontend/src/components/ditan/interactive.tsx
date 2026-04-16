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
