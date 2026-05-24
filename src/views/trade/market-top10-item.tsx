import { Icon } from "@/components/ui/icon"
import useFavButton from "@/hooks/use-fav-button";
import Link from "next/link"
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export const MarketTop10Item = (props: any) => {
  const { data, setData, item, index, handleClick } = props;
  const [isActive, setIsActive] = useState(item.isFavorite);
  const { FavButton } = useFavButton(item.tenantPairSpotId, isActive, setIsActive);

  useEffect(() => {
    setIsActive(item.isFavorite);
  }, [item])

  useEffect(() => {
    if (isActive) {
      setData((prev: any) => {
        return prev.map((i: any) => {
          if (i.tenantPairSpotId === item.tenantPairSpotId) {
            return {
              ...i,
              isFavorite: true
            }
          }
          return i;
        })
      })
    } else {
      setData((prev: any) => {
        return prev.map((i: any) => {
          if (i.tenantPairSpotId === item.tenantPairSpotId) {
            return {
              ...i,
              isFavorite: false
            }
          }
          return i;
        })
      })
    }
  }, [isActive])

  return (
    <>
      <Link onClick={() => handleClick(item)} href={`/trade/${item.baseAsset}_${item.quoteAsset}`} className="flex items-start flex-1 h-6 text-xs cursor-pointer hover:bg-background">
        <div className="flex flex-nowrap items-center flex-[5_1_0px] min-w-[120px] pt-1">
          <FavButton size={16} className="border-none" />
          <span className={twMerge(
            "ml-1 text-black-300 dark:text-gray",
            index === 0 && "!text-[#FF693D]",
            index === 1 && "!text-[#D0980B]",
            index === 2 && "!text-[#F0B90B]",
          )}>{index + 1}</span>
          <span className="ml-2">{`${item.baseAsset}/${item.quoteAsset}`}</span>
          {item?.multiple && <span className="px-1 h-4 ml-1 rounded-sm bg-white-300 dark:bg-secondary text-xs">{item?.multiple}</span>}
        </div>
        <div className="flex items-cneter justify-center pt-[3px] gap-2">
          <div className="max-w-[60px] lg:max-w-[120px]">{item?.last_price}</div>
          <div className={twMerge(
            "min-w-[60px] text-right",
            item?.change?.includes("-") ? "text-error" : "text-success-100"
          )}>{item?.change}</div>
        </div>
      </Link>
    </>
  )
} 