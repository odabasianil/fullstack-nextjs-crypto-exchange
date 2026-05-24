import { twMerge } from "tailwind-merge";
import { Order } from "@/core/models/auth/models/orderbook/spot/init.model";
import { customFormatDate } from "@/utils/format-date";
import { NoResult } from "@/views/crypto/payment/no-result";

export const OpenOrders = ({ orders, cancelOrder }: { orders: Order[]; cancelOrder: any }) => {

  return (
    <div className="pt-1 h-full">
      <div className="lg:min-w-[1154px] overflow-x-auto no-scrollbar">
        <div className={twMerge(
          "pl-4 lg:pr-4 lg:pl-0 flex pt-1 h-8 w-full  items-center justify-start "
        )}>
          <div className="flex items-center justify-start flex-grow w-[88px] min-w-[88px]">
            <div className="text-black-300 dark:text-gray text-xs">Date</div>
          </div>
          <div className="flex items-center justify-center flex-grow w-[120px] min-w-[120px]">
            <div className="text-black-300 dark:text-gray text-xs">Pair</div>
          </div>
          <div className="flex items-center justify-center flex-grow w-[110px] min-w-[110px]">
            <div className="text-black-300 dark:text-gray text-xs">Type</div>

          </div>
          <div className="flex items-center justify-center flex-grow w-[60px] min-w-[60px]">
            <div className="text-black-300 dark:text-gray text-xs">Side</div>

          </div>
          <div className="flex items-center justify-center flex-grow w-[120px] min-w-[120px]">
            <div className="text-black-300 dark:text-gray text-xs">Price</div>
          </div>
          <div className="flex items-center justify-center flex-grow w-[120px] min-w-[120px]">
            <div className="text-black-300 dark:text-gray text-xs">Amount</div>
          </div>
          <div className="flex items-center justify-center flex-grow w-[60px] min-w-[60px]">
            <div className="text-black-300 dark:text-gray text-xs">Filled</div>
          </div>
          <div className="flex items-center justify-center flex-grow w-[80px] min-w-[80px]">
            <div className="text-black-300 dark:text-gray text-xs">Total</div>
          </div>
          <div className="flex items-center justify-end flex-grow w-[100px] min-w-[100px] pr-4 max-w-[100px] z-20">
            <div className="text-primary-100 text-xs">Action</div>
          </div>
        </div>
        <div className="w-full max-h-[480px] lg:max-h-[680px] overflow-y-scroll">
          {
            orders?.length < 1 && (
              <div className="min-h-[450px] flex items-center">
                <NoResult />
              </div>
            )
          }
          {orders.length > 0 && orders?.map((item, index) => (
            <div className={twMerge(
              "pl-4 lg:pr-4 lg:pl-0 flex h-12 w-full items-center justify-start  border-b border-b-secondary"
            )}>
              <div className="flex items-center justify-start flex-grow w-[88px] min-w-[88px]">
                <div className="text-xs whitespace-nowrap">{customFormatDate(item.created, "DD.MM.YYYY HH:mm")}</div>
              </div>
              <div className="flex items-center justify-center flex-grow w-[120px] min-w-[120px]">
                <div className="text-xs">{item.symbol}</div>
              </div>
              <div className="flex items-center justify-center flex-grow w-[110px] min-w-[110px]">
                <div className="text-xs">{item.type == 1 ? 'Limit' : 'Market'}</div>
              </div>
              <div className="flex items-center justify-center flex-grow w-[60px] min-w-[60px]">
                <div className={
                  twMerge("text-xs", item.side == 1 && " text-green", item.side == 2 && " text-error")}>
                  {item.side == 1 ? 'Buy' : 'Sell'}
                </div>
              </div>
              <div className="flex items-center justify-center flex-grow w-[120px] min-w-[120px]">
                <div className="text-xs">{item.price}</div>
              </div>
              <div className="flex items-center justify-center flex-grow w-[120px] min-w-[120px]">
                <div className="text-xs">{item.quantity}</div>
              </div>
              <div className="flex items-center justify-center flex-grow w-[60px] min-w-[60px]">
                <div className="text-xs">{item.executedQuantity * 100 / item.quantity}</div>
              </div>
              <div className="flex items-center justify-center flex-grow w-[80px] min-w-[80px] whitespace-nowrap">
                <div className="text-xs">{item.quantity * item.price} {item.side == 1 ? item.symbol.substring(3) : item.symbol.substring(0, 3)}</div>
              </div>
              <div className="flex items-center justify-end flex-grow w-[100px] min-w-[100px] px-2 max-w-[100px] z-20">
                <div className="cursor-pointer text-xs text-primary-100" onClick={(e) => cancelOrder(e, item.orderId, item.symbol)}>
                  Cancel
                </div>
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