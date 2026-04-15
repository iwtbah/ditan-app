import React from "react";
import { Skeleton } from "@/prototype/components/WireframeUI";

type HomeSkeletonNoteProps = {
  height: string;
};

export const HomeSkeletonNote = ({ height }: HomeSkeletonNoteProps) => (
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
