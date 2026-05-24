'use client'

import { useEffect, useMemo, useState } from "react"
import { OrderBookItem } from "./order-book";
import { twMerge } from "tailwind-merge";
import { TradeBookItem } from "../crypto/payment/trade-book-item";

interface TradesProps {
  coin1: string;
  coin2: string;
  isLongMarket?: boolean;
}

export const Trades = (props: TradesProps) => {
  const { coin1, coin2, isLongMarket=false } = props;
  const [selectTrade, setSelectTrade] = useState('market-trades');
  const [marketTradeData, setMarketTradeData] = useState<OrderBookItem[]>([]);
  const [myTradeData, setMyTradeData] = useState<OrderBookItem[]>([]);


  useEffect(() => {
    if (coin1 && coin2) {
      fetch(`/api/trade/market-trades?coin1=${coin1.toLowerCase()}&coin2=${coin2.toLowerCase()}`)
        .then((res) => res.json())
        .then((data: OrderBookItem[]) => {
          setMarketTradeData(data);
        });

      fetch(`/api/trade/my-trades?coin1=${coin1.toLowerCase()}&coin2=${coin2.toLowerCase()}`)
        .then((res) => res.json())
        .then((data: OrderBookItem[]) => {
          setMyTradeData(data);
        });
    }

  },[]);

  const activeData = useMemo(() => {
    return selectTrade === 'market-trades' ? marketTradeData : myTradeData;
  }, [selectTrade, marketTradeData, myTradeData]);
  
  return (
    <>
      <div className="hidden md:flex h-[42px] text-sm px-4 border-b border-white-300 dark:border-secondary  items-start gap-6 ">
        <div onClick={() => setSelectTrade('market-trades')} className={twMerge(
          "pt-3 cursor-pointer font-semibold ",
          selectTrade === 'market-trades' ? "text-dark-100 dark:text-white-100" : "text-gray-300 dark:text-gray"
        )}>
          <span className="pb-1.5"> Market Trades</span>
          {selectTrade === 'market-trades' && <div className="mx-auto h-[3px] w-4 bg-primary mt-1.5"></div>}
        </div>
        <div onClick={() => setSelectTrade('my-trades')} className={twMerge(
          "pt-3 cursor-pointer font-semibold ",
          selectTrade === 'my-trades' ? "text-dark-100 dark:text-white-100" : "text-gray-300 dark:text-gray"
        )}>
          <span className="pb-1.5"> My Trades</span>
          {selectTrade === 'my-trades' && <div className="mx-auto h-[3px] w-4 bg-primary mt-1.5"></div>}
        </div>
      </div>
      <div>
        <div className="px-4 pt-2 pb-1 flex items-center justify-between text-xs h-[28px] text-gray-300 dark:text-gray-400 md:dark:text-gray">
          <div className="flex flex-1 justify-start">Price({coin2})</div>
          <div className="flex flex-1 justify-end">Amount({coin1})</div>
          <div className="flex flex-1 justify-end">Time</div>
        </div>
        <div className={twMerge(
          "h-[337px] overflow-y-auto transition-all duration-500",
          isLongMarket ? "md:h-[258px]" : "md:h-[305px]"
        )}>
          {
            activeData?.map((trade, index) => (
              <TradeBookItem
                key={index}
                value1={trade.price}
                value2={trade.amount}
                value3={trade.time}
                isBuy={trade.is_buy}
              />
            ))
          }
        </div>
      </div>
    </>
  )
}