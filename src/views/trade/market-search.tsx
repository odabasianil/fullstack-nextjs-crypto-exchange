'use client'

import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import top10Data from "@/data/trade/market-top-10.json";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface MarketSearchProps {
  value: string;
  setValue: (value: string) => void;
  setFilteredData: (filteredData: any[]) => void;
  items: any;
}

export const MarketSearch = (props: MarketSearchProps) => {
  const { value, setValue, setFilteredData, items } = props;
  const [isVisibleCancel, setIsVisibleCancel] = useState(false);
  const [tradeHistory, setTradeHistory] = useState<any[]>([]);

  const handleCancel = () => {
    value.length < 1 ? setIsVisibleCancel(true) : setIsVisibleCancel(false);
  }

  const handleChange = (e: any) => {
    setValue(e.target.value);
    if (e.target.value.length < 1) {
      setIsVisibleCancel(true);
    } else {
      setIsVisibleCancel(false);
    }
    const filteredData = items.filter((item: any) => item?.pair?.toLocaleUpperCase()?.includes(e.target.value?.toLocaleUpperCase()));
    setFilteredData(filteredData);
  }

  const handleClick = (item: any) => {
    const newTradeHistory = tradeHistory?.filter((history: any) => history?.pair !== item?.pair);
    newTradeHistory?.unshift(item);
    setTradeHistory(newTradeHistory);
    localStorage.setItem('tradeHistory', JSON.stringify(newTradeHistory));
  }

  const clearHistory = () => {
    setTradeHistory([]);
    localStorage.removeItem('tradeHistory');
  }

  useEffect(() => {
    if (localStorage.getItem('tradeHistory')) {
      setTradeHistory(JSON.parse(localStorage.getItem('tradeHistory') ?? '[]'));
    }
  }, [])

  return (
    <>
      <div className="group px-4 pt-3 w-full flex items-center justify-between">
        <Input
          type="text"
          placeholder="Search"
          value={value}
          onChange={handleChange}
          onFocus={handleCancel}
          label={
            <>
              <Icon
                name="search"
                size={16}
                color="transparent"
                className="dark:hidden text-black-200 "
              />
              <Icon
                name="search"
                size={16}
                className="hidden dark:block text-gray-200"
              /></>
          }
          wrapperClassName="w-full"
          className="pl-10 text-sm h-10 hover:border-primary focus:border-primary w-full placeholder:font-semibold"
          isClearable
          clearIconSize={16}
        />
        {isVisibleCancel && <div onClick={() => setIsVisibleCancel(false)} className="cursor-pointer text-primary text-sm ml-4">Cancel</div>}
      </div>
      {
        (isVisibleCancel) && (
          <div className="absolute top-[107px] md:top-14 left-0 w-full h-[calc(100%-56px)] bg-white-200 dark:bg-black-100 md:dark:bg-background-700 z-10 px-4 pt-2">
            {tradeHistory?.length > 0 && <>
              <div className="flex items-center justify-between text-sm leading-[22px]">
                <div>Search History</div>
                <div className="cursor-pointer" onClick={clearHistory}>
                  <Icon name="trash" size={16} className="text-black-300 dark:text-gray" />
                </div>
              </div>
              <div className="mt-2 flex items-center gap-2">
                {tradeHistory?.map((item: any) => (
                  <div className="bg-white-300 dark:bg-secondary rounded-md px-2.5 flex items-center text-sm leading-[22px] cursor-pointer">
                    <span>{item?.pair}</span>
                    <span className="text-xs text-black-300 dark:text-gray px-1 h-4 flex items-center rounded-sm bg-transparent">{item?.multiple}</span>
                  </div>
                ))}
              </div>
            </>}
            <div className={twMerge(
              "mt-4 mb-2 flex items-center justify-start text-sm leading-[22px]",
              tradeHistory?.length < 1 && "mt-2"
            )}>
              <div>Top Search</div>
            </div>
            {
              top10Data?.map((item, index) => (
                <Link onClick={() => handleClick(item)} href={`/trade/${item?.pair?.replace('/', '_')}`} className="flex items-start flex-1 h-6 text-xs cursor-pointer hover:bg-background">
                  <div className="flex flex-nowrap items-center flex-[5_1_0px] min-w-[120px] pt-1">
                    <Icon
                      name="star"
                      size={16}
                      className="text-black-300 dark:text-gray"
                    />
                    <span className={twMerge(
                      "ml-1 text-black-300 dark:text-gray",
                      index === 0 && "!text-[#FF693D]",
                      index === 1 && "!text-[#D0980B]",
                      index === 2 && "!text-[#F0B90B]",
                    )}>{index + 1}</span>
                    <span className="ml-2">{item?.pair}</span>
                    <span className="px-1 h-4 ml-1 rounded-sm bg-white-300 dark:bg-secondary text-xs">{item?.multiple}</span>
                  </div>
                  <div className="flex items-cneter justify-center pt-[3px] gap-2">
                    <div className="max-w-[60px] lg:max-w-[120px]">{item?.last_price}</div>
                    <div className={twMerge(
                      "min-w-[60px] text-right",
                      item?.change?.includes("-") ? "text-error" : "text-success-100"
                      )}>{item?.change}</div>
                  </div>
                </Link>
              ))
            }
          </div>
        )
      }
    </>
  )
}