import Select from "@/components/ui/select"
import { useState } from "react"
import { twMerge } from "tailwind-merge";
import { NoResult } from "../crypto/payment/no-result";
import { Icon } from "@/components/ui/icon";

export const OpenOrders = ({isAccount=false}: {isAccount?: boolean}) => {
  const [type, setType] = useState('all');
  const [side, setSide] = useState('all');

  return (
    <div className="pt-1 h-full">
      <div className="lg:min-w-[1154px] overflow-x-auto no-scrollbar">
        <div className={twMerge(
          "pl-4 md:px-4 flex pt-1 h-8 w-full  items-center justify-start ",
          isAccount && "md:pl-0"
        )}>
          <div className="flex items-center justify-start flex-grow w-[88px] min-w-[88px]">
            <div className="text-black-300 dark:text-gray text-xs">Date</div>
          </div>
          <div className="flex items-center justify-start flex-grow w-[120px] min-w-[120px]">
            <div className="text-black-300 dark:text-gray text-xs">Pair</div>
          </div>
          <div className="flex items-center justify-start flex-grow w-[110px] min-w-[110px]">
            <Select
              options={[
                { label: 'All', value: 'all' },
                { label: 'Limit', value: 'limit' },
                { label: 'Stop Limit', value: 'stop_limit' },
                { label: 'Stop Market', value: 'stop_market' },
                { label: 'Limit Maker', value: 'limit_maker' },
                { label: 'Trailling Stop', value: 'trailling_stop' }
              ]}
              value={type}
              setValue={setType}
              wrapperClassName="w-[50px] !text-xs !border-none whitespace-nowrap"
              valueClass="!text-xs pr-0"
            />
          </div>
          <div className="flex items-center justify-start flex-grow w-[60px] min-w-[60px]">
            <Select
              options={[
                { label: 'All', value: 'all' },
                { label: 'Buy', value: 'buy' },
                { label: 'Sell', value: 'sell' },
              ]}
              value={side}
              setValue={setSide}
              wrapperClassName="w-[38px] !text-xs !border-none whitespace-nowrap"
              valueClass="!text-xs pr-0"
            />
          </div>
          <div className="flex items-center justify-start flex-grow w-[120px] min-w-[120px]">
            <div className="text-black-300 dark:text-gray text-xs">Price</div>
          </div>
          <div className="flex items-center justify-start flex-grow w-[120px] min-w-[120px]">
            <div className="text-black-300 dark:text-gray text-xs">Amount</div>
          </div>
          <div className="flex items-center justify-start flex-grow w-[100px] min-w-[100px]">
            <div className="text-black-300 dark:text-gray text-xs">Amount per Iceberg Order</div>
          </div>
          <div className="flex items-center justify-start flex-grow w-[60px] min-w-[60px]">
            <div className="text-black-300 dark:text-gray text-xs">Filled</div>
          </div>
          <div className="flex items-center justify-start flex-grow w-[80px] min-w-[80px]">
            <div className="text-black-300 dark:text-gray text-xs">Total</div>
          </div>
          <div className="flex items-center justify-start flex-grow w-[100px] min-w-[100px]">
            <div className="text-black-300 dark:text-gray text-xs">Trigger Conditions</div>
          </div>
          <div className="flex items-center justify-start flex-grow w-[48px] min-w-[48px]">
            <div className="text-black-300 dark:text-gray text-xs">SOR</div>
          </div>
          <div className="relative flex items-center justify-start flex-grow w-[48px] min-w-[48px] group">
            <div className="text-black-300 dark:text-gray text-xs underline decoration-dashed cursor-help">TP/SL</div>
            <div className={twMerge(
              "invisible opacity-0 group-hover:opacity-100 group-hover:visible",
              "absolute top-4 -right-16 bg-black-100 dark:bg-white-100 text-white-100 dark:text-background-200",
              "w-[320px] py-2 px-4 rounded shadow-lg z-30",
            )}>
              <div className="text-sm font-medium text-left">
                Adjusting a TPSL order will cancel the existing Take Profit and Stop Loss conditions, converting it into a standard limit order.
              </div>
            </div>
          </div>
          <div className="flex items-center justify-start flex-grow w-[100px] min-w-[100px] px-2 max-w-[100px] z-20">
            <div className="text-primary-100 text-xs">Cancel All</div>
          </div>
        </div>
        <div className="w-full">
          {new Array(10).fill(null).map((idx) => (
            <div className={twMerge(
              "pl-4 md:px-4 flex h-12 w-full items-center justify-start  border-b border-b-secondary",
              isAccount && "md:pl-0"
            )}>
              <div className="flex items-center justify-start flex-grow w-[88px] min-w-[88px]">
                <div className="text-xs">08-27 10:49:58</div>
              </div>
              <div className="flex items-center justify-start flex-grow w-[120px] min-w-[120px]">
                <div className="text-xs">BTC/USDT</div>
              </div>
              <div className="flex items-center justify-start flex-grow w-[110px] min-w-[110px]">
                <div className="text-xs">Limit</div>
              </div>
              <div className="flex items-center justify-start flex-grow w-[60px] min-w-[60px]">
                <div className="text-xs text-green">Buy</div>
              </div>
              <div className="flex items-center justify-start flex-grow w-[120px] min-w-[120px]">
                <div className="text-xs">60.49</div>
              </div>
              <div className="flex items-center justify-start flex-grow w-[120px] min-w-[120px]">
                <div className="text-xs">5.00</div>
              </div>
              <div className="flex items-center justify-start flex-grow w-[100px] min-w-[100px]">
                <div className="text-xs">-</div>
              </div>
              <div className="flex items-center justify-start flex-grow w-[60px] min-w-[60px]">
                <div className="text-xs">0.00%</div>
              </div>
              <div className="flex items-center justify-start flex-grow w-[80px] min-w-[80px]">
                <div className="text-xs">302.45 USDT</div>
              </div>
              <div className="flex items-center justify-start flex-grow w-[100px] min-w-[100px]">
                <div className="text-xs">-</div>
              </div>
              <div className="flex items-center justify-start flex-grow w-[48px] min-w-[48px]">
                <div className="text-xs">-</div>
              </div>
              <div className="relative flex items-center justify-start flex-grow w-[48px] min-w-[48px] group">
                <div className="text-xs">-</div>
              </div>
              <div className="flex items-center justify-start flex-grow w-[100px] min-w-[100px] px-2 max-w-[100px] z-20">
                <Icon
                  name="trash"
                  size={20}
                  className="text-gray"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {false && <div className="pb-[25px] px-4 flex items-center justify-center pt-[108px]">
        <NoResult
          text="Youu have no open orders"
          width={64}
          height={64}
          imageClass="mb-2"
          textClass="mt-0 text-xs"
        />
      </div>}
    </div>
  )
}