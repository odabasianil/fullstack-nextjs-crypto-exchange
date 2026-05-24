'use client'

import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { GridItem } from "./grid-item";

const tabs = [
  {
    text: 'Top ROI',
    value: 'top_roi',
  },
  {
    text: 'Top PNL',
    value: 'top_pnl',
  },
  {
    text: 'Top Copied',
    value: 'top_copied',
  },
  {
    text: 'Most Matched',
    value: 'most_matched',
  },
]

export const PopularTab = (props: any) => {
  const { setActiveTab, coin1, coin2 } = props;
  const [subActiveTab, setSubActiveTab] = useState(tabs[0].value);
  const [tooltipTarget, setTooltipTarget] = useState<HTMLElement | null>(null);


  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-1 flex-wrap">
          {
            tabs.map((tab) => (
              <div

                onClick={() => setSubActiveTab(tab.value)}
                className={twMerge(
                  'cursor-pointer text-xs text-gray-300 dark:text-gray font-medium px-1 rounded-sm',
                  tab.value === subActiveTab && 'bg-white-100 dark:bg-gray-300 text-black-100 dark:text-white-100'
                )}
              >
                {tab.text}
              </div>
            ))
          }
        </div>
        {/* <div className="text-xs text-primary-100 font-semibold cursor-pointer">View More Grids</div> */}
      </div>
      <div className="w-full flex flex-wrap gap-2.5 max-h-[215px] overflow-y-auto pb-[31px]">
        {
          new Array(15).fill(null).map((idx: number) => (
            <GridItem
              subActiveTab={subActiveTab}
              setActiveTab={setActiveTab}
              tooltipTarget={tooltipTarget}
              setTooltipTarget={setTooltipTarget}
              coin1={coin1}
              coin2={coin2}
            />
          ))
        }
      </div>
    </>
  )
}



