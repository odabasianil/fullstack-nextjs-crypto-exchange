import { formatPrice } from "@/utils/format-price";
import { twMerge } from "tailwind-merge";

interface TradeBookItemProps {
  selectValue?: string;
  coin1?: string;
  coin2?: string
  value1?: string;
  value2?: string;
  value3?: string;
  isBuy?: boolean;
  isHoverTooltip?: boolean;
  layout?: string;
  percentage?: number;
}
  
export const TradeBookItem = (props: TradeBookItemProps) => {
  const { selectValue, coin1, coin2, value1, value2, value3, isBuy, isHoverTooltip = false, layout, percentage } = props;
  
  return (
    <>
      <div
        style={{
          background: percentage && `linear-gradient(82deg, rgba(255,255,255,0) ${100-percentage}%, rgba(${isBuy ?'46,189,133' : '246,70,93'},0.2) 100%)`
        }}
        className={twMerge(
          "group cursor-pointer flex items-center justify-between px-4 min-h-5 text-xs hover:bg-white-100 dark:hover:bg-secondary"
        )}>
        <div className={twMerge(
          "flex flex-1 justify-start ",
          isBuy ? "text-success-100" : "text-red-500"
          )}
        >
          {selectValue ? formatPrice(Number(value1), Number(selectValue)) : value1}
        </div>
        <div className="flex flex-1 justify-end">{value2}</div>
        <div className={twMerge(
          "flex flex-1 justify-end",
          layout === 'buysell' && 'hidden md:flex'
        )}>{value3}</div>
        {isHoverTooltip && <div className={twMerge(
          "hidden md:group-hover:block py-2 px-3 rounded-lg h-fit w-[220px]",
          "z-30 absolute left-full opacity-[.95] text-sm leading-4",
          "bg-black-200 dark:bg-white-100 text-white-100 dark:text-background-200",
          )}>
            <div className="absolute -left-1 top-1/2 -translate-y-1/2 bg-black-200 dark:bg-white-100 -rotate-45 w-2 h-2"></div>
            <div className="flex items-center justify-between py-[5px]">
              <div className="font-medium">Avg.Price:</div>
              <div className="font-medium">~{value1}</div>
            </div>
            <div className="flex items-center justify-between py-[5px]">
              <div className="font-medium">Sum {coin1}:</div>
              <div className="font-medium">{value2}</div>
            </div>
            <div className="flex items-center justify-between py-[5px]">
              <div className="font-medium">Sum {coin2}:</div>
              <div className="font-medium">~{value3}</div>
            </div>
        </div>}
      </div>
    </>
  )
}