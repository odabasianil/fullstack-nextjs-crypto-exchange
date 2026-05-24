'use client'

import Select from "@/components/ui/select";
import Image from "next/image"
import { useState } from "react";
import { twMerge } from "tailwind-merge";

interface TradingDataChartProps {
  coin1?: string;
  title: string;
  image?: string;
  description?: string;
  infoText?: string;
  options?: any;
  tabs?: string[];
  showLegend?: boolean;
}

const legendData = [
  {
    name: 'Large',
    buy: '213.2956',
    sell: '171.3666',
    inflow: '41.9290'
  },
  {
    name: 'Medium',
    buy: '213.2956',
    sell: '171.3666',
    inflow: '41.9290'
  },
  {
    name: 'Small',
    buy: '213.2956',
    sell: '171.3666',
    inflow: '41.9290'
  }
]

export const TradingDataChart = (props: TradingDataChartProps) => {
  const { coin1, title, image="line-chart", description, options, infoText, tabs, showLegend } = props
  const [selectedTab, setSelectedTab] = useState(tabs?.[0] ?? '');
  const [selectOption, setSelectOption] = useState(options?.[0] ?? '');
  const handleTab = (name: string) => {
    setSelectedTab(name);
  }

  const totalBuy = legendData?.reduce((acc, data) => acc + parseFloat(data?.buy), 0);
  const totalSell = legendData?.reduce((acc, data) => acc + parseFloat(data?.sell), 0);
  const totalInflow = legendData?.reduce((acc, data) => acc + parseFloat(data?.inflow), 0);

  return (
    <>
      <div>
        <div className="font-semibold text-sm leading-[22px] flex items-center gap-1">
          {title}
          {infoText && <span>i</span>}
        </div>
        {description && <div className="my-2 text-xs">{description}</div>}
        {(tabs || options) && 
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            {
              tabs?.map((tab: any) => (
                <div onClick={() => handleTab(tab)} className={twMerge(
                  "py-[3px] px-2 text-xs font-medium rounded-md cursor-pointer",
                  tab === selectedTab ? 'bg-white-300 dark:bg-secondary text-black-200 dark:text-white-100' : 'text-black-300 dark:text-gray'
                )}>{tab}</div>
              ))
            }
            </div>
            {options && 
                <Select
                  options={options}
                  value={selectOption}
                  setValue={setSelectOption}
                  className="h-6"
                  wrapperClassName="!border-none w-[70px] ml-auto bg-secondary justify-end"
                  valueClass="!pr-0 text-black-100 dark:text-white-100 text-xs"
                />
            }
          </div>
          }
        <Image
          src={`/images/trade/${image}.png`}
          alt='Trading Chart'
          width={400}
          height={200}
          className={twMerge('block dark:hidden', (!tabs && !description && !options) && 'mt-8')}
        />
        <Image
          src={`/images/trade/dark/${image}.png`}
          alt='Trading Chart'
          width={400}
          height={200}
          className={twMerge('hidden dark:block', (!tabs && !description && !options) && 'mt-8')}
        />
      </div>
      {showLegend && <div className="flex items-end w-full h-full">
        <div className="w-full border border-white-100 dark:border-secondary rounded-[12px] p-3">
          <div className="flex items-center mb-3 text-xs">
            <div className="w-[26%]">Orders</div>
            <div className="w-[26%]">Buy({coin1})</div>
            <div className="w-[26%]">Sell({coin1})</div>
            <div className="w-[26%] flex justify-end">Inflow</div>
          </div>
          {
            legendData?.map((data: any) => (
              <div className="flex items-center mb-3 text-xs">
                <div className="w-[26%]">{data?.name}</div>
                <div className="w-[26%] flex items-center gap-1">
                  <div className="w-2 h-2 rounded-sm bg-success" />
                  {data?.buy}
                </div>
                <div className="w-[26%] flex items-center gap-1">
                  <div className="w-2 h-2 rounded-sm bg-error" />
                  {data?.sell}
                </div>
                <div className="w-[26%] flex justify-end">{data?.inflow}</div>
              </div>
            ))
          }
          <div className="flex items-center mb-3 text-xs">
            <div className="w-[26%]">Total</div>
            <div className="w-[26%] text-center pr-2">{totalBuy}</div>
            <div className="w-[26%] text-center pr-2">{totalSell}</div>
            <div className="w-[26%] flex justify-end">{totalInflow}</div>
          </div>
        </div>
      </div>}
    </>
  )
}