import { twMerge } from "tailwind-merge";
import { OrderFormProps, tabs } from "..";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { OrderFormTabs } from "../tabs";
import { useSearchParams } from "next/navigation";
import { Icon } from "@/components/ui/icon";
import { Spot } from "../spot";
import { CrossIsolated } from "../cross-isolated";
import { OrderTab } from "../order-tab";

export const OrderFormMobile = (props: OrderFormProps)  => {
  const { coin1, coin2 } = props;
  const [isBuy, setIsBuy] = useState(true);
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('type') ?? 'spot';

  const handleClick = (isBuyButton: boolean) => {
    setIsBuy(isBuyButton);
    setOpen(true);
  }

  return (
    <div className="flex items-center justify-between gap-4 p-4">
      <Button
        onClick={() => handleClick(true)}
        className={twMerge(
          "w-full text-white-100 hover:text-white-100 font-semibold !border-none h-10 hover:opacity-80 rounded-lg",
          '!bg-success-100'
        )}
      >
        Buy
      </Button>
      <Button
        onClick={() => handleClick(false)}
        className={twMerge(
          "w-full text-white-100 hover:text-white-100 font-semibold !border-none h-10 hover:opacity-80 rounded-lg",
          '!bg-error'
        )}
      >
        Sell
      </Button>
      <Modal
        open={open}
        setOpen={setOpen}
        isMobileOpen
        className="bg-white-200 dark:!bg-[#181E25] rounded-b-none pt-0 bottom-[33px]"
      >
        <div className="flex justify-between items-center">
          <OrderFormTabs coin1={coin1} coin2={coin2} activeTab={activeTab} />
          <div className="absolute right-6" onClick={() => setOpen(false)}>
            <Icon name="close" className="text-black-300 dark:text-gray" size={12} />
          </div>
        </div>
        <OrderTab isBuy={isBuy} setIsBuy={setIsBuy} />

        {activeTab === 'spot' && <Spot coin1={coin1} coin2={coin2} isBuyMobile={isBuy} />}
        {activeTab === 'cross' && <CrossIsolated coin1={coin1} coin2={coin2} isBuyMobile={isBuy} />}
        {activeTab === 'isolated' && <CrossIsolated coin1={coin1} coin2={coin2} isBuyMobile={isBuy} />}
      </Modal>
    </div>
  );
}