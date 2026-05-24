'use client'

import { useEffect, useState } from "react";
import { OrderBookItem } from "../trade/order-book";
import { TradeBookItem } from "../crypto/payment/trade-book-item";
import { twMerge } from "tailwind-merge";

interface TradesProps {
  coin1: string;
  coin2: string;
}

export const FutureTrades = (props: TradesProps) => {
  const { coin1, coin2 } = props;
  const [tradesData, setTradesData] = useState<OrderBookItem[]>([]);

  useEffect(() => {
    if (coin1 && coin2) {
      fetch(`/api/trade/my-trades?coin1=${coin1.toLowerCase()}&coin2=${coin2.toLowerCase()}`)
        .then((res) => res.json())
        .then((data: OrderBookItem[]) => {
          setTradesData(data);
        });
    }

  },[]);

  return (
    <>
      <div className="hidden md:flex h-[42px] text-sm px-4 md:pb-3 border-b border-white-300 dark:border-secondary items-start">
        <div className={twMerge(
          "pt-3 cursor-pointer font-semibold ",
        )}>
          <span className="pb-1.5">Trades</span>
        </div>
      </div>
      <div>
        <div className="px-4 pt-2 pb-1 flex items-center justify-between text-xs h-[28px] text-gray-300 dark:text-gray-400 md:dark:text-gray">
          <div className="flex flex-1 justify-start">Price({coin2})</div>
          <div className="flex flex-1 justify-end">Amount({coin1})</div>
          <div className="flex flex-1 justify-end">Time</div>
        </div>
        <div className="overflow-hidden pb-3">
          <div className={twMerge(
            "h-[320px] md:h-[137px] overflow-y-auto transition-all duration-500",
          )}>
            {
              tradesData?.map((trade, index) => (
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
      </div>
    </>
  )
}