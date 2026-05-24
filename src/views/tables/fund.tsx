import { NoResult } from "../crypto/payment/no-result";
import { Icon } from "@/components/ui/icon";

export const Fund = (props: any) => {

  return (
    <div className="pt-1 px-4 h-full">
      <div className="lg:min-w-[1284px] overflow-x-auto no-scrollbar">
        <div className="pt-1 h-8 w-full flex items-center justify-start">
          <div className="cursor-pointer flex items-center justify-start flex-grow w-[120px] min-w-[120px]">
            <div className="text-black-300 dark:text-gray text-xs">Order Time</div>
            <Icon
              name="sort-icon"
              size={16}
              className="text-gray"
            />
          </div>
          <div className="cursor-pointer flex items-center justify-start flex-grow w-[120px] min-w-[120px]">
            <div className="text-black-300 dark:text-gray text-xs">Total balance</div>
            <Icon
              name="sort-icon"
              size={16}
              className="text-gray"
            />
          </div>
          <div className="cursor-pointer flex items-center justify-start flex-grow w-[120px] min-w-[120px]">
            <div className="text-black-300 dark:text-gray text-xs">Available balance</div>
            <Icon
              name="sort-icon"
              size={16}
              className="text-gray"
            />
          </div>
          <div className="cursor-pointer flex items-center justify-start flex-grow w-[120px] min-w-[120px]">
            <div className="text-black-300 dark:text-gray text-xs">In order</div>
            <Icon
              name="sort-icon"
              size={16}
              className="text-gray"
            />
          </div>
          <div className="cursor-pointer flex items-center justify-start flex-grow w-[120px] min-w-[120px]">
            <div className="text-black-300 dark:text-gray text-xs">BTC value</div>
            <Icon
              name="sort-icon"
              size={16}
              className="text-gray"
            />
          </div>
        </div>

        <div className="w-full ">
          {new Array(10).fill(null).map((idx) => (
            <div className="h-12 w-full flex items-center justify-start">
              <div className="cursor-pointer flex items-center justify-start flex-grow w-[120px] min-w-[120px]">
                <div className="text-xs">USDT &gt;</div>
              </div>
              <div className="cursor-pointer flex items-center justify-start flex-grow w-[120px] min-w-[120px]">
                <div className="text-xs">1,152.87590000</div>
              </div>
              <div className="cursor-pointer flex items-center justify-start flex-grow w-[120px] min-w-[120px]">
                <div className="text-xs">1,147.87590000</div>
              </div>
              <div className="cursor-pointer flex items-center justify-start flex-grow w-[120px] min-w-[120px]">
                <div className="text-xs">5.00000000</div>
              </div>
              <div className="cursor-pointer flex items-center justify-start flex-grow w-[120px] min-w-[120px]">
                <div className="text-xs">0.48570662 ~ $30.543,17</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {false && <div className="flex items-center justify-center mt-[108px]">
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