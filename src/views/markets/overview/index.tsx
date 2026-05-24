
import spotMarginData from '@/data/markets/overview/spot-margin-list.json'
import newListingData from '@/data/markets/overview/new-listing.json'
import futuresData from '@/data/markets/overview/futures-list.json'
import coinInfoData from '@/data/markets/overview/coin-info-list.json'
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import { TokenInfoChildren } from "./token-info-chidren";
import { Button } from "@/components/ui/button";
import { TradeList } from '@/views/crypto/payment/trade-list';
import { TokenInfo } from '@/views/crypto/payment/token-info';
import { TradeListHeader } from '@/views/crypto/payment/trade-list-header';
import { NoResult } from '@/views/crypto/payment/no-result';

export const MarketsOverviewView = ({path}: {path: string}) => {
  if (path.includes('spot_margin')) {
    const activeSymbol = path.split('-')[1];
    const list = spotMarginData.find((item) => item.symbol === activeSymbol) as any;

    return (
     <TradeList list={list} />
    )
  }

  if (path.includes('newListing')) {
    const list = newListingData;

    return (
      <TradeList list={list} />
     )
  }

  if (path.includes('futures-')) {
    const activeSymbol = path.split('-')[1];
    const list = futuresData.find((item) => item.symbol === activeSymbol) as any;

    return (
     <TradeList list={list} />
    )
  }

  if (path.includes('overview') || path.includes('coinInfo')) {
    const activeSymbol = path.split('-')[1];
    const list = coinInfoData.find((item) => item.symbol === activeSymbol) as any;

    if (list) {
      return (
        <>
          <div className="hidden md:block">
            <TokenInfo
              title={list.title}
              description={list.description}
              children={<TokenInfoChildren list={list} />}
            />
          </div>
          <TradeList list={list} />
        </>
      )
    }
  }


  return (
    <div className='w-full flex flex-col gap-6'>
      <TradeListHeader list={[]} />
      {path.includes('favorite-') ? 
        <NoResult text="No results. Go to spot market to add your favorite tokens.">
          <Button appearance="primary" className="h-10 mt-6 text-sm font-medium">
            Add Favorites
          </Button>
        </NoResult> :
        <NoResult />
    }
    </div>
  )
}