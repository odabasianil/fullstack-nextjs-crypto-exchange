import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";
import { TradeBookItem } from "../crypto/payment/trade-book-item";
import { formatPrice } from "@/utils/format-price";
import { useEffect, useState } from "react";

export const RenderTrade = (props: any) => {
  const {
    type,
    coin1,
    coin2,
    isFuturePage = false,
    data,
    selectValue,
    layout,
    checkedBuySell,
    showTooltip,
    largestValue,
    hoverIndex,
    setHoverIndex,
  } = props;

  const [target, setTarget] = useState<any>(null);
  const [tooltipContent, setTooltipContent] = useState<any>({
    price: 0,
    sumCoin1: 0,
    sumCoin2: 0,
  });

  const handleMouseEnter = (e: any, index: number) => {
    setHoverIndex({ type: type, index })
    setTarget(e.currentTarget);
    setTooltipContent({ price: 0, sumCoin1: 0, sumCoin2: 0 });
    const prices: any[] = [];

    data?.map((item: any, i: number) => {
      if (i < 17) {
        if ((type === "buy" && i <= index) || (type === "sell" && i >= index)) {
          prices.push(item.price);
          setTooltipContent((prev: any) => ({
            price: prices?.reduce((sum, currentValue) => sum + currentValue, 0) / prices.length,
            sumCoin1: prev.sumCoin1 + item.quantity,
            sumCoin2: prev.sumCoin2 + (item.price * item.quantity),
          }))
        }
      }
    })
  }

  const handleMouseLeave = () => {
    setTooltipContent({ price: 0, sumCoin1: 0, sumCoin2: 0 });
    setTarget(null);
    setHoverIndex({ type, index: type === "buy" ? -1 : 18 });
  }

  useEffect(() => {
    setTooltipContent({ price: 0, sumCoin1: 0, sumCoin2: 0 });
    const prices: any[] = [];

    data?.map((item: any, i: number) => {
      if (i < 17) {
        if ((type === "buy" && i <= hoverIndex.index) || (type === "sell" && i >= hoverIndex.index)) {
          prices.push(item.price);
          setTooltipContent((prev: any) => ({
            price: prices?.reduce((sum, currentValue) => sum + currentValue, 0) / prices.length,
            sumCoin1: prev.sumCoin1 + item.quantity,
            sumCoin2: prev.sumCoin2 + (item.price * item.quantity),
          }))
        }
      }
    });

  }, [data])
  const Tooltip = ({ children, targetRef, className }: any) => {
    if (!targetRef.current) return null;

    const { top, left, width } = targetRef.current.getBoundingClientRect();


    return createPortal(
      <div style={{
        position: 'absolute',
        top: top + window.scrollY - 35,
        left: left + window.scrollX + width,
        zIndex: 9999,
      }} className={twMerge("tooltip-content", className)}>
        {children}
      </div>,
      document.body
    );
  };

  return (
    <div className={twMerge(
      "flex flex-row md:flex-col overflow-hidden",
      layout === 'buysell' && 'w-1/2 md:w-full',
    )}>
      {
        layout?.includes(type) &&
        <div className={twMerge(
          "order-1 w-full h-[285px] md:h-[340px] flex flex-col justify-start overflow-hidden my-2.5",
          layout === type && 'h-[305px] md:h-[753px] overflow-y-auto',
          (!checkedBuySell && layout === 'buysell') && 'md:h-[350px]',
          (isFuturePage && !checkedBuySell && layout === 'buysell') && 'md:h-[160px]',
          (isFuturePage && checkedBuySell && layout === 'buysell') && 'md:h-[140px]',
          (isFuturePage && layout === type) && 'h-[305px] md:h-[313px] overflow-y-auto',
        )}>
          {data?.map((order: any, index: number) => index < 17 && (
            <div
              onMouseEnter={(e) => handleMouseEnter(e, index)}
              onMouseLeave={handleMouseLeave}
              className={twMerge(
                !isFuturePage &&
                (hoverIndex.type === type &&
                  (hoverIndex.type === "buy" ? hoverIndex.index >= index : hoverIndex.index <= index)) &&
                'md:bg-white-100 md:dark:bg-secondary',
                !isFuturePage &&
                ((hoverIndex.type === type) &&
                  (hoverIndex.index === index)) &&
                `${hoverIndex.type === "buy" ? 'md:border-b' : 'md:border-t'} md:border-dashed`,
                hoverIndex.type !== type && 'bg-transparent dark:bg-transparent border-none',
              )}>
              <TradeBookItem
                selectValue={(selectValue as any)?.value}
                value1={order.price}
                value2={order.quantity}
                value3={order.price * order.quantity}
                isBuy={type == "buy"}
                percentage={order?.quantity / largestValue * 100}
                layout={layout}
              />
            </div>
          ))}
          {(hoverIndex.index && (hoverIndex.type === type) && showTooltip && target) &&
            <Tooltip targetRef={{ current: target }} className="hidden md:block">
              <div className={twMerge(
                "py-2 px-3 rounded-lg h-fit w-[220px]",
                "text-sm leading-4",
                "bg-black-200 dark:bg-white-100 text-white-100 dark:text-background-200",
              )}>
                <div className="absolute -left-1 top-1/2 -translate-y-1/2 bg-black-200 dark:bg-white-100 -rotate-45 w-2 h-2"></div>
                <div className="flex items-center justify-between py-[5px]">
                  <div className="font-medium">Avg.Price:</div>
                  <div className="font-medium">~{selectValue ? formatPrice(Number(tooltipContent?.price), Number(selectValue)) : formatPrice(Number(tooltipContent?.price), 0.01)}</div>
                </div>
                <div className="flex items-center justify-between py-[5px]">
                  <div className="font-medium">Sum {coin1}:</div>
                  <div className="font-medium">{selectValue ? formatPrice(Number(tooltipContent?.sumCoin1), Number(selectValue)) : formatPrice(Number(tooltipContent?.sumCoin1), 0.01)}</div>
                </div>
                <div className="flex items-center justify-between py-[5px]">
                  <div className="font-medium">Sum {coin2}:</div>
                  <div className="font-medium">~{selectValue ? formatPrice(Number(tooltipContent?.sumCoin2), Number(selectValue)) : formatPrice(Number(tooltipContent?.sumCoin2), 0.01)}</div>
                </div>
              </div>
            </Tooltip>}
        </div>
      }
    </div>
  )
}