'use client'

import { Icon } from "@/components/ui/icon";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { TradeChart } from "./chart";
import { TradeChartInfo } from "./info";
import { Square } from "./square";
import { TradingData } from "./trading-data";
import { OrderBook } from "../order-book";
import { Trades } from "../trades";
import Link from "next/link";

interface TradeChartViewProps {
  coin1: string;
  coin2: string;
  isFuturePage?: boolean;
}

export const TradeChartView = (props: TradeChartViewProps) => {
  const { coin1, coin2, isFuturePage=false } = props;
  const [openSquare, setOpenSquare] = useState(false);
  const tabs = [
    {
      name: 'Chart',
      isShowDesktop: true,
      isShowMobile: true,
    },
    {
      name: 'Order Book',
      isShowDesktop: false,
      isShowMobile: true
    },
    {
      name: 'Trades',
      isShowDesktop: false,
      isShowMobile: true
    },
    {
      name: 'Info',
      isShowDesktop: true,
      isShowMobile: true
    },
    {
      name: 'Trading Data',
      isShowDesktop: true,
      isShowMobile: true
    }
  ]
  const [selectedTab, setSelectedTab] = useState(tabs[0]?.name);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleTab = (name: string) => {
    setSelectedTab(name);
  }
  return (
    <div className={twMerge(
      "h-full overflow-hidden",
      isFullScreen && 'fixed w-full left-0 top-0 z-[90] bg-white-200 dark:bg-[rgb(27,29,35)]'
      )}>
      <div className="flex items-center justify-between px-4 md:border-b border-b-white-100 dark:border-b-secondary">
        <div className="w-full overflow-auto flex items-start gap-3 md:gap-6">
            {
              tabs?.map((tab) => (tab?.name === 'Trading Data' && !isFuturePage) || (tab?.name !== 'Trading Data') && (
                <div className={twMerge(
                  "flex flex-col items-center justify-center cursor-pointer",
                  (tab?.isShowDesktop && !tab?.isShowMobile) && "hidden md:flex",
                  (tab?.isShowMobile && !tab?.isShowDesktop) && "md:hidden",
                  )} onClick={() => handleTab(tab?.name)}>
                  <div className={twMerge(
                    "text-black-300 dark:text-gray-100 md:dark:text-gray text-sm leading-[38px] md:font-semibold whitespace-nowrap",
                    tab?.name === selectedTab && "text-primary dark:text-primary md:text-black-100 md:dark:text-white-100"
                  )}>
                    {tab?.name}
                  </div>
                  {tab?.name === selectedTab && <div className="hidden md:block mx-auto h-[3px] w-4 bg-primary "></div>}
                </div>
              ))
            }
            {isFuturePage &&
              <Link href="/en/futures/funding-history/perpetual/trading-data?contract=BTCUSDT" target="_blank" className="text-black-300 dark:text-gray-100 md:dark:text-gray text-sm leading-[38px] md:font-semibold whitespace-nowrap" >
                Trading Data
              </Link>
            }
            {!isFuturePage && <div className={twMerge(
              "hidden md:flex flex-col items-center justify-center cursor-pointer",
              )} onClick={() => setOpenSquare(true)}>
              <div className={twMerge(
                "text-black-300 dark:text-gray text-sm leading-[38px] font-semibold",
              )}>
                Square
              </div>
            </div>}
        </div>
        <div className="hidden md:flex items-center gap-4">
          <div className="cursor-pointer" onClick={() => setIsFullScreen(!isFullScreen)}>
            <Icon
              name={isFullScreen ? "mini-screen" : "full-screen"}
              size={16}
              className="text-black-300 dark:text-gray"
            />
          </div>
          {selectedTab === 'Chart' && 
            <div className="cursor-pointer relative group">
              <Icon
                name="chart-menu"
                size={16}
                className="text-black-300 dark:text-gray"
              />
              <div className="w-max absolute top-4 right-0 invisible opacity-0 group-hover:opacity-100 group-hover:visible transition-all duration-200  bg-white dark:bg-black-100 rounded-2xl flex flex-col gap-4 text-xs pt-2.5 pb-4 px-2.5">
                <div className="text-grat-300 dark:text-gray underline decoration-dashed whitespace-nowrap">Multi Chart</div>
                <div className="flex items-center gap-4 text-gray-300 dark:text-gray">
                  1
                  <div className="w-4 h-4 bg-gray-300 dark:bg-gray cursor-pointer hover:dark:bg-white-400" />
                </div>
                <div className="flex items-center gap-4 text-gray-300 dark:text-gray">
                  2
                  <div className="w-4 h-4 bg-gray-300 dark:bg-gray cursor-pointer hover:dark:bg-white-400" />
                  <div className="w-4 h-4 bg-gray-300 dark:bg-gray cursor-pointer hover:dark:bg-white-400" />
                </div>
                <div className="flex items-center gap-4 text-gray-300 dark:text-gray">
                  3
                  <div className="w-4 h-4 bg-gray-300 dark:bg-gray cursor-pointer hover:dark:bg-white-400" />
                  <div className="w-4 h-4 bg-gray-300 dark:bg-gray cursor-pointer hover:dark:bg-white-400" />
                </div>
                <div className="flex items-center gap-4 text-gray-300 dark:text-gray">
                  4
                  <div className="w-4 h-4 bg-gray-300 dark:bg-gray cursor-pointer hover:dark:bg-white-400" />
                  <div className="w-4 h-4 bg-gray-300 dark:bg-gray cursor-pointer hover:dark:bg-white-400" />
                </div>
              </div>
            </div>
          }
        </div>
      </div>
      {selectedTab === 'Chart' && <TradeChart isFullScreen={isFullScreen} isFuturePage={isFuturePage} />}
      {selectedTab === 'Info' && <TradeChartInfo coin={coin1} />}
      {selectedTab === 'Trading Data' && <TradingData coin1={coin1} coin2={coin2} />}
      {selectedTab === 'Order Book' && <OrderBook type="order-book" coin1={coin1} coin2={coin2} isFuturePage={isFuturePage} />}
      {selectedTab === 'Trades' && <Trades coin1={coin1} coin2={coin2} />}
      {(openSquare && !isFuturePage) && <Square isOpen={openSquare} setIsOpen={setOpenSquare} />}
    </div>
  )
}