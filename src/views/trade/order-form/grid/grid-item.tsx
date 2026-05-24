import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import InfoTooltip from "@/components/ui/info-tooltip";
import Image from "next/image";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

type GridItemProps = {
  subActiveTab: string;
  setActiveTab: any;
  coin1: string;
  coin2: string;
  tooltipTarget: HTMLElement | null;
  setTooltipTarget: any;
};

export const GridItem = (props: GridItemProps) => {
  const {
    subActiveTab,
    setActiveTab,
    tooltipTarget,
    setTooltipTarget,
    coin1,
    coin2
  } = props;

  const handleMouseEnter = (target: HTMLElement) => {
    setTooltipTarget(target);
  };

  const handleMouseLeave = () => {
    setTooltipTarget(null);
  };

  return (
    <>
      <div
        onClick={() => setActiveTab('manual')}
        onMouseEnter={(e: any) =>
          handleMouseEnter(e.currentTarget)
        }
        onMouseLeave={handleMouseLeave}
        className="relative group flex cursor-pointer gap-1.5 rounded-lg p-3 flex-col h-[204px] w-[calc(33%-6px)] bg-white dark:bg-black-100 border-[0.6px] border-white-300 dark:border-gray-200 hover:!border-primary"
      >
        <div className="flex justify-between items-start flex-1">
          <div className="text-sm font-medium">{coin1}/{coin2}</div>
          <div className="flex items-center gap-0.5 text-gray-300 dark:text-gray text-xs">
            <Icon
              name="users"
              size={16}
              className="text-gray-300 dark:text-gray"
            />
            <div>6</div>
          </div>
        </div>
        <div className="flex justify-between flex-1">
          <div>
            <div className="text-xs text-gray-300 dark:text-gray-200">{subActiveTab !== 'top_pnl' ? 'ROI' : `PNL (${coin2})`}</div>
            <div className={twMerge(
              'text-xl font-semibold text-success-100'
            )}>
              $10,273.75
            </div>
          </div>
          <div>
            <Image
              width={108}
              height={40}
              src="/images/trade/dark/upgrade.png"
              alt="ROI"
              className="hidden dark:block"
            />
            <Image
              width={108}
              height={40}
              src="/images/trade/upgrade.png"
              alt="ROI"
              className="dark:hidden"
            />
          </div>
        </div>
        <div className="flex justify-between text-xs">
          <div>
            <div className="text-gray-300 dark:text-gray-200">{subActiveTab !== 'top_pnl' ? `PNL (${coin2})` : 'ROI'}</div>
            <div>$190.62</div>
          </div>
          <div>
            <div className="text-gray-300 dark:text-gray-200">Runtime</div>
            <div>5d 18h 49m</div>
          </div>
          <div>
            <div className="text-gray-300 dark:text-gray-200">Min. Investment</div>
            <div>333.97 {coin2}</div>
          </div>
        </div>
        <div className="flex justify-between items-end flex-1">
          <div className="text-xs">
            <div className="text-gray-300 dark:text-gray-200">24H/Total Matched Trades</div>
            <div>4/46</div>
          </div>
          <Button
            className="h-8 rounded text-xs !border-none"
          >
            Copy
          </Button>
        </div>
        <InfoTooltip
          text={'<div><div class="flex items-center justify-between"><div>Upper Price</div><div>71127.08</div></div><div class="flex items-center justify-between"><div>Lower Price</div><div>24561.43</div></div><div class="flex items-center justify-between"><div>Grid Number</div><div>10</div></div><div class="flex items-center justify-between"><div>Profit/Grid</div><div>%1.24 - %1.46</div></div></div>'}
          targetRef={{ current: tooltipTarget }}
          visible={true}
          className="bg-gray-600 w-[204px] py-2 px-3 rounded-xl"
          arrowClass="bg-gray-600"
        />

      </div>
    </>
  )

}