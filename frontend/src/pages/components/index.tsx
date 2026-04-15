import React from "react";
import { Layout, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  CategoryTabs,
  CommentItem,
  FeedCard,
  FollowButton,
  Header,
  LikeButton,
  PublishButton,
  ShopCard,
} from "@/components/ditan";
import { ROUTE_PATHS } from "@/constants/routes";

export const ComponentsShowcase = () => {
  const navigate = useNavigate();

  const Section = ({ title, children }: React.PropsWithChildren<{ title: string }>) => (
    <div className="mb-10">
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">
        {title}
      </h3>
      <div className="space-y-6">{children}</div>
    </div>
  );

  const Variant = ({ name, children }: React.PropsWithChildren<{ name: string }>) => (
    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex flex-col gap-3 shadow-sm">
      <span className="text-[11px] font-mono font-bold text-gray-600 bg-white px-2 py-1 rounded border border-gray-100 shadow-sm inline-block w-max">
        {name}
      </span>
      <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm overflow-hidden relative">
        {children}
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-[430px] h-[100dvh] md:h-full md:max-h-[850px] bg-white relative flex flex-col shadow-2xl overflow-hidden md:rounded-[3rem] md:border-[12px] border-gray-900 mx-auto ring-1 ring-gray-200">
      <div className="bg-indigo-900 text-white text-[12px] font-bold py-3 px-4 flex items-center justify-between z-50 sticky top-0 shadow-md">
        <div className="flex items-center gap-2">
          <Layout size={16} className="text-indigo-300" /> COMPONENT PANEL
        </div>
        <button
          onClick={() => navigate(ROUTE_PATHS.home)}
          className="flex items-center text-indigo-200 hover:text-white"
        >
          <ChevronLeft size={16} /> 返回
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-5 pb-20 bg-white">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">组件系统</h1>
          <p className="text-sm text-gray-500">统一管理的复用组件库，支持多状态（Variants）。</p>
        </div>

        <Section title="Content / FeedCard (探店笔记卡片)">
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            <Variant name="FeedCard / Default">
              <div className="w-[160px]">
                <FeedCard
                  id={1}
                  imageClassName="h-32"
                  title="超赞的周末下午茶推荐"
                  author="探店小能手"
                  likes={128}
                  liked={false}
                />
              </div>
            </Variant>
            <Variant name="FeedCard / Liked">
              <div className="w-[160px]">
                <FeedCard
                  id={2}
                  imageClassName="h-32"
                  title="胡同里的宝藏咖啡馆，随便拍绝绝子"
                  author="咖啡星人"
                  likes={342}
                  liked={true}
                />
              </div>
            </Variant>
          </div>
        </Section>

        <Section title="Content / ShopCard (店铺卡片)">
          <Variant name="ShopCard / Default">
            <ShopCard
              id={1}
              name="时光机复古杂货铺"
              rating="4.8"
              distance="2.4km"
              price=""
              recommendation=""
              image=""
              tags={[]}
            />
          </Variant>
          <Variant name="ShopCard / WithTags">
            <ShopCard
              id={2}
              name="半岛咖啡馆"
              rating="4.9"
              distance="1.1km"
              price=""
              recommendation=""
              image=""
              tags={["出片圣地", "安静", "下午茶"]}
            />
          </Variant>
        </Section>

        <Section title="Content / CommentItem (评论项)">
          <Variant name="CommentItem / Default">
            <CommentItem
              id={1}
              author="抹茶不加糖"
              content="请问具体位置在哪里呀？周末想去。"
              time="2小时前"
              likes={12}
              liked={false}
              hasReply={false}
            />
          </Variant>
          <Variant name="CommentItem / Liked & Reply">
            <CommentItem
              id={2}
              author="夏日限定"
              content="真的很好看！老板人也很好。"
              time="昨天 18:00"
              likes={45}
              liked={true}
              hasReply={true}
            />
          </Variant>
        </Section>

        <Section title="Interactive / LikeButton (点赞)">
          <div className="flex flex-wrap gap-4">
            <Variant name="Button / Like / Default">
              <LikeButton liked={false} count={128} />
            </Variant>
            <Variant name="Button / Like / Active">
              <LikeButton liked={true} count={129} />
            </Variant>
            <Variant name="Button / Like / Disabled">
              <LikeButton liked={false} count={128} disabled={true} />
            </Variant>
          </div>
        </Section>

        <Section title="Interactive / FollowButton (关注)">
          <div className="flex flex-wrap gap-4">
            <Variant name="Button / Follow / Default">
              <FollowButton following={false} />
            </Variant>
            <Variant name="Button / Follow / Following">
              <FollowButton following={true} />
            </Variant>
            <Variant name="Button / Follow / Disabled">
              <FollowButton following={false} disabled={true} />
            </Variant>
          </div>
        </Section>

        <Section title="Interactive / PublishButton (发布)">
          <Variant name="Button / Publish / Primary">
            <PublishButton variant="primary" className="w-full py-3">
              发布笔记
            </PublishButton>
          </Variant>
          <Variant name="Button / Publish / Disabled">
            <PublishButton variant="primary" disabled={true} className="w-full py-3">
              发布笔记
            </PublishButton>
          </Variant>
        </Section>

        <Section title="Structure / CategoryTabs & Header">
          <Variant name="Header / Default">
            <div className="-mx-4 -my-4">
              <Header city="北京" placeholder="搜索你想去的探店..." />
            </div>
          </Variant>
          <Variant name="CategoryTabs / Default">
            <div className="-mx-4 -my-4 pt-4">
              <CategoryTabs tabs={["推荐", "附近", "美食", "咖啡", "玩乐"]} activeTab="推荐" />
            </div>
          </Variant>
        </Section>
      </div>
    </div>
  );
};

export default ComponentsShowcase;
