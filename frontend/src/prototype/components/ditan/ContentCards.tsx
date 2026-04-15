import React from "react";
import { Star, MapPin, ChevronRight } from "lucide-react";
import {
  AvatarPlaceholder,
  ImagePlaceholder,
} from "../WireframeUI";
import { LikeButton } from "./Interactive";
import { Link } from "react-router-dom";

export const FeedCard = ({
  id,
  image,
  imageClassName,
  title,
  author,
  authorAvatar,
  likes,
  liked = false,
  onClick,
}: any) => (
  <Link
    to={id ? `/note/${id}` : "#"}
    onClick={onClick}
    className="bg-card rounded-2xl overflow-hidden flex flex-col block shadow-[0_2px_8px_rgba(0,0,0,0.03)] border border-border/40 cursor-pointer hover:shadow-card hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 transition-all group"
  >
    {image ? (
      <div
        className={`w-full relative overflow-hidden bg-muted ${imageClassName}`}
      >
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
    ) : (
      <ImagePlaceholder
        className={`w-full ${imageClassName}`}
      />
    )}
    <div className="p-[14px] flex flex-col gap-[6px]">
      <h3 className="text-[15px] font-bold leading-[22px] text-text-primary line-clamp-2">
        {title}
      </h3>
      <div className="flex items-center justify-between mt-1">
        <div className="flex items-center gap-1.5">
          {authorAvatar ? (
            <img
              src={authorAvatar}
              alt={author}
              className="w-4 h-4 rounded-full object-cover opacity-90"
            />
          ) : (
            <AvatarPlaceholder
              size={16}
              className="opacity-80"
            />
          )}
          <span className="text-[11px] font-medium text-text-secondary truncate max-w-[60px]">
            {author}
          </span>
        </div>
        <LikeButton
          liked={liked}
          count={likes}
          className="scale-90 opacity-80"
        />
      </div>
    </div>
  </Link>
);

export const ShopCard = ({
  id,
  name,
  rating,
  price,
  recommendation,
  image,
  distance,
  tags = [],
  onClick,
  className = "",
}: any) => (
  <Link
    to={id ? `/store/${id}` : "#"}
    onClick={onClick}
    className={`bg-card rounded-[16px] p-3 flex gap-3 shadow-sm border border-border/40 hover:shadow-card transition-all active:scale-[0.98] group cursor-pointer ${className}`}
  >
    {/* Left: Fixed Image */}
    <div className="w-[84px] h-[84px] rounded-xl overflow-hidden shrink-0 bg-muted border border-border/50 flex items-center justify-center">
      {image ? (
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <ImagePlaceholder className="w-full h-full border-none rounded-none" />
      )}
    </div>

    {/* Right: Info */}
    <div className="flex flex-col flex-1 min-w-0 justify-between py-0.5">
      <div>
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[16px] font-bold text-text-primary truncate tracking-tight">
            {name}
          </h3>
          {distance && (
            <span className="text-[11px] font-medium text-text-tertiary whitespace-nowrap pt-[3px]">
              {distance}
            </span>
          )}
        </div>

        <div className="flex items-center text-[12px] font-medium text-text-secondary mt-[3px] flex-wrap gap-x-2 gap-y-1">
          <span className="text-warning flex items-center font-bold">
            <Star
              size={11}
              className="mr-[3px]"
              fill="currentColor"
              strokeWidth={0}
            />
            {rating}
          </span>
          {price && (
            <span className="text-text-tertiary">{price}</span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-[6px] mt-2">
        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex gap-[6px] overflow-hidden">
            {tags.map((tag: string, i: number) => (
              <span
                key={i}
                className="px-2 py-[3px] bg-muted/80 text-text-secondary font-medium text-[10px] rounded-md whitespace-nowrap"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Recommendation quote */}
        {recommendation && (
          <div className="text-[11px] text-primary/80 font-medium truncate bg-primary/[0.06] px-2 py-[3px] rounded-md inline-flex self-start max-w-full items-center">
            <span className="font-serif text-primary/60 font-bold mr-[3px] text-[14px] leading-none translate-y-[2px]">
              "
            </span>
            <span className="truncate">{recommendation}</span>
          </div>
        )}
      </div>
    </div>
  </Link>
);

export const CommentItem = ({
  author,
  content,
  time,
  likes,
  liked = false,
  hasReply = false,
  avatarSize = 32,
  children,
}: any) => (
  <div className="flex gap-md">
    <AvatarPlaceholder size={avatarSize} className="shrink-0" />
    <div className="flex-1 border-b border-border pb-md">
      <div className="flex items-center justify-between">
        <span className="text-caption text-text-secondary font-semibold">
          {author}
        </span>
        <LikeButton liked={liked} count={likes} />
      </div>
      <p className="text-body text-text-primary mt-sm">
        {content}
      </p>
      {children}
      <span className="text-caption text-text-secondary mt-sm flex items-center font-medium">
        {time}
        {hasReply && (
          <span className="ml-sm font-bold cursor-pointer text-text-secondary hover:text-text-primary">
            回复
          </span>
        )}
      </span>
    </div>
  </div>
);