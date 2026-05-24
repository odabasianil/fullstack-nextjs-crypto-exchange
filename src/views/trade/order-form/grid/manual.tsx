import { Input } from "@/components/ui/input";
import { Investment } from "./investment";
import { PriceInput } from "@/components/ui/price-input";
import { Icon } from "@/components/ui/icon";
import { twMerge } from "tailwind-merge";
import { useState } from "react";

export const ManualTab = (props: any) => {
  const { coin1, coin2 } = props;
  const [checked, setChecked] = useState(false);

  const handleCheck = () => {
    setChecked(!checked);
  }

  return (
    <div className="flex justify-between w-full">
      <div className="block w-[calc(50%-20px)]">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1">
              <div className="text-sm font-semibold">1. Price Range</div>
              <div className="text-xs rounded px-1 bg-primary-200 text-primary">Trailing Up</div>
            </div>
            <div className="text-primary-100 cursor-pointer text-xs">Auto Fill</div>
          </div>
          <div className="flex justify-between">
            <Input
              placeholder="Lower"
              className="!pl-2 rounded text-sm !h-10 bg-white-300 dark:bg-secondary border !border-transparent hover:border-primary"
              wrapperClassName="h-10"
            />
            <div className="w-2 h-[1px] mx-1 self-start mt-5 bg-white-300 dark:bg-gray-300" />
            <Input
              placeholder="Upper"
              className="!pl-2 rounded text-sm !h-10 bg-white-300 dark:bg-secondary border !border-transparent hover:border-primary"
              wrapperClassName="!h-10"
            />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-sm font-semibold">2. Grids</div>
          <div className="mt-2">
            <PriceInput
              label="Grids"
              coin="Arithmetic"
              placeholder="2-170"
            />
          </div>
          <div className="mt-2 flex items-center justify-between text-gray-300 dark:text-gray">
            <div className="underline decoration-dashed text-xs">Profit/grid(fees deducted)</div>
            <div className="text-xs">--</div>
          </div>
          <div className="my-4 bg-white-300 dark:bg-gray-200 h-[1px] w-full" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-gray-300 dark:text-gray">
              <div className=" text-sm">Advanced (Optional)</div>
              <Icon
                name="edit"
                size={16}
              />
            </div>
            <div className="flex items-center gap-2">
              <div className={twMerge(
                  "w-4 h-4 border rounded-sm border-white-100 dark:border-secondary relative !cursor-not-allowed",
                  checked && '!bg-primary border-none text-black-100'
                )}>
                {checked && <Icon name="check" className="absolute w-full h-full" />}
              </div>
              <div className="text-gray-300 dark:text-gray text-sm">Sell all base coin on stop</div>
            </div>
          </div>
        </div>
      </div>
      <div className="block w-[calc(50%-20px)]">
        <Investment coin1={coin1} coin2={coin2} isManual />
      </div>
    </div>
  )
}