import { twMerge } from "tailwind-merge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { useSearchParams } from "next/navigation";
import { Icon } from "@/components/ui/icon";
import { OrderFormProps } from "@/views/trade/order-form";
import { FutureOrderTabs } from "./tabs";
import { FutureOrderForm } from ".";
import { OrderFormHeader } from "./header";

export const FutureOrderFormMobile = (props: OrderFormProps)  => {
  const { coin1, coin2 } = props;
  const [isBuy, setIsBuy] = useState(true);
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('type') ?? 'spot';
  const [openSettings, setOpenSettings] = useState(false);

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
        className="bg-white-200 dark:!bg-[rgb(30,35,41)] rounded-b-none p-0 pb-4 bottom-[33px] "
      >
        <div className="flex items-center justify-between border-b border-white-100 dark:border-[rgb(43,49,57)]">
          <OrderFormHeader
            checkedMarginMode
            openSettings={openSettings}
            setOpenSettings={setOpenSettings}
          />
          <div className="cursor-pointer p-4" onClick={() => setOpen(false)}>
            <Icon
              name="close"
              size={20}
            />
          </div>
        </div>
        <FutureOrderForm coin1={coin1} coin2={coin2} />
      </Modal>
    </div>
  );
}