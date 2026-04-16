import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { PublishStoreOption } from "@/types/shop";
import { PUBLISH_INITIAL_IMAGES, PUBLISH_STORE_OPTIONS } from "../mocks";
import { usePublishNoteMutation } from "./hooks";
import { PublishEditor, PublishHeader, PublishStoreSheet } from "./components";

export const Publish = () => {
  const navigate = useNavigate();
  const publishNoteMutation = usePublishNoteMutation();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState(PUBLISH_INITIAL_IMAGES);
  const [storeOpen, setStoreOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState<PublishStoreOption | null>(null);
  const [isRecommended, setIsRecommended] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (title || content) {
        toast.success("已自动保存草稿", {
          position: "top-center",
          duration: 1500,
          style: {
            background: "var(--color-card)",
            color: "var(--color-text-secondary)",
            border: "1px solid var(--color-border)",
          },
        });
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [title, content]);

  const canPublish = Boolean(title.trim() || content.trim() || images.length > 0);

  const handlePublish = () => {
    if (!canPublish) return;

    const publishRequest = new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const result = await publishNoteMutation.mutateAsync({
            content,
            images,
            recommended: isRecommended,
            store: selectedStore,
            title,
          });
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }, 1500);
    });

    toast.promise(publishRequest, {
      loading: "正在发布...",
      success: () => {
        setTimeout(() => navigate(-1), 500);
        return "发布成功！";
      },
      error: "发布失败，请重试",
    });
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setImages(images.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="flex flex-col h-full bg-background absolute inset-0 z-[200]"
    >
      <PublishHeader canPublish={canPublish} onBack={() => navigate(-1)} onPublish={handlePublish} />
      <PublishEditor
        content={content}
        images={images}
        isRecommended={isRecommended}
        selectedStore={selectedStore}
        title={title}
        onContentChange={setContent}
        onOpenStoreSheet={() => setStoreOpen(true)}
        onRemoveImage={handleRemoveImage}
        onTitleChange={setTitle}
        onToggleRecommended={() => setIsRecommended((current) => !current)}
      />
      <PublishStoreSheet
        isOpen={storeOpen}
        options={PUBLISH_STORE_OPTIONS}
        selectedStore={selectedStore}
        onClose={() => setStoreOpen(false)}
        onCreateStore={() => {
          setSelectedStore({ name: "新创建的神秘小店", city: "当前位置" });
          setStoreOpen(false);
        }}
        onSelectStore={(store) => {
          setSelectedStore(store);
          setStoreOpen(false);
        }}
      />
    </motion.div>
  );
};

export default Publish;
