import React from "react";
import { NoteFeedSkeletonCard } from "@/components/ditan";

type HomeSkeletonNoteProps = {
  height: string;
};

export const HomeSkeletonNote = ({ height }: HomeSkeletonNoteProps) => <NoteFeedSkeletonCard height={height} />;
