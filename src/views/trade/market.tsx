'use client'

import data from "@/data/trade/market.json"
import { MarketSearch } from "./market-search"
import { useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Icon } from "@/components/ui/icon";
import Link from "next/link";
import { NoResult } from "../crypto/payment/no-result";

export const TradeMarket = () => {
  const [value, setValue] = useState('');
  const tabs = data.map((tab) => tab.symbol);
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const items = data?.map((item: any) => item.items).flat();
  const [filteredData, setFilteredData] = useState(items);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection && setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn && setSortColumn(column);
      setSortDirection  && setSortDirection('asc');
    }
  };

  const selectedData = useMemo(() => {
    if (value.length > 0) {
      return ({
        items: filteredData
      })
  }
    return data.find((tab) => tab.symbol === selectedTab);
  }, [selectedTab, filteredData]);

  const handleTab = (tab: string) => {
    setSelectedTab(tab);
  }

  const sortedData = useMemo(() => {
    let sortedData = selectedData as any;

    if (sortColumn) {
      sortedData?.items?.sort((a: any, b: any) => {
        let aValue = a[sortColumn];
        let bValue = b[sortColumn];

        if (sortColumn === 'pair') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        } else if (sortColumn === 'last_price' || sortColumn === 'vol') {
          aValue = parseFloat(aValue.replace(/[^0-9.-]+/g, ''));
          bValue = parseFloat(bValue.replace(/[^0-9.-]+/g, ''));
        }

        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return sortedData;
  }, [selectedData, sortColumn, sortDirection]);

  return (
    <>
      <MarketSearch value={value} setValue={setValue} setFilteredData={setFilteredData} items={items} />
      <div className="guide-first-step px-4 w-full overflow-auto flex items-start gap-4">
        <div className="pt-2 flex flex-col items-center mt-[3px] justify-center cursor-pointer" onClick={() => handleTab('favorites')}>
          <Icon
            name="star"
            size={16}
            className={twMerge("mb-[5px] ",'favorites' === selectedTab ? "text-black-100 dark:text-white-100" :"text-black-300 dark:text-gray")}
          />
          {'favorites' === selectedTab && <div className="mx-auto h-[3px] w-4 bg-primary "></div>}
        </div>
        {
          tabs?.map((tab) => (
            <div className="flex flex-col items-center justify-center cursor-pointer" onClick={() => handleTab(tab)}>
              <div className={twMerge(
                "text-black-300 dark:text-gray text-sm leading-[22px] font-semibold pt-2 pb-[5px]",
                tab === selectedTab && "text-dark-100 dark:text-white-100"
              )}>
                {tab}
              </div>
              {tab === selectedTab && <div className="mx-auto h-[3px] w-4 bg-primary "></div>}
            </div>
          ))
        }
      </div>
      <div className="px-4 mt-2 mb-2 text-xs flex items-center text-black-300 dark:text-gray">
        <div className="min-w-[120px] flex flex-[5_1_0px] flex-nowrap cursor-pointer" onClick={() => handleSort('pair')}>
          Pair
          <Icon
            name="sort-icon"
            size={16}
            className="text-black-300 dark:text-gray"
          />
        </div>
        <div className="min-w-[calc(100%-110px)] flex items-center justify-end flex-[3_1_0px] flex-nowrap">
          <div className="cursor-pointer flex" onClick={() => handleSort('last_price')}>
            <div className="max-w-full">Last Price</div>
            <Icon
              name="sort-icon"
              size={16}
              className="text-black-300 dark:text-gray"
            />
          </div>
          <div className="mx-1">/</div>
          <div className="max-w-full flex items-center cursor-pointer" onClick={() => handleSort('vol')}>
            Vol
            <Icon
              name="sort-icon"
              size={16}
              className="text-black-300 dark:text-gray"
            />
            <Icon
              name="loop"
              size={16}
              className="text-black-300 dark:text-gray"
            />
          </div>
        </div>

      </div>
      <div className="w-full h-[285px] overflow-auto md:pr-4">
        {
          (sortedData && sortedData?.items?.length > 0) ? sortedData?.items?.map((item: any) => (
            <Link href={`/trade/${item?.pair?.replace('/', '_')}`} className="group px-4 flex items-start flex-1 h-6 text-xs cursor-pointer hover:bg-white-400 hover:dark:bg-background">
              <div className="flex flex-nowrap items-center flex-[5_1_0px] min-w-[120px] pt-1">
                <Icon
                  name="star"
                  size={16}
                  className="text-black-300 dark:text-gray"
                />
                <span className="ml-1">{item?.pair}</span>
                <span className="px-1 h-4 ml-1 rounded-sm bg-white-300 dark:bg-secondary text-xs">{item?.multiple}</span>
              </div>
              <div className="flex items-cneter justify-center pt-[3px] gap-2">
                <div className="max-w-[60px] lg:max-w-[120px]">{item?.last_price}</div>
                <div className="min-w-[60px] text-right text-black-300 dark:text-gray">{item?.vol}</div>
              </div>
              <div className={twMerge(
                "hidden group-hover:block py-2 px-3 rounded-lg h-fit w-max",
                "z-30 absolute right-full opacity-[.95] text-sm leading-4",
                "bg-black-200 dark:bg-white-100 text-white-100 dark:text-background-200",
                )}>
                  <div className="absolute -right-1 top-1/2 -translate-y-1/2 bg-black-200 dark:bg-white-100 -rotate-45 w-2 h-2"></div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm">${item?.last_price}</div>
                    <Link href={`/trade/${item?.pair?.replace('/', '_')}`} target="_blank">
                      <Icon name="link" size={16} className="text-gray-300 dark:text-gray" />
                    </Link>
                  </div>
              </div>
            </Link>
          )) :
          <div className="flex items-center justify-center h-full">
            <NoResult
              width={64}
              height={64}
              text="No Data"
            />
          </div>
        }
      </div>
    </>
  )
}