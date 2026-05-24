"use client";

import topData from "@/data/markets/trading-data/top-list.json";
import { TopListCard } from "./top-list-card";
import data from "@/data/markets/trading-data/futures-list.json";
import { FuturesChart } from "../futures-chart";
import { CallPutCard } from "./call-put-card";

export const OptionsView = () => {
  return (
    <>
      <div className="px-4 md:px-0 flex flex-col md:flex-row md:flex-wrap gap-[22px] mb-6">
        {topData.map((item: any, index: number) => (
          <div className="md:flex-[0_0_calc(25%-22px)]">
            <TopListCard
              title={item.title}
              col_1={item.col_1}
              col_2={item.col_2}
              data={item.items}
            />
          </div>
        ))}
        <div className="md:flex-[0_0_calc(50%-22px)]">
          <CallPutCard />
        </div>
      </div>
      <div className="px-4 md:px-0 grid grid-cols-1 md:grid-cols-2 gap-[22px]">
        {data.map((item) => (
          <div className="w-full h-full py-4 px-6 border border-[rgb(234,236,239)] dark:border-gray-300 rounded-lg">
            <FuturesChart item={item} layout={2} />
          </div>
        ))}
      </div>
    </>
  );
};
