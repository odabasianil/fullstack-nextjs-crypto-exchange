'use client';

import { useState } from "react";
import { LimitForm } from "../../../components/forms/limit-form";
import { FormTabs } from "./form-tabs";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { MarketForm } from "@/components/forms/market-form";
import { StopLimitForm } from "@/components/forms/stop-limit-form";
import { TraillingStopForm } from "@/components/forms/trailling-stop-form";
import { OcoForm } from "@/components/forms/oco-form";
import { twMerge } from "tailwind-merge";
import { FormType } from "./form-type";

export const CrossIsolated = (props: {coin1: string; coin2: string; isBuyMobile?: boolean}) => {
  const {coin1, coin2, isBuyMobile=false } = props;
  const [selectedTab, setSelectedTab] = useState('Limit');
  const types = ['Normal', 'Borrow', 'Repay'];
  const [buyType, setBuyType] = useState(types[0]);
  const [sellType, setSellType] = useState(types[0]);

  return (
    <div className="md:p-4 md:pt-3">
      <div className="flex items-center justify-between">
        <FormTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        <div className="hidden md:flex items-center gap-4 text-xs justify-end">
          <Link href="/savings/auto-invest" className="flex items-center gap-0.5">
            <Icon 
              name="invest"
              size={16}
              className="text-gray-300 dark:text-gray"
            />
            <div className="hover:text-gray-300 hover:dark:text-gray">Auto Invest</div>
          </Link>
          <Link href="/" className="flex items-center gap-0.5">
            <Icon 
              name="buy-brl"
              size={16}
              className="text-gray-300 dark:text-gray"
            />
            <div className="hover:text-gray-300 hover:dark:text-gray">Buy with BRL</div>
          </Link>
        </div>
      </div>
      <div className="flex">
        <div className={twMerge(
          "md:pr-8 flex-1",
          !isBuyMobile && "hidden md:block flex-1"
        )}>
          <FormType
            types={types}
            type={buyType}
            setType={setBuyType}
          />
          {selectedTab.toLowerCase() === 'limit' && <LimitForm coin1={coin1} coin2={coin2} isBuy={true} type={buyType} />}
          {selectedTab.toLowerCase() === 'market' && <MarketForm coin1={coin1} coin2={coin2} isBuy={true} type={buyType} />}
          {selectedTab.toLowerCase() === 'stop limit' && <StopLimitForm coin1={coin1} coin2={coin2} isBuy={true} type={buyType} />}
          {selectedTab.toLowerCase() === 'trailling stop' && <TraillingStopForm coin1={coin1} coin2={coin2} isBuy={true} type={buyType} />}
          {selectedTab.toLowerCase() === 'oco' && <OcoForm coin1={coin1} coin2={coin2} isBuy={true} type={buyType} />}
        </div>
        <div className={twMerge(
          "flex-1",
          isBuyMobile && "hidden md:block flex-1"
        )}>
          <FormType
            types={types}
            type={sellType}
            setType={setSellType}
          />
          {selectedTab.toLowerCase() === 'limit' && <LimitForm coin1={coin1} coin2={coin2} isBuy={false} type={sellType} />}
          {selectedTab.toLowerCase() === 'market' && <MarketForm coin1={coin1} coin2={coin2} isBuy={false} type={sellType} />}
          {selectedTab.toLowerCase() === 'stop limit' && <StopLimitForm coin1={coin1} coin2={coin2} isBuy={false} type={sellType} />}
          {selectedTab.toLowerCase() === 'trailling stop' && <TraillingStopForm coin1={coin1} coin2={coin2} isBuy={false} type={sellType} />}
          {selectedTab.toLowerCase() === 'oco' && <OcoForm coin1={coin1} coin2={coin2} isBuy={false} type={sellType} />}
        </div>
      </div>
    </div>
  )
}
