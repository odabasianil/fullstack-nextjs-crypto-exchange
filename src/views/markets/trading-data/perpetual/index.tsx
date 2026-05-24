'use client'

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import Select from "@/components/ui/select";
import { useEffect, useState } from "react"
import { twMerge } from "tailwind-merge";
import { TradeFilter } from "../trade-filter";
import data from '@/data/markets/trading-data/futures-list.json';
import { FuturesChart } from "../futures-chart";

export const PerpetualView = () => {
  const [layout, setLayout] = useState(1);
  const options = [
    { label: 'BTCUSDX Perpetual' },
    { label: 'ETHUSD Perpetual' },
    { label: 'LINKUSD Perpetual' },
    { label: 'BNBUSD Perpetual' },
    { label: 'TRXUSD Perpetual' },
    { label: 'ADAUSD Perpetual' },
    { label: 'XRPUSD Perpetual' },
    { label: 'DOTUSD Perpetual' },
    { label: 'LTCUSD Perpetual' },
    { label: 'BCHUSD Perpetual' },
  ];
  

  useEffect(() => {
    const userAgent = typeof window.navigator === "undefined" ? "" : navigator.userAgent;
    const isMobileDevice = Boolean(
      /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(userAgent)
    );

    if (isMobileDevice) {
      setLayout(2)
    }
  }, [layout])

  return (
    <div className="p-4 md:p-0">
      <TradeFilter
        options={options} 
        layout={layout}
        setLayout={setLayout}
      />
      <div className={twMerge(
        'grid grid-cols-1 gap-8',
        layout === 2 && 'md:grid-cols-2 md:gap-y-6 md:gap-x-12',
      )}>
        {
          data.map((item) => (
            <FuturesChart
              item={item}
              layout={layout}
            />
          ))
        }
      </div>
    </div>
  )
}