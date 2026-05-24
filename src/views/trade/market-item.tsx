'use client'

import { Icon } from "@/components/ui/icon";
import useFavButton from "@/hooks/use-fav-button";
import { formatPrice, formatPriceSmall } from "@/utils/format-price";
import Link from "next/link";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export const MarketItem = (props: any) => {
  const { data, setData, item } = props;
  const [isActive, setIsActive] = useState(item.isFavorite);
  const { FavButton } = useFavButton(item.tenantPairSpotId, isActive, setIsActive);

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
      <Link href={`/trade/${item.baseAsset}_${item.quoteAsset}`} className="group px-4 flex items-start flex-1 h-6 text-xs cursor-pointer hover:bg-background">
        <div className="flex flex-nowrap items-center flex-[5_1_0px] min-w-[120px] pt-1">
          <FavButton size={16} className="border-none" />
          <span className="ml-1">{`${item.baseAsset}/${item.quoteAsset}`}</span>
          {/* <span className="px-1 h-4 ml-1 rounded-sm bg-white-300 dark:bg-secondary text-xs">{item?.multiple}</span> */}
        </div>
        <div className="flex items-cneter justify-center pt-[3px] gap-2">
          <div className="max-w-[60px] lg:max-w-[120px]">{formatPrice(item?.last_price, 0.01)}</div>
          <div className="min-w-[60px] text-right text-black-300 dark:text-gray">{formatPriceSmall(item?.vol)}</div>
        </div>
        {item?.last_price && <div className={twMerge(
          "hidden group-hover:block py-2 px-3 rounded-lg h-fit w-max",
          "z-30 absolute right-full opacity-[.95] text-sm leading-4",
          "bg-black-200 dark:bg-white-100 text-white-100 dark:text-background-200",
        )}>
          <div className="absolute -right-1 top-1/2 -translate-y-1/2 bg-black-200 dark:bg-white-100 -rotate-45 w-2 h-2"></div>
          <div className="flex items-center gap-2">
            <div className="text-sm">${item?.last_price}</div>
            <Link href={`/trade/${item?.pair?.replace('/', '_')}`} target="_blank">
              <Icon name="link" size={16} className="text-gray-300 dark:text-gray" />
            </Link>
          </div>
        </div>}
      </Link>
    </>
  )
} 