'use client';

import { twMerge } from "tailwind-merge";
import "react-datepicker/dist/react-datepicker.css";
import { NoResult } from "@/views/crypto/payment/no-result";
import { customFormatDate } from "@/utils/format-date";

export const OrderHistory = ({ orders, setData }: { orders: any[]; setData?: any }) => {

  return (
    <div className={twMerge(
      "pt-1 pl-4 lg:pr-4 lg:pl-0 h-full",
    )}>
      <div className="lg:min-w-[1284px] overflow-x-auto no-scrollbar">
        <div className="pt-1 h-10 flex items-center justify-start">
          <div className="border-b border-b-secondary h-10 flex items-center justify-start max-w-[150px] min-w-[150px]">
            <div className="text-black-300 dark:text-gray text-xs">Order Time</div>
          </div>
          <div className="border-b border-b-secondary h-10 flex items-center justify-center w-[120px] min-w-[120px]">
            <div className="text-black-300 dark:text-gray text-xs">Pair</div>
          </div>
          <div className="border-b border-b-secondary h-10 flex items-center justify-center w-[140px] min-w-[110px]">
            <div className="text-black-300 dark:text-gray text-xs">Type</div>
          </div>
          <div className="border-b border-b-secondary h-10 flex items-center justify-center w-[120px] min-w-[120px]">
            <div className="text-black-300 dark:text-gray text-xs">Side</div>
          </div>
          <div className="border-b border-b-secondary h-10 flex items-center justify-center w-[130px] min-w-[130px]">
            <div className="text-black-300 dark:text-gray text-xs">Price</div>
          </div>
          <div className="border-b border-b-secondary h-10 flex items-center justify-center w-[130px] min-w-[130px]">
            <div className="text-black-300 dark:text-gray text-xs">Executed</div>
          </div>
          <div className="border-b border-b-secondary h-10 flex items-center justify-center w-[150px] min-w-[150px]">
            <div className="text-black-300 dark:text-gray text-xs">Cumulative</div>
          </div>
          <div className="border-b border-b-secondary h-10 flex items-center justify-center w-[130px] min-w-[130px]">
            <div className="text-black-300 dark:text-gray text-xs">Amount</div>
          </div>
          <div className="border-b border-b-secondary h-10 flex items-center justify-center w-[160px] min-w-[160px]">
            <div className="text-black-300 dark:text-gray text-xs">Total</div>
          </div>
          {/* <div className="border-b border-b-secondary h-10 flex items-center justify-center w-[100px] min-w-[100px] px-2 max-w-[100px] z-20">
            <div className="text-xs">Status</div>
          </div> */}
        </div>
        <div className="w-full">
          {
            orders?.length < 1 && (
              <div className="min-h-[450px] flex items-center">
                <NoResult />
              </div>
            )
          }
          {orders.length > 0 && orders?.map((item) => (
            <div className={twMerge(
              "pl-4 lg:pr-4 lg:pl-0 flex h-12 w-full items-center justify-start",
            )}>
              <div className="border-b border-b-secondary h-10 flex items-center justify-start max-w-[150px] min-w-[150px]">
                <div className="text-xs">{customFormatDate(item.created, "DD.MM.YYYY HH:mm")}</div>
              </div>
              <div className="border-b border-b-secondary h-10 flex items-center justify-center w-[120px] min-w-[120px]">
                <div className="text-xs">{item.symbol}</div>
              </div>
              <div className="border-b border-b-secondary h-10 flex items-center justify-center w-[140px] min-w-[110px]">
                <div className="text-xs">{item.type == 1 ? 'Limit' : 'Market'}</div>
              </div>
              <div className="border-b border-b-secondary h-10 flex items-center justify-center w-[120px] min-w-[120px]">
                <div className={
                  twMerge("text-xs", item.side == 1 && " text-green", item.side == 2 && " text-error")}>
                  {item.side == 1 ? 'Buy' : 'Sell'}
                </div>
              </div>
              <div className="border-b border-b-secondary h-10 flex items-center justify-center w-[130px] min-w-[130px]">
                <div className="text-xs">{item.price}</div>
              </div>
              <div className="border-b border-b-secondary h-10 flex items-center justify-center w-[130px] min-w-[130px]">
                <div className="text-xs">{item.executedQuantity}</div>
              </div>
              <div className="border-b border-b-secondary h-10 flex items-center justify-center w-[130px] min-w-[130px]">
                <div className="text-xs">{item.cummulativeQuantity}</div>
              </div>
              <div className="border-b border-b-secondary h-10 flex items-center justify-center w-[160px] min-w-[160px]">
                <div className="text-xs">{item.quantity}</div>
              </div>
              <div className="border-b border-b-secondary h-10 flex items-center justify-center w-[150px] min-w-[150px]">
                <div className="text-xs">{item.quantity * item.price} {item.side == 1 ? item.symbol.substring(3) : item.symbol.substring(0, 3)}</div>
              </div>
              {/* <div className="border-b border-b-secondary h-10 flex items-center justify-center w-[100px] min-w-[100px] px-2 max-w-[100px] z-20 text-xs">
                -
              </div> */}
            </div>
          ))}
        </div>
        {false && <div className="border-b border-b-secondary h-10 flex items-center justify-center mt-[108px]">
          <NoResult
            text="You have no open orders"
            width={64}
            height={64}
            imageClass="mb-2"
            textClass="mt-0 text-xs"
          />
        </div>}
      </div>
    </div>
  )
}