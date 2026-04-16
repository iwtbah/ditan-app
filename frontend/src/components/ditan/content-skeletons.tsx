import React from "react";
import { Skeleton } from "@/components/feedback/wireframe-ui";

type NoteFeedSkeletonCardProps = {
  height: string;
};

export const NoteFeedSkeletonCard = ({ height }: NoteFeedSkeletonCardProps) => (
  <div className="bg-card rounded-lg overflow-hidden flex flex-col shadow-card border border-border p-md">
    <Skeleton className={`w-full ${height} mb-sm rounded-md bg-muted`} />
    <Skeleton className="h-4 w-[90%] mb-[8px]" />
    <Skeleton className="h-4 w-[60%] mb-[16px]" />
    <div className="flex items-center justify-between mt-auto">
      <div className="flex items-center gap-[6px]">
        <Skeleton className="w-4 h-4 rounded-full" />
        <Skeleton className="h-3 w-12" />
      </div>
      <Skeleton className="h-3 w-8" />
    </div>
  </div>
);

type ShopListSkeletonProps = {
  count?: number;
};

export const ShopListSkeleton = ({ count = 3 }: ShopListSkeletonProps) => (
  <div className="flex flex-col gap-sm">
    {Array.from({ length: count }).map((_, index) => (
      <div key={index} className="bg-card rounded-xl p-md flex items-center justify-between border border-border">
        <div className="flex items-center gap-md w-full">
          <Skeleton className="w-12 h-12 rounded-lg" />
          <div className="flex flex-col gap-xs flex-1">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-3 w-1/3" />
          </div>
        </div>
      </div>
    ))}
  </div>
);
