import { Icon } from "@/components/ui/icon";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Investment } from "./investment";
import Link from "next/link";
import { HelpText } from "@/components/ui/help-text";

export const AiTab = (props: {setActiveTab: any; coin1: string; coin2: string}) => {
  const { setActiveTab, coin1, coin2 } = props;
  const [timePeriod, setTimePeriod] = useState('3D');


  return (
    <div className="flex w-full justify-between">
      <div className="w-[calc(50%-20px)] block">
        <div className="flex items-center gap-0.5 mb-3">
          <div className="font-semibold text-sm">1. Parameters</div>
          <div className="group relative">
            <Icon
              name="info"
              size={16}
              className="text-black-300 dark:text-gray cursor-help"
            />
            <HelpText>
              Recommended parameters are automatically generated based on technical analysis of the symbol price. 
            </HelpText>
            
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="relative group text-xs text-gray-300 dark:text-gray underline decoration-dashed cursor-help">
              Time Period
              <HelpText>
                You will be advised on different Recommended Parameters based on the duration of the strategy. Your Recommended Parameters will vary depending on what time period you select.
              </HelpText>
            </div>
            <div className="flex items-center gap-1.5">
              {
                ['3D', '7D', '30D', '180D'].map((period) => (
                  <div
                    onClick={() => setTimePeriod(period)}
                    className={twMerge(
                      'cursor-pointer text-xs text-gray-300 dark:text-gray font-semibold py-1 px-1.5 rounded',
                      period === timePeriod && 'bg-white-100 dark:bg-gray-300 text-black-100 dark:text-white-100'
                    )}
                  >
                    {period}
                  </div>
                ))
              }
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-300 dark:text-gray">Price Range</div>
            <div className="text-xs">52204.16 - 76214.97 {coin2}</div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-300 dark:text-gray">Grid Number</div>
            <div className="text-xs">60</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-300 dark:text-gray relative group underline decoration-dashed cursor-help">
              Profit/grid(fees deducted)

              <HelpText isVisibleArrow={false}>
                Profit/Grid is an estimated amount and for reference only.
              </HelpText>
            </div>
            <div className="text-xs">0.32% - 0.56%</div>
          </div>
          <div onClick={() => setActiveTab('manual')} className="cursor-pointer text-xs text-gray-300 dark:text-gray flex gap-1 items-center">
            <div>Copy parameters to Manual settings</div>
            <Icon
              name="chevron-left"
              className="rotate-180"
              size={16}
            />
          </div>
        </div>
      </div>


      <div className="w-[calc(50%-20px)] block">
        <Investment
          coin1={coin1}
          coin2={coin2}
        />
      </div>
    </div>
  )
}