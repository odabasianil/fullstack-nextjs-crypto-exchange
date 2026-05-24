import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { tabs } from ".";
import Link from "next/link";
import { Calculator } from "@/views/calculator";
import Image from "next/image";
import { useRouter } from "next/navigation";


type OrderFormTabsProps = {
  coin1: string;
  coin2: string;
  activeTab: string;
}

export const OrderFormTabs = ({ coin1, coin2, activeTab }: OrderFormTabsProps) => {
  const [openFeePopup, setOpenFeePopup] = useState(false);
  const popupRef = useRef(null);
  const router = useRouter();

  const handleTab = (name: string) => {
    router.push(`?type=${name}`);
  }

  const handleClickFee = () => {
    setOpenFeePopup(!openFeePopup);
  }

  const handleClickOutside = (event: any) => {
    if (popupRef.current && !(popupRef.current as any).contains(event.target)) {
      setOpenFeePopup(false);
    }
  };
  
  
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
    <div className="w-full h-[42px] flex  justify-between whitespace-nowrap border-b border-white-300 dark:border-secondary">
        <div className="flex gap-6 px-4">
          {
            tabs.map((tab) => (
              <div
                onClick={() => handleTab(tab.value)}
                className={
                  twMerge(
                    "relative cursor-pointer text-sm font-semibold flex items-center justify-center border-white-300 dark:border-secondary",
                    activeTab === tab.value ? "text-dark-100 dark:text-white-100" : "text-gray-300 dark:text-gray",
                    tab.value === 'grid' && 'hidden md:flex'
                  )}
              >
                {tab.text}
                {activeTab === tab.value && <div className="w-4 h-[3px] bg-primary absolute bottom-0"></div>}
              </div>
            ))
          }
        </div>
        <div className="hidden md:flex items-center gap-0">
          <div className="relative flex justify-start items-center" >
            <span onClick={handleClickFee} className="cursor-pointer underline decoration-dashed text-xs w-[80px] text-black-300 dark:text-gray text-left">Fee Level</span>
            {
              openFeePopup &&
              <div ref={popupRef} className={twMerge(
                "absolute top-8 right-0 w-[312px] bg-white dark:bg-black-100 rounded-xl p-4",
                "z-50 shadow-lg"
              )}>
                <Link
                  href="/trade/fee-level"
                  className="font-semibold flex items-center gap-1 text-sm pb-4 border-b border-b-white-300 dark:border-b-secondary"
                >
                  Your Trading Fee Level
                  <span className="text-primary">Regular User</span>
                </Link>
                <div className="pt-4">
                  <div className="text-sm mb-1">{coin1}/{coin2}</div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-gray-300 dark:text-gray text-xs flex flex-wrap gap-1">
                      Using BNB for fees
                      <Link
                        href="/en/support/faq/how-to-use-bnb-to-pay-for-fees-and-earn-25-discount-115000583311?hl=en"
                        className="text-primary hover:text-primary-100 "
                      >
                        25% discount
                      </Link>
                      No BNB available
                    </div>
                    sd
                  </div>
                  <div className="flex items-start justify-start">
                    <div className="w-1/2">
                      <div className="flex items-end gap-0.5">
                        <div className="text-sm">0.075%</div>
                        <div className="text-xs text-gray-300 dark:text-gray line-through pb-[1px]">0.01%</div>
                      </div>
                      <div className="text-xs text-gray-300 dark:text-gray">Taker</div>
                    </div>
                    <div className="w-1/2">
                      <div className="flex items-end gap-0.5">
                        <div className="text-sm">0.075%</div>
                        <div className="text-xs text-gray-300 dark:text-gray line-through pb-[1px]">0.01%</div>
                      </div>
                      <div className="text-xs text-gray-300 dark:text-gray">Taker</div>
                    </div>
                  </div>
                  <div className="py-2 px-3 mt-3 border rounded-xl flex items-center justify-between border-primary border-opacity-[0.3] bg-[#FCD5350D]">
                    <Link href='/' className="text-xs max-w-[214px] whitespace-normal">Invite Friends and Unlock Fee-Free Trading!</Link>
                    <Image src="/images/feelevel.png" alt="Fee Level" width={40} height={40} />
                  </div>
                </div>
              </div>
            }
          </div>
          <Calculator />
        </div>
      </div>
    </>
  );
}