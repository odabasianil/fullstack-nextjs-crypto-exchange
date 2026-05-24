import { Icon } from "@/components/ui/icon";
import React, { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { PaymentModal } from "./payment-modal";


interface PayWithProps {
  paymentMethod: [string, string];
  paymentMethods: {
    category: string;
    options: {
      name: string;
      price: string;
      icon: string;
      warningIcon?: string;
    }[];
  }[];
}

const PayWith: React.FC<PayWithProps> = ({ paymentMethod, paymentMethods }) => {
  const [text, image] = paymentMethod;
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="dark:text-white-100 font-medium text-sm mb-4"  onClick={() => setOpen(true)}>
        <div className="leading-[22px]">Pay With</div>
        <div className="flex h-[88px] border border-white-100 p-4 dark:border-secondary rounded-[10px] cursor-pointer items-center justify-center flex-col relative mt-1">
          <div className="flex w-full justify-between items-center">
            {image ? (
              <Icon name={image} size={24} className="mr-3" />
            ) : (
              <div className="bg-blue w-[3px] h-2.5 rounded-[2px] mr-3"></div>
            )}

            <div className="text-left flex-1 ">
              <div className="text-base text-black-300 font-semibold leading-6">
                {text}
              </div>
            </div>
            <Icon
              name="chevron-left"
              size={20}
              className="!text-gray hover:!text-white-100 transform rotate-180 mt-[3px]"
            />
          </div>
        </div>
      </div>
      <PaymentModal open={open} setOpen={setOpen} paymentMethods={paymentMethods} />
    </>
  );
};

export default PayWith;
