'use client'

import { Button } from "@/components/ui/button";
import { PriceInput } from "@/components/ui/price-input";
import { Range } from "@/components/ui/range";
import { useState } from "react";

export const FutureMarket = (props: {coin1: string, coin2: string}) => {
  const [rangeValue, setRangeValue] = useState(0);
  const { coin1, coin2 } = props;

  return (
    <>
      <div className="flex items-center gap-0.5 text-xs px-4 mb-2">
        <div className="text-gray-300 dark:text-gray">Avbl</div>
        -
        <div>{coin2}</div>
      </div>
      <div className="px-4 mt-4">
        <PriceInput 
          label="Size"
          labelClassName="text-sm"
          coin={coin1}
        />
        <Range
          value={rangeValue}
          setValue={setRangeValue}
          className="my-4"
        />
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-0.5 text-xs">
            <div className="text-gray-300 dark:text-gray">Buy</div>
            <div>0.000 {coin1}</div>
          </div>
          <div className="flex items-center gap-0.5 text-xs">
            <div className="text-gray-300 dark:text-gray">Sell</div>
            <div>0.000 {coin1}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            className="w-full h-9 text-sm border-none rounded-lg font-semibold bg-green text-white hover:bg-green hover:text-white"
          >
            Buy/Long
          </Button>
          <Button
            className="w-full h-9 text-sm border-none rounded-lg font-semibold bg-error text-white hover:bg-error hover:text-white"
          >
            Sell/Short
          </Button>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-0.5 text-xs">
            <div className="text-gray-300 dark:text-gray">Cost</div>
            <div>0.000 {coin2}</div>
          </div>
          <div className="flex items-center gap-0.5 text-xs">
            <div className="text-gray-300 dark:text-gray">Cost</div>
            <div>0.000 {coin2}</div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-0.5 mb-4">
          <div className="flex items-center gap-0.5 text-xs">
            <div className="text-gray-300 dark:text-gray">Max</div>
            <div>0.000 {coin1}</div>
          </div>
          <div className="flex items-center gap-0.5 text-xs">
            <div className="text-gray-300 dark:text-gray">Max</div>
            <div>0.000 {coin1}</div>
          </div>
        </div>
      </div>
    </>
  )
}