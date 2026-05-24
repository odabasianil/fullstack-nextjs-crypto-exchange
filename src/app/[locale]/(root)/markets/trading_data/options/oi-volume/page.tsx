'use client'

import { VolumeChart } from "@/views/markets/trading-data/options/volume-chart";
import Image from "next/image";
import { useState } from "react";
import data from '@/data/markets/trading-data/futures-list.json';
import { FuturesChart } from "@/views/markets/trading-data/futures-chart";


export default function Page() {

  return (
    <>
      <div className="px-4 md:px-0 w-full flex flex-col gap-[22px]">
        <VolumeChart
          title="Options Volume"
          col_1="Call Open Interest"
          val_1="21,434.75 Cont"
          col_2="Put Open Interest"
          val_2="10,182.89 Cont"
          col_3="Put/Call Ratio"
          val_3="0.47"
          col_4="Total Open Interest"
          val_4="31,617.64 Cont"
        />
        <div className="flex flex-col md:flex-row gap-[22px] w-full h-full">
          <div className="py-4 px-6 border border-[rgb(234,236,239)] dark:border-gray-300 rounded-lg">
            <FuturesChart
              item={data[0]}
              layout={2}
            />
          </div>
          <div className="py-4 px-6 border border-[rgb(234,236,239)] dark:border-gray-300 rounded-lg">
            <FuturesChart
              item={data[1]}
              layout={2}
            />
          </div>
        </div>
        <VolumeChart
          title="24hr Volume by Strike Price"
          col_1="Call Volume"
          val_1="1,894.10 Cont"
          col_2="Put Volume"
          val_2="1,802.18 Cont"
          col_3="Put/Call Ratio"
          val_3="0.47"
          col_4="Total Volume"
          val_4="3,618.24 Cont"
        />
        <div className="flex flex-col md:flex-row gap-[22px] w-full h-full">
          <div className="py-4 px-6 border border-[rgb(234,236,239)] dark:border-gray-300 rounded-lg">
            <FuturesChart
              item={data[0]}
              layout={2}
            />
          </div>
          <div className="py-4 px-6 border border-[rgb(234,236,239)] dark:border-gray-300 rounded-lg">
            <FuturesChart
              item={data[1]}
              layout={2}
            />
          </div>
        </div>
      </div>
    </>
  )
}