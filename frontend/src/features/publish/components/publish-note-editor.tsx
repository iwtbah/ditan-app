import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CameraIcon,
  ChevronRightIcon,
  CloseIcon,
  HashIcon,
  MapPinIcon,
  StarIcon,
} from '@/components/common/icons';
import { publishInitialImages, publishStoreOptions } from '@/mocks/publish';
import type { PublishStoreOption } from '@/types';
import { cn } from '@/utils/cn';

export function PublishNoteEditor() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState(publishInitialImages);
  const [storeOpen, setStoreOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState<PublishStoreOption | null>(null);
  const [isRecommended, setIsRecommended] = useState(true);
  const [draftSaved, setDraftSaved] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [storeKeyword, setStoreKeyword] = useState('');

  useEffect(() => {
    if (!title.trim() && !content.trim()) {
      return;
    }

    const timer = window.setTimeout(() => {
      setDraftSaved(true);
      window.setTimeout(() => setDraftSaved(false), 1600);
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [title, content]);

  const canPublish = Boolean(title.trim() || content.trim() || images.length > 0);
  const filteredStores = useMemo(() => {
    if (!storeKeyword.trim()) {
      return publishStoreOptions;
    }

    return publishStoreOptions.filter(
      (store) => store.name.includes(storeKeyword.trim()) || store.city.includes(storeKeyword.trim()),
    );
  }, [storeKeyword]);

  return (
    <div className="absolute inset-0 z-[200] flex h-full flex-col bg-background">
      <div className="sticky top-0 z-20 flex items-center justify-between border-b border-border/40 bg-background/80 px-4 py-[14px] pt-safe shadow-sm backdrop-blur-xl">
        <button
          className="ml-[-6px] flex rounded-full p-1.5 text-text-primary transition-colors active:scale-95"
          onClick={() => navigate(-1)}
          type="button"
        >
          <CloseIcon size={26} />
        </button>

        <div className={cn('text-[12px] font-bold text-text-tertiary transition-opacity', draftSaved ? 'opacity-100' : 'opacity-0')}>
          已自动保存草稿
        </div>

        <button
          className={cn(
            'rounded-full px-[18px] py-[8px] text-[15px] font-bold transition-all duration-200',
            canPublish
              ? 'bg-primary text-white shadow-sm active:scale-95'
              : 'cursor-not-allowed bg-muted text-text-tertiary shadow-none',
          )}
          disabled={!canPublish || isPublishing}
          onClick={() => {
            if (!canPublish || isPublishing) {
              return;
            }

            setIsPublishing(true);
            window.setTimeout(() => navigate(-1), 800);
          }}
          type="button"
        >
          {isPublishing ? '发布中...' : '发布'}
        </button>
      </div>

      <div className="relative z-10 flex flex-1 flex-col overflow-y-auto pb-[100px] no-scrollbar">
        <div className="px-4 pb-2 pt-6">
          <div className="flex gap-[12px] overflow-x-auto pb-4 snap-x no-scrollbar">
            <button className="flex h-[104px] w-[104px] shrink-0 snap-start flex-col items-center justify-center gap-2 rounded-[16px] border border-border/60 bg-muted/60 text-text-tertiary transition-colors active:scale-95" type="button">
              <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full border border-border/40 bg-background shadow-sm">
                <CameraIcon className="text-text-secondary" size={18} />
              </div>
              <span className="text-[12px] font-bold tracking-tight">添加图片</span>
            </button>

            {images.map((image, index) => (
              <div
                key={`${image}-${index}`}
                className="relative h-[104px] w-[104px] shrink-0 snap-start overflow-hidden rounded-[16px] border border-border/40 bg-muted shadow-[0_2px_8px_rgba(0,0,0,0.05)]"
              >
                <img alt={`upload-${index + 1}`} className="h-full w-full object-cover" src={image} />
                <button
                  className="absolute right-2 top-2 flex h-[22px] w-[22px] items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md"
                  onClick={() => setImages((current) => current.filter((_, currentIndex) => currentIndex !== index))}
                  type="button"
                >
                  <CloseIcon size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 px-5">
          <input
            className="w-full bg-transparent py-2 text-[22px] font-bold text-text-primary outline-none placeholder:font-medium placeholder:text-text-tertiary"
            onChange={(event) => setTitle(event.target.value)}
            placeholder="写一个吸引人的标题…"
            value={title}
          />

          <div className="my-1 h-[1px] w-full bg-border/40" />

          <textarea
            className="min-h-[140px] w-full resize-none bg-transparent py-3 text-[16px] leading-[1.6] text-text-secondary outline-none placeholder:text-text-tertiary"
            onChange={(event) => setContent(event.target.value)}
            placeholder="说说你的真实体验…"
            value={content}
          />
        </div>

        <div className="mx-5 my-3 h-[1px] bg-border/40" />

        <div className="flex flex-col gap-[8px] px-5">
          <button
            className={cn(
              'flex w-full items-center justify-between rounded-[16px] border px-[16px] py-[14px] transition-all active:scale-[0.98]',
              selectedStore ? 'border-primary/20 bg-primary/5' : 'border-border/40 bg-muted/40',
            )}
            onClick={() => setStoreOpen(true)}
            type="button"
          >
            <div className="flex items-center gap-[10px]">
              <div
                className={cn(
                  'flex h-[32px] w-[32px] items-center justify-center rounded-full',
                  selectedStore ? 'bg-primary/10' : 'border border-border/40 bg-background shadow-sm',
                )}
              >
                <MapPinIcon className={selectedStore ? 'text-primary' : 'text-text-tertiary'} size={16} />
              </div>
              <div className="flex flex-col items-start">
                <span className={cn('text-[15px]', selectedStore ? 'font-bold text-text-primary' : 'font-medium text-text-secondary')}>
                  {selectedStore ? selectedStore.name : '添加地点/店铺'}
                </span>
                {selectedStore ? (
                  <span className="text-[11px] font-medium text-text-tertiary">{selectedStore.city}</span>
                ) : null}
              </div>
            </div>
            <ChevronRightIcon className={selectedStore ? 'text-primary/50' : 'text-text-tertiary'} size={20} />
          </button>

          <div className="mt-1 flex w-full items-center justify-between rounded-[16px] border border-border/40 bg-muted/20 px-[16px] py-[16px]">
            <div className="flex items-center gap-[12px]">
              <StarIcon className={isRecommended ? 'text-warning' : 'text-text-tertiary'} size={20} />
              <span className="text-[15px] font-medium text-text-primary">推荐这条探店</span>
            </div>
            <button
              className={cn('relative h-[26px] w-[46px] rounded-full p-[2px] transition-colors', isRecommended ? 'bg-primary' : 'bg-border/80')}
              onClick={() => setIsRecommended((value) => !value)}
              type="button"
            >
              <span
                className={cn(
                  'absolute top-[2px] h-[22px] w-[22px] rounded-full bg-background shadow-[0_2px_4px_rgba(0,0,0,0.2)] transition-transform',
                  isRecommended ? 'translate-x-[20px]' : 'translate-x-0',
                )}
              />
            </button>
          </div>

          <button
            className="mt-1 flex w-full items-center justify-between rounded-[16px] border border-border/40 bg-muted/20 px-[16px] py-[14px] transition-colors active:scale-[0.98]"
            type="button"
          >
            <div className="flex items-center gap-[10px]">
              <HashIcon className="text-text-tertiary" size={18} />
              <span className="text-[15px] font-medium text-text-secondary">添加话题</span>
            </div>
            <ChevronRightIcon className="text-text-tertiary" size={20} />
          </button>
        </div>
      </div>

      {storeOpen ? (
        <>
          <div className="absolute inset-0 z-[210] bg-black/40 backdrop-blur-[2px]" onClick={() => setStoreOpen(false)} />
          <div className="absolute inset-x-0 bottom-0 z-[220] flex max-h-[75vh] flex-col rounded-t-[24px] border-t border-border/40 bg-background shadow-[0_-8px_32px_rgba(0,0,0,0.1)]">
            <div className="flex items-center justify-between px-5 pb-3 pt-5">
              <span className="text-[18px] font-bold tracking-tight text-text-primary">选择地点</span>
              <button
                className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-muted/80 text-text-secondary transition-colors"
                onClick={() => setStoreOpen(false)}
                type="button"
              >
                <CloseIcon size={18} />
              </button>
            </div>

            <div className="border-b border-border/40 px-5 pb-4">
              <input
                className="w-full rounded-[12px] border border-border/60 bg-muted/60 px-[16px] py-[10px] text-[15px] text-text-primary outline-none placeholder:text-text-tertiary"
                onChange={(event) => setStoreKeyword(event.target.value)}
                placeholder="搜索店铺或创建新地点..."
                value={storeKeyword}
              />
            </div>

            <div className="flex-1 overflow-y-auto p-2 no-scrollbar">
              {filteredStores.map((store) => (
                <button
                  key={store.id}
                  className={cn(
                    'mx-3 my-1 flex w-[calc(100%-24px)] items-center justify-between rounded-[14px] border px-[16px] py-[14px] text-left transition-colors active:scale-[0.98]',
                    selectedStore?.id === store.id ? 'border-primary/20 bg-primary/10' : 'border-transparent bg-transparent',
                  )}
                  onClick={() => {
                    setSelectedStore(store);
                    setStoreOpen(false);
                  }}
                  type="button"
                >
                  <div className="flex flex-col">
                    <span className={cn('text-[15px]', selectedStore?.id === store.id ? 'font-bold text-primary' : 'font-medium text-text-primary')}>
                      {store.name}
                    </span>
                    <span className={cn('text-[12px]', selectedStore?.id === store.id ? 'text-primary/70' : 'text-text-tertiary')}>
                      {store.city}
                    </span>
                  </div>
                  {selectedStore?.id === store.id ? (
                    <div className="flex h-[20px] w-[20px] items-center justify-center rounded-full bg-primary shadow-sm">
                      <div className="h-[8px] w-[8px] rounded-full bg-background" />
                    </div>
                  ) : null}
                </button>
              ))}

              <div className="mx-3 my-3 h-[1px] bg-border/40" />

              <button
                className="mx-3 my-1 flex w-[calc(100%-24px)] items-center gap-[8px] rounded-[14px] border border-dashed border-primary/20 px-[16px] py-[14px] font-bold text-primary transition-all active:scale-[0.98]"
                onClick={() => {
                  setSelectedStore({ id: 'current-location', name: '新创建的神秘小店', city: '当前位置' });
                  setStoreOpen(false);
                }}
                type="button"
              >
                <MapPinIcon size={18} />
                <span>+ 创建新地点</span>
              </button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
