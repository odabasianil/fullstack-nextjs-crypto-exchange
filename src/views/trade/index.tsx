'use client'

import headerData from "@/data/trade/header.json"
import { Trades } from "./trades";
import { TradeMarket } from "./market";
import { TradeChartView } from "./chart";
import { OrderForm } from "./order-form";
import Joyride, { Step } from 'react-joyride';
import { useState } from "react";
import { GuideTooltip } from "@/components/ui/guide-tooltip";
import { MarketActivity } from "./market-activity";
import { TradeHeader } from "../crypto/payment/trade-header";
import { TradeTable } from "./table";
import { OrderFormMobile } from "./order-form/mobile";
import { TradeFooter } from "./footer";
import { OrderBook } from "./order-book";


interface TradeViewProps {
  coins: string[];
}

const steps: Step[] = [
  {
    target: '.guide-first-step',
    title: 'Select coin piar',
    content: 'Choose a specific coin pair and check the last price.',
    disableBeacon: true,
    placement: 'left',
    offset: 0,
  },
  {
    target: '.guide-second-step',
    title: 'View orders and funds',
    content: 'You can view open orders, order history, trade history and funds here.',
    disableBeacon: true,
    placement: 'top',
  },
  {
    target: '.guide-third-step',
    title: 'Place your order',
    content: 'Try market order for quick buying and selling at the best price. Learn More',
    disableBeacon: true,
    placement: 'bottom',
    offset: 170,
    
  },
  
];



export const TradeView = ({coins}: TradeViewProps) => {
  const [activeRun, setActiveRun] = useState(false);
  const [isLongMarket, setIsLongMarket] = useState(false);
  const coin1 = coins[0];
  const coin2 = coins[1];
  const activeHeaderData = headerData.find((header) => header.name === `${coin1}/${coin2}`);

  return (
    <>
      <div className="hidden md:grid grid-cols-[1fr_minmax(253px,320px)_minmax(510px,880px)_minmax(253px,320px)_1fr] grid-rows-[minmax(0px,auto)_56px_360px_160px_minmax(169px,1fr)_minmax(146px,auto)_560px_24px] gap-[1px] grid-template bg-white-100 dark:bg-secondary pt-[70px] overflow-hidden">
        <Joyride
          continuous
          scrollToFirstStep
          run={activeRun}
          steps={steps}
          disableOverlay
          disableOverlayClose
          tooltipComponent={GuideTooltip}
          callback={(data) => {
            if (data.action === 'close' || data.status === 'finished' || data.action === 'skip') {
              setActiveRun(false);
            }
          }}
          disableCloseOnEsc
        />
        <div className=" bg-white-200 dark:bg-[#161A1E] grid-area-header"></div>
        <div className="my-other-step bg-white-200 dark:bg-[#161A1E] grid-area-left"></div>
        <div className="bg-white-200 dark:bg-background-700 grid-area-subHeader ">
          {activeHeaderData && <TradeHeader data={activeHeaderData} coin1={coin1} coin2={coin2} setActiveRun={setActiveRun} />}
        </div>
        <div className="relative bg-white-200 dark:bg-background-700 grid-area-market">
          <TradeMarket />
        </div>
        <div className="bg-white-200 dark:bg-[#161A1E] grid-area-right"></div>
        <div className="bg-white-200 dark:bg-background-700 grid-area-orderbook">
          <OrderBook
            type="order-book"
            coin1={coin1}
            coin2={coin2}
          />
        </div>
        <div className="relative bg-white-200 dark:bg-[#161A1E] grid-area-chart">
          <TradeChartView
            coin1={coin1}
            coin2={coin2}
          />
        </div>
        <div className="bg-white-200 dark:bg-background-700 grid-area-trades">
          <Trades
            coin1={coin1}
            coin2={coin2}
            isLongMarket={isLongMarket}
          />
        </div>
        <div className="bg-white dark:bg-black-500 grid-area-orderform">
          <OrderForm
            coin1={coin1}
            coin2={coin2}
          />
        </div>
        <div className="bg-white-200 dark:bg-background-700 grid-area-marketActivity">
          <MarketActivity
            isLongMarket={isLongMarket}
            setIsLongMarket={setIsLongMarket}
          />
        </div>
        <div className="bg-white-200 dark:bg-background-700 grid-area-basictable">
          <TradeTable coin={coin1} coin2={coin2} />
        </div>
        <footer className="bg-white-200 dark:bg-background grid-area-footer flex items-center justify-between z-20 pl-2.5 sticky bottom-0">
          <TradeFooter />
        </footer>
      </div>



      <div className="grid grid-template-mobile gap-1 w-screen min-h-[930px] h-auto md:hidden pt-[64px]">
        <div className=" bg-white-200 dark:bg-[#161A1E] grid-area-header"></div>
        <div className=" bg-white-200 dark:bg-[#161A1E] grid-area-delist"></div>
        <div className=" bg-white-200 dark:bg-background-700 grid-area-switch">
          {activeHeaderData && <TradeHeader data={activeHeaderData} coin1={coin1} coin2={coin2} setActiveRun={setActiveRun} />}
        </div>
        <div className=" bg-white-200 dark:bg-[rgb(27,29,35)] grid-area-charts">
          <TradeChartView
            coin1={coin1}
            coin2={coin2}
          />
        </div>
        <div className=" bg-white-200 dark:bg-[#161A1E] grid-area-userinfo pb-4 overflow-hidden relative z-auto w-full ">
          <TradeTable coin={coin1} coin2={coin2} />
        </div>
        <div className=" bg-white dark:bg-black-500 grid-area-orderform fixed bottom-[33px] h-[72px] w-full z-50">
          <OrderFormMobile coin1={coin1} coin2={coin2} />
        </div>
          <footer className="fixed bottom-0 h-[33px] w-full md:h-auto bg-white-200 dark:bg-[#181E25] md:dark:bg-background flex items-center justify-between z-40 pl-4 md:pl-2.5">
            <TradeFooter />
          </footer>
      </div>
    </>
  )
}