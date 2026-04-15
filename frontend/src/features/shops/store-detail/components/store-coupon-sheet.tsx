import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { Ticket, X } from "lucide-react";
import type { StoreCoupon } from "@/types/shop";

type StoreCouponSheetProps = {
  coupons: StoreCoupon[];
  isOpen: boolean;
  onClose: () => void;
};

export const StoreCouponSheet = ({ coupons, isOpen, onClose }: StoreCouponSheetProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/40 z-[60]" onClick={onClose} />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="absolute bottom-0 inset-x-0 bg-background/85 backdrop-blur-3xl rounded-t-[28px] z-[70] p-6 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.1)] flex flex-col border-t border-border/40"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[19px] font-bold text-text-primary tracking-tight">优惠与活动</h2>
              <button onClick={onClose} className="w-8 h-8 bg-muted/60 rounded-full flex items-center justify-center text-text-secondary active:scale-95 transition-transform">
                <X size={18} strokeWidth={2.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col gap-4 pb-6">
              {coupons.map((coupon) => (
                <div key={coupon.id} className="bg-card/90 backdrop-blur-md border border-border/60 rounded-[20px] p-4 flex flex-col gap-3 shadow-[0_4px_16px_rgba(0,0,0,0.03)] relative overflow-hidden">
                  <div className="absolute top-1/2 -left-2 w-4 h-4 bg-background/50 rounded-full -translate-y-1/2 border-r border-border/60" />
                  <div className="absolute top-1/2 -right-2 w-4 h-4 bg-background/50 rounded-full -translate-y-1/2 border-l border-border/60" />

                  <div className="flex justify-between items-start px-2">
                    <div className="flex gap-3.5">
                      <div className="w-12 h-12 bg-amber-50 dark:bg-amber-500/10 rounded-[12px] flex items-center justify-center text-amber-500 shrink-0">
                        <Ticket size={24} strokeWidth={2} />
                      </div>
                      <div>
                        <h4 className="text-[16px] font-bold text-text-primary mb-1 tracking-tight">{coupon.title}</h4>
                        <span className="bg-red-50 dark:bg-red-500/10 text-red-600 text-[11px] px-2 py-0.5 rounded font-bold">{coupon.type}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[20px] font-bold text-amber-600">
                        <span className="text-[12px]">￥</span>
                        {coupon.newPrice}
                      </div>
                      <div className="text-[12px] font-medium text-text-tertiary line-through">￥{coupon.oldPrice}</div>
                    </div>
                  </div>

                  <div className="border-t border-dashed border-border/60 pt-3.5 flex justify-between items-center mt-1 px-2">
                    <div className="text-[12px] font-bold text-text-tertiary">{coupon.sales} • 随时退 • 过期退</div>
                    <button className="bg-amber-500 text-white font-bold text-[13px] px-5 py-2 rounded-full active:scale-95 transition-transform shadow-[0_2px_12px_rgba(245,158,11,0.3)]">
                      立即抢购
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
