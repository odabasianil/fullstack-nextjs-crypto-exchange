import { Button } from "@/components/ui/button";
import { PriceInput } from "@/components/ui/price-input";
import { Range } from "@/components/ui/range";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export const FutureTrailingStop = (props: {coin1: string, coin2: string}) => {
  const { coin1, coin2 } = props;
  const [trailingDelta, setTrailingDelta] = useState(0);
  const [rangeValue, setRangeValue] = useState(0);

  return (
    <>
      <div className="flex items-center gap-0.5 text-xs px-4 mb-4">
        <div className="text-gray-300 dark:text-gray">Avbl</div>
        -
        <div>{coin2}</div>
      </div>
      <div className="px-4 mt-2">
        <div className="flex items-center gap-1.5">
          <PriceInput
            className="flex-1"
            label='Callback Rate'
            labelClassName="text-sm"
            coin="%"
            value={trailingDelta}
            onChange={(e: any) => setTrailingDelta(e.target.value)}
            min={1}
            step={1}
            max={100}
          />
          <button
            type="button"
            onClick={() => setTrailingDelta(1)}
            className={twMerge(
              "bg-white-300 hover:bg-white-100 dark:bg-secondary dark:hover:bg-gray-300",
              "w-10 h-10 flex items-center justify-center rounded-md text-sm",
              "text-black-300 dark:text-gray hover:text-white-100"
            )}
          >
            1%
          </button>
          <button
            type="button"
            onClick={() => setTrailingDelta(2)}
            className={twMerge(
              "bg-white-300 hover:bg-white-100 dark:bg-secondary dark:hover:bg-gray-300",
              "w-10 h-10 flex items-center justify-center rounded-md text-sm",
              "text-black-300 dark:text-gray hover:text-white-100"
            )}
          >
            2%
          </button>
        </div>
        <PriceInput 
          label="Activation Price"
          labelClassName="text-sm"
          coin={"Mark"}
          className="mt-2"
        />
        <PriceInput 
          label="Size"
          labelClassName="text-sm"
          coin={coin1}
          className="mt-2"
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