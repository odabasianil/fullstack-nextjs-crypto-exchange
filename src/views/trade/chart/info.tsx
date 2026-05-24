'use client'

import { NoResult } from "@/views/crypto/payment/no-result";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export const TradeChartInfo = ({coin} : {coin: string}) => {
  const [data, setData] = useState<any>(null);
  const [viewMore, setViewMore] = useState(false);
  useEffect(() => {
    if (coin) {
      fetch(`/api/trade/info?coin=${coin?.toLowerCase()}`)
        .then((res) => res.json())
        .then((data) => setData(data));
    }
  }
  , []);

  if (!data) {
    return (
      <div className="pt-20">
        <NoResult />
      </div>
    );
  }

  const Column = ({col, infoText, value, value2}: {col: string, infoText: string; value: string; value2?: string}) => (
    <div className="flex justify-between py-2 items-start text-sm leading-[22px]">
      <div className="relative group">
        <div className="text-black-300 dark:text-gray cursor-help">{col}</div>
        <div className={twMerge(
          "hidden group-hover:block py-2 px-3 rounded-lg h-fit w-[220px]",
          "z-20 absolute bottom-6 left-1/2 opacity-[.95] text-sm leading-4",
          "bg-black-200 dark:bg-white-100 text-white-100 dark:text-background-200",
          )}>
            {infoText}
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div className="ml-4">{value}</div>
        {value2 && <div className="text-xs text-black-300 dark:text-gray">{value2}</div>}
      </div>

     
    </div>
  );

  return (
    <div className="p-4 h-[calc(100%-41px)] overflow-auto">
      <div className="w-full flex items-center gap-2 mb-4">
          <Image
            src={data?.image}
            alt={data?.symbol}
            width={20}
            height={20}
          />
          <div className="font-medium">{data?.name}</div>
      </div>
      <div className="flex flex-wrap gap-x-[60px] gap-y-6">
        <div className="w-full md:w-[40%] md:flex-auto">
          <Column col="Ranking" infoText="Based on the relative market value of the surrogate" value={`No. ${data?.ranking}`} />
          <Column col="Market Capitalization" infoText="Calculated by multiplying the asset's liquidity by its current price." value={data?.market_cap} />
          <Column col="Market Dominance Index" infoText="Tracks the total market capitalization of the asset relative to the total market capitalization of all assets." value={data?.market_dom_idx} />
          <Column col="Circulating Supply" infoText="The number of tokens in circulation in the market in the hands of the public." value={data?.circulating_supply} />
          <Column col="Maximum Supply" infoText="The maximum number of tokens that will exist in the asset's lifecycle." value={data?.maxium_supply} />
          <Column col="Total" infoText="The number of tokens created minus the number of tokens destroyed" value={data?.total} />
          <Column col="Issue Date" infoText="Asset Initial Offering Date" value={data?.issue_date} />
          <Column col="Historical High" infoText="The highest price this asset has reached in its trading history." value={data?.historical_high} value2={data?.historical_high_date} />
          <Column col="Historical Low" infoText="The lowest price this asset has reached in its trading history." value={data?.historical_low} value2={data?.historical_low_date} />
          <div className="hidden md:block my-2 h-[1px] bg-white-100 dark:bg-secondary" />
          <div className="mt-6 py-1.5 hidden md:flex items-start gap-1 text-xs text-black-300 dark:text-gray">
            <span>*</span>
            <span>Data is provided by CMC and is for reference only. It is presented on this basis and does not serve as any form of representation or guarantee.</span>
          </div>
        </div>

        <div className="w-full md:w-[40%] md:flex-auto">
          <div className="mb-2">Links</div>
          <div className="flex flex-wrap gap-2">
            {data?.links?.map((link: any) => (
              <Link href={link.url} className="text-xs py-[3px] px-2 bg-black-300 dark:bg-secondary rounded-md text-center" >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="mt-6">
            <div className="text-sm leading-[22px] font-medium">Intro</div>
            <div className={twMerge(
              "overflow-hidden relative ",
              viewMore ? "max-h-auto" : "max-h-[170px]"
            )}>
              <div className="flex flex-col gap-2 text-sm leading-[22px] text-black-300 dark:text-gray" dangerouslySetInnerHTML={{__html: data?.intro}} />
            </div>
              <div className="cursor-pointer text-xs font-medium text-primary mt-2" onClick={() => setViewMore(!viewMore)}>
                {
                  viewMore ? "View less" : "View more"
                }
              </div>
            <div className="mt-6 py-1.5 flex md:hidden items-start gap-1 text-xs text-black-300 dark:text-gray">
              <span>*</span>
              <span>Data is provided by CMC and is for reference only. It is presented on this basis and does not serve as any form of representation or guarantee.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}