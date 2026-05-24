
'use client'

import headerData from "@/data/trade/header.json"
import { TradeTable } from "../trade/table";
import { TradeChartView } from "../trade/chart";
import { OrderBook } from "../trade/order-book";
import { FutureTrades } from "./trades";
import { FutureOrderForm } from "./orderform";
import { FutureAccount } from "./account";
import { useState } from "react";
import { OpenFutures } from "./open-futures";
import { FutureSubHeader } from "./subheader";
import { OrderFormMobile } from "../trade/order-form/mobile";
import { TradeFooter } from "../trade/footer";
import { FutureOrderFormMobile } from "./orderform/mobile";

export const FutureView = ({coins}: {coins: string[]}) => {
  const [coin1, coin2] = coins;
  const activeHeaderData = headerData.find((header) => header.name === `${coin1}/${coin2}`);
  const [clickedOrder, setClickedOrder] = useState(false);

  return (
    <>
      <div className="!pt-[64px] w-full hidden md:grid gap-[1px] grid-template-future bg-white-100 dark:bg-secondary overflow-hidden">

        <div className="bg-white-200 dark:bg-[#161A1E] grid-area-subHeader  md:h-[76px]">
          {activeHeaderData && <FutureSubHeader data={activeHeaderData} coin1={coin1} coin2={coin2} />}
        </div>
        <div className="bg-white-200 dark:bg-[#161A1E] grid-area-orderbook">
          <OrderBook
            type="order-book"
            coin1={coin1}
            coin2={coin2}
            isFuturePage
          />
        </div>
        <div className="relative bg-white-200 dark:bg-[#161A1E] grid-area-chart">
          <TradeChartView
            coin1={coin1}
            coin2={coin2}
            isFuturePage
          />
        </div>
        <div className="bg-white-200 dark:bg-[#161A1E] grid-area-trades">
          <FutureTrades
            coin1={coin1}
            coin2={coin2}
          />
        </div>
        <div className="bg-white dark:bg-black-100 grid-area-orderform">
          {clickedOrder ? <FutureOrderForm coin1={coin1} coin2={coin2} /> : <OpenFutures setClikced={setClickedOrder} />}
        </div>
        <div className="bg-white-200 dark:bg-[#161A1E] grid-area-right">
          <FutureAccount
            coin1={coin1}
            coin2={coin2}
          />
        </div>
        <div className="bg-white-200 dark:bg-[#161A1E] grid-area-basictable">
          <TradeTable coin={coin1} coin2={coin2} />
        </div>

      </div>

      <div className="grid grid-template-mobile w-screen min-h-[930px] h-auto md:hidden">
        <div className=" bg-white-200 dark:bg-[#161A1E] grid-area-header"></div>
        <div className=" bg-white-200 dark:bg-[#161A1E] grid-area-delist"></div>
        <div className=" bg-white-200 dark:bg-background-700 grid-area-switch">
          {activeHeaderData && <FutureSubHeader data={activeHeaderData} coin1={coin1} coin2={coin2} />}
        </div>
        <div className=" bg-white-200 dark:bg-[rgb(27,29,35)] grid-area-charts">
          <TradeChartView
            coin1={coin1}
            coin2={coin2}
            isFuturePage
          />
        </div>
        <div className=" bg-white-200 dark:bg-[#161A1E] grid-area-userinfo pb-4 overflow-hidden relative z-auto w-full ">
          <TradeTable coin={coin1} coin2={coin2} />
        </div>
        <div className=" bg-white dark:bg-black-500 grid-area-orderform fixed bottom-[33px] h-[72px] w-full z-50">
          <FutureOrderFormMobile coin1={coin1} coin2={coin2} />
        </div>
          <footer className="fixed bottom-0 h-[33px] w-full md:h-auto bg-white-200 dark:bg-[#181E25] md:dark:bg-background flex items-center justify-between z-40 pl-4 md:pl-2.5">
            <TradeFooter />
          </footer>
      </div>
    </>
  )
}