import React from 'react';
import { Image, User, Inbox, AlertCircle, RefreshCw } from 'lucide-react';

export const ImagePlaceholder = ({
  className = '',
  iconSize = 32,
  children
}: {
  className?: string;
  iconSize?: number;
  children?: React.ReactNode;
}) => (
  <div className={`bg-gray-200 border border-dashed border-gray-400 flex items-center justify-center text-gray-400 relative overflow-hidden ${className}`}>
    <Image size={iconSize} />
    {children}
  </div>
);

export const AvatarPlaceholder = ({
  className = '',
  size = 32,
}: {
  className?: string;
  size?: number;
}) => (
  <div 
    className={`bg-gray-300 rounded-full flex items-center justify-center text-gray-500 flex-shrink-0 ${className}`}
    style={{ width: size, height: size }}
  >
    <User size={size * 0.6} />
  </div>
);

export const ButtonPlaceholder = ({
  className = '',
  children,
  onClick,
  variant = 'primary',
}: {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
}) => {
  const baseClasses = "flex items-center justify-center rounded-md font-medium text-sm transition-colors";
  
  const variants = {
    primary: "bg-gray-800 text-white hover:bg-gray-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
    ghost: "text-gray-600 hover:bg-gray-100",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} px-4 py-2 ${className}`}
    >
      {children}
    </button>
  );
};

// --- State UI Components ---

export const Skeleton = ({ className = '', style }: { className?: string, style?: any }) => (
  <div className={`animate-pulse bg-gray-300 rounded-sm ${className}`} style={style} />
);

export const EmptyState = ({ message = '暂无内容', icon: Icon = Inbox }) => (
  <div className="flex flex-col items-center justify-center py-20 px-4 text-gray-400 w-full h-full min-h-[300px]">
    <Icon size={48} className="mb-4 text-gray-300" strokeWidth={1.5} />
    <p className="text-sm font-medium text-gray-500">{message}</p>
  </div>
);

export const ErrorState = ({ message = '加载失败，请稍后重试', onRetry }: { message?: string, onRetry?: () => void }) => (
  <div className="flex flex-col items-center justify-center py-20 px-4 text-gray-500 w-full h-full min-h-[300px]">
    <AlertCircle size={48} className="mb-4 text-gray-300" strokeWidth={1.5} />
    <p className="text-sm mb-6 font-medium">{message}</p>
    <ButtonPlaceholder variant="outline" onClick={onRetry} className="text-xs py-1.5 h-auto rounded-full bg-white px-5 shadow-sm border-gray-300">
      <RefreshCw size={14} className="mr-1.5" /> 重新加载
    </ButtonPlaceholder>
  </div>
);
