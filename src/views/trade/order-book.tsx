'use client'

import { Icon } from "@/components/ui/icon";
import Select from "@/components/ui/select";
import { getBuySellRatio } from "@/utils/get-buy-sell-ratio";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import { TradeBookHeader } from "../crypto/payment/trade-book-header";
import { TradeBookItem } from "../crypto/payment/trade-book-item";
import { BuySellRatio } from "../crypto/payment/buy-sell-ratio";

interface OrderBookProps {
  type: string;
  coin1: string;
  coin2: string;
  isFuturePage?: boolean;
}


export interface OrderBookItem {
  price: string;
  amount?: string;
  total?: string;
  time?: string;
  size?: string;
  sum?: string;
  is_buy?: boolean;
  percentage?: number;
}

export const OrderBook = (props: OrderBookProps) => {
  const { type, coin1, coin2, isFuturePage = false } = props;
  const [selectValue, setSelectValue] = useState("0.01");
  const [orderBookData, setOrderBookData] = useState<OrderBookItem[]>();
  const [layout, setLayout] = useState('buysell');
  const [checkedBuySell, setCheckedBuySell] = useState(true);
  const [showTooltip, setShowTooltip] = useState(true);
  const [hoverIndex, setHoverIndex] = useState<any>({isBuy: true, index: 0});

  const { buyRatio, sellRatio } = useMemo(() => {
    return getBuySellRatio(orderBookData);
  }, [orderBookData]);


  useEffect(() => {
    if (coin1 && coin2) {
      fetch(`/api/trade/${type}?coin1=${coin1.toLowerCase()}&coin2=${coin2.toLowerCase()}`)
        .then((res) => res.json())
        .then((data: OrderBookItem[]) => {
          setOrderBookData(data);
        });
    }
  },[]);

  const buyOrders = useMemo(() => {
    return orderBookData?.filter((order) => order.is_buy);
  }, [orderBookData]);

  const sellOrders = useMemo(() => {
    return orderBookData?.filter((order) => !order.is_buy);
  }, [orderBookData]);
  
  const RenderTrade = ({ data, type }: {data: OrderBookItem[]; type: string}) => (
    <div className={twMerge(
      "flex flex-row md:flex-col overflow-hidden",
      layout === 'buysell' && 'w-1/2 md:w-full',
    )}>
      {
        layout.includes(type) && 
        <div className={twMerge(
          "order-1 w-full h-[285px] md:h-[340px] flex flex-col justify-start overflow-hidden my-2.5",
          layout === type && 'h-[305px] md:h-[753px] overflow-y-auto',
          (!checkedBuySell && layout === 'buysell') && 'md:h-[350px]',
          (isFuturePage && !checkedBuySell && layout === 'buysell') && 'md:h-[160px]',
          (isFuturePage && checkedBuySell && layout === 'buysell') && 'md:h-[140px]',
          (isFuturePage && layout === type) && 'h-[305px] md:h-[313px] overflow-y-auto',
        )}>
          {data?.map((order, index) => (
            <div onMouseEnter={() =>  setHoverIndex({isBuy: order.is_buy, index})} 
            className={twMerge(
              !isFuturePage && (hoverIndex.isBuy === order.is_buy && (hoverIndex.isBuy ? hoverIndex.index >= index : hoverIndex.index <= index)) && 'bg-white-100 dark:bg-secondary',
              !isFuturePage && (hoverIndex.isBuy === order.is_buy && (hoverIndex.index === index)) && `${hoverIndex.isBuy ? 'border-b' : 'border-t'} border-dashed`
            )}>
              <TradeBookItem
                selectValue={(selectValue as any)?.value}
                coin1={coin1}
                coin2={coin2}
                value1={order.price}
                value2={order.amount}
                value3={order.total}
                isBuy={order.is_buy}
                percentage={order?.percentage}
                isHoverTooltip={(!isFuturePage && showTooltip) ? true : false}
                layout={layout}
              />
            </div>
          ))}
        </div>
      }
    </div>
  )

  return (
    <div className="w-full h-full relative">
      <TradeBookHeader
        selectValue={selectValue}
        setSelectValue={setSelectValue}
        layout={layout}
        setLayout={setLayout}
        checkedBuySell={checkedBuySell}
        setCheckedBuySell={setCheckedBuySell}
        showTooltip={!isFuturePage && showTooltip}
        setShowTooltip={!isFuturePage ? setShowTooltip : undefined}
      />
      <div className="flex justify-between">
        <div className={twMerge(
          "w-1/2 md:w-full mx-4 mb-1 flex items-center justify-between text-xs h-5 text-gray-300 dark:text-gray",
          layout !== 'buysell' && '!w-full'
        )}>
          <div className="flex flex-1 justify-start">Price({coin2})</div>
          <div className="flex flex-1 justify-end">Amount({coin1})</div>
          <div className={twMerge(
            "flex flex-1 justify-end",
            layout === 'buysell' && 'hidden md:flex'
          )}>Total</div>
        </div>
        {layout === 'buysell' && <div className="w-1/2 mx-4 mb-1 flex md:hidden items-center justify-between text-xs h-5 text-gray-300 dark:text-gray">
          <div className="flex flex-1 justify-start">Price({coin2})</div>
          <div className="flex flex-1 justify-end">Amount({coin1})</div>
          <div className="hidden md:flex flex-1 justify-end">Total</div>
        </div>}
      </div>
      <div className={twMerge(layout === 'buysell' && "flex flex-row md:block justify-between")}>
        {sellOrders && <RenderTrade data={sellOrders} type="sell" />}
        <div className="h-9 px-4 hidden md:flex items-center justify-between order-2 z-10">
          <div className="flex items-center">
            <div className="flex items-center mr-1">
              <div className="text-success-100 text-xl">{buyOrders?.[0]?.price}</div>
              <Icon
                name="arrow-right"
                size={16}
                className="text-success-100 rotate-90"
              />
            </div>
            <div className="text-xs text-gray-300 dark:text-gray">${buyOrders?.[0]?.price}</div>
          </div>
          <Link
            href={`/trade/${coin1.toLowerCase()}-${coin2.toLowerCase()}/order-book`}
            target="_blank"
          >
            <Icon
              name="chevron-left"
              className="rotate-180 text-gray-300 dark:text-gray hover:text-black-100 dark:hover:text-white-100"
            />
          </Link>
        </div>
        {buyOrders && <RenderTrade data={buyOrders} type="buy" />}
      </div>
        {
          (layout === 'buysell' && checkedBuySell) && (
            <BuySellRatio buyRatio={buyRatio} sellRatio={sellRatio} />
          )
        }
    </div>
  )
}