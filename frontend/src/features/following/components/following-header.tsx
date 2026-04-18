import React from "react";
import { PageHeader } from "@/components/ditan";

export const FollowingHeader = () => {
  return (
    <div className="pt-safe sticky top-0 z-40 bg-background/88 backdrop-blur-xl shadow-sm border-b border-border/40">
      <PageHeader
        className="static border-b-0 bg-transparent pt-0 shadow-none backdrop-blur-none"
        title="关注"
        titleClassName="text-[16px] font-bold tracking-[0.12em] text-text-primary"
      />
    </div>
  );
};
