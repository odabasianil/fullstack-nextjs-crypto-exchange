'use client'

import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { useEffect, useRef, useState } from "react";
import Joyride from "react-joyride";
import { Icon } from "@/components/ui/icon";
import { VideoModal } from "@/components/ui/video-modal";
import { TradeMarket } from "@/views/trade/market";
import { Modal } from "@/components/ui/modal";
import { FutureMarket } from "./market";
import { RulesModal } from "./rules-modal";

interface FutureSubHeaderProps {
  data: FutureSubHeaderData;
  coin1: string;
  coin2: string;
}

export interface FutureSubHeaderData {
  name: string;
  link_url: string;
  link_text: string;
  price: string;
  change: string;
  high: string;
  low: string;
  volume_1: string;
  volume_2: string;
}


export const FutureSubHeader = (props: FutureSubHeaderProps) => {
  const { data, coin1, coin2 } = props;
  const [openMarket, setOpenMarket] = useState(false);
  const [visibleHigh, setVisibleHigh] = useState(true);
  const [visibleLow, setVisibleLow] = useState(true);
  const [visibleVolume1, setVisibleVolume1] = useState(true);
  const [visibleVolume2, setVisibleVolume2] = useState(true);
  const [visibleOpenInterest, setVisibleOpenInterest] = useState(true);
  const [optionPopover, setOptionPopover] = useState(false);
  const [openRules, setOpenRules] = useState(false);
  const ref = useRef(null);

  const handleClickOutside = (event: any) => {
    if (ref.current && !(ref.current as any).contains(event.target)) {
      setOptionPopover(false);
    }
  };
  
  
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!data) return;

  const Left = () => (
    <div className="flex flex-col md:flex-row md:items-center mr-2 md:mr-0 relative flex-1 md:flex-none">
      <div className="flex items-center w-1/2 md:w-full">
        <div className="hidden md:flex mr-2 border border-white-100 dark:border-secondary rounded-md w-6 h-6  items-center justify-center">
          <Icon name="star" size={16} className="text-[rgb(234,236,239)] dark:text-[rgb(71,77,87)]" />
        </div>
        <div className="md:h-12 pr-4 flex flex-col justify-around group md:cursor-pointer" onClick={() => setOpenMarket(true)}>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-1">
            <div className="flex items-center gap-0.5">
              <h1 className="text-xl font-semibold">{data?.name}</h1>
              <Icon name="chevron-down" size={16} className="md:hidden ml-1" />
            </div>
            <div className="flex items-center">
              <div className="bg-white-300 dark:bg-secondary rounded text-xs px-1">Perp</div>
              <div><Icon name="chevron-down" size={16} className="hidden md:block ml-1 text-gray-300 dark:text-gray" /></div>
              <div className="cursor-pointer" onClick={() => setOpenRules(true)}> <Icon name="book" size={12} className="text-gray-300 dark:text-gray ml-2" /></div>
            </div>
            <div className={twMerge(
              "hidden md:block invisible opacity-0 group-hover:opacity-100 group-hover:visible",
              "absolute top-[48px] left-0 w-[480px] h-max bg-white dark:bg-black-100 z-30 rounded-xl"
            )}>
              <FutureMarket />
            </div>
          </div>
        </div>
      </div>
      <div className="block mt-1 md:mt-0">
        <div className="text-[32px] h-12 flex items-center md:h-auto md:block  md:text-xl text-success">{data.price}</div>
        <div className={twMerge("text-xs", data?.change?.includes('-') ? 'text-error' : 'text-success')}>{data?.change}</div>
        <div className="mt-6 md:hidden flex flex-col justify-center gap-0.5">
          <div className="text-gray-300 dark:text-gray leading-[17px] text-xs">Funding / Countdown</div>
          <div className={twMerge("text-xs")}><span className="mr-1 text-[#D77843]">0.00094%</span>  03:25:29</div>
        </div>
      </div>
    </div>
  )
  
  const Right = () => (
    <div className="grid grid-cols-2 gap-y-2 gap-x-6 md:gap-0 md:flex items-center flex-1 md:flex-none">
      <div className="md:ml-4 flex flex-col justify-center gap-0.5">
        <div className="text-gray-300 dark:text-gray leading-[17px] text-xs">Mark</div>
        <div className={twMerge("text-xs")}>57,961.8</div>
      </div>
      <div className="md:ml-4 flex flex-col justify-center gap-0.5">
        <Link href="/en/futures/funding-history/perpetual/index?contract=BTCUSDT" className="underline text-gray-300 dark:text-gray leading-[17px] text-xs hover:dark:text-primary-100 ">Index</Link>
        <div className={twMerge("text-xs")}>57,961.8</div>
      </div>
      <div className="md:ml-4 hidden md:flex flex-col justify-center gap-0.5">
        <div className="text-gray-300 dark:text-gray leading-[17px] text-xs">Funding / Countdown</div>
        <div className={twMerge("text-xs")}><span className="mr-1 text-[#D77843]">0.00094%</span>  03:25:29</div>
      </div>
      {visibleHigh && <div className="mb-auto md:ml-4 flex flex-col justify-center gap-0.5">
        <div className="text-gray-300 dark:text-gray leading-[17px] text-xs">24h High</div>
        <div className="text-xs">{data?.high}</div>
      </div>}
      {visibleLow && <div className="mb-auto md:ml-4 flex flex-col justify-center gap-0.5">
        <div className="text-gray-300 dark:text-gray leading-[17px] text-xs">24h Low</div>
        <div className="text-xs">{data?.low}</div>
      </div>}
      {visibleVolume1 && <div className="mb-auto md:ml-4 flex flex-col justify-center gap-0.5 text-xs">
        <div className="text-gray-300 dark:text-gray leading-[17px] text-xs">24h Volume({coin1})</div>
        <div className="text-xs">{data?.volume_1}</div>
      </div>}
      {visibleVolume2 && <div className="mb-auto md:ml-4 flex flex-col justify-center gap-0.5 text-xs">
        <div className="text-gray-300 dark:text-gray leading-[17px] text-xs">24h Volume({coin2})</div>
        <div className="text-xs">{data?.volume_2}</div>
      </div>}
      {visibleOpenInterest && <div className="md:ml-4 flex flex-col justify-center gap-0.5">
        <Link href="/en/futures/funding-history/perpetual/index?contract=BTCUSDT" className="underline text-gray-300 dark:text-gray leading-[17px] text-xs hover:dark:text-primary-100 ">Open Interest({coin2})</Link>
        <div className={twMerge("text-xs")}>4,663,705,362.09</div>
      </div>}
    </div>
  )

  const Spots = () => (
    <div className="hidden md:flex items-center justify-end relative">
      <div onClick={() => setOptionPopover(true)} className="cursor-pointer"><Icon name="dots" size={16} className="text-gray-300 dark:text-gray" /></div>
      {
        optionPopover && (
          <div ref={ref} className="bg-white dark:bg-black-100 absolute w-max h-max p-2.5 rounded-xl shadow-lg top-6 right-0 2xl:left-0 z-30 flex flex-col">
            <div className="text-gray-300 dark:text-gray text-xs my-2">Ticker Preference</div>
            <div onClick={() => setVisibleHigh(!visibleHigh)} className="my-2 flex items-center gap-2 cursor-pointer text-sm">
              <div
                className={twMerge(
                  "min-w-4 h-4 border border-white-100 dark:border-gray-200 rounded relative",
                  visibleHigh && '!bg-white-100 border-none text-black-100'
                )}
              >
                {visibleHigh && <Icon name="check" className="absolute w-full h-full" />}
              </div>
              <div>24h High</div>
            </div>
            <div onClick={() => setVisibleLow(!visibleLow)} className="my-2 flex items-center gap-2 cursor-pointer text-sm">
              <div
                className={twMerge(
                  "min-w-4 h-4 border border-white-100 dark:border-gray-200 rounded relative",
                  visibleLow && '!bg-white-100 border-none text-black-100'
                )}
              >
                {visibleLow && <Icon name="check" className="absolute w-full h-full" />}
              </div>
              <div>24h Low</div>
            </div>
            <div onClick={() => setVisibleVolume1(!visibleVolume1)} className="my-2 flex items-center gap-2 cursor-pointer text-sm">
              <div
                className={twMerge(
                  "min-w-4 h-4 border border-white-100 dark:border-gray-200 rounded relative",
                  visibleVolume1 && '!bg-white-100 border-none text-black-100'
                )}
              >
                {visibleVolume1 && <Icon name="check" className="absolute w-full h-full" />}
              </div>
              <div>24h Volume ({coin1})</div>
            </div>
            <div onClick={() => setVisibleVolume2(!visibleVolume2)} className="my-2 flex items-center gap-2 cursor-pointer text-sm">
              <div
                className={twMerge(
                  "min-w-4 h-4 border border-white-100 dark:border-gray-200 rounded relative",
                  visibleVolume2 && '!bg-white-100 border-none text-black-100'
                )}
              >
                {visibleVolume2 && <Icon name="check" className="absolute w-full h-full" />}
              </div>
              <div>24h Volume ({coin2})</div>
            </div>
            <div onClick={() => setVisibleOpenInterest(!visibleOpenInterest)} className="my-2 flex items-center gap-2 cursor-pointer text-sm">
              <div
                className={twMerge(
                  "min-w-4 h-4 border border-white-100 dark:border-gray-200 rounded relative",
                  visibleOpenInterest && '!bg-white-100 border-none text-black-100'
                )}
              >
                {visibleOpenInterest && <Icon name="check" className="absolute w-full h-full" />}
              </div>
              <div>Open Interest ({coin2})</div>
            </div>
          </div>
        )
      }
    </div>
  )


  return (
    <div className="w-full h-full flex flex-col justify-between md:justify-center px-4">
      <div className="w-full flex md:items-center justify-between">
        <div className="flex items-start md:items-center py-3 md:py-0">
          <Left />
          <Right />
        </div>
        <Spots />
      </div>
      <RulesModal
        open={openRules}
        setOpen={setOpenRules}
        coin1={coin1}
        coin2={coin2}
      />
      <Modal
        open={openMarket}
        setOpen={setOpenMarket}
        title="Market"
        showCloseButton
        isMobileOpen
        className="overflow-hidden rounded-b-none px-0 !bg-white dark:!bg-black-100 h-[554px] z-[60]"
        titleClass="!text-base font-normal"
        titleWrapperClass="p-0 pb-3 px-4"
        iconSize={20}
      >
        <FutureMarket />
      </Modal>
    </div>
  )
}