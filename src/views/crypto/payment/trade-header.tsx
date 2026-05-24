'use client'

import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import Joyride from "react-joyride";
import { Icon } from "@/components/ui/icon";
import { VideoModal } from "@/components/ui/video-modal";
import { TradeMarket } from "@/views/trade/market";
import { Modal } from "@/components/ui/modal";

interface TradeHeaderProps {
  data: TradeHeaderData;
  coin1: string;
  coin2: string;
  setActiveRun?: any
}

export interface TradeHeaderData {
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


export const TradeHeader = (props: TradeHeaderProps) => {
  const { data, coin1, coin2, setActiveRun } = props;
  const [openSpotTutorial, setOpenSpotTutorial] = useState(false);
  const [openMarket, setOpenMarket] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  if (!data) return;

  const Left = () => (
    <div className="flex flex-col md:flex-row md:items-center mr-2 md:mr-0">
      <div className="flex items-center w-1/2 md:w-full">
        <div className="mr-2 border border-white-100 dark:border-secondary rounded-md w-6 h-6 flex items-center justify-center">
          <Icon name="star" size={16} className="text-[rgb(234,236,239)] dark:text-[rgb(71,77,87)]" />
        </div>
        <div className="md:h-12 pr-4 flex flex-col justify-around">
          <div className="flex items-start md:items-center md:h-[30px] gap-1">
            <h1 className="hidden md:block text-xl font-semibold">{data?.name}</h1>
            <div className="flex md:hidden" onClick={() => setOpenMarket(true)}>
              <div>
                <h1 className="text-xl font-semibold">{data?.name?.split('/')?.[0]}</h1>
                <h1 className="text-sm font-semibold mt-1.5">/{data?.name?.split('/')?.[1]}</h1>
              </div>
              <Icon name="chevron-down" size={16} className="mt-[7px] -ml-1" />
            </div>
            <Link href={data.link_url} className="text-xs leading-[17px] underline text-gray-300 dark:text-gray">{data?.link_text}</Link>
          </div>
          <div onClick={() => setOpenModal(true)} className="hidden md:inline-block bg-[rgba(240,185,8,0.1)] rounded px-1 cursor-pointer h-4 text-xs text-primary-100">
            <div className="flex items-center">
              <div>POW</div>
              <div className="mx-[5px] opacity-[0.25]">᱾</div>
              <div>Vol</div>
              <div className="mx-[5px] opacity-[0.25]">᱾</div>
              <div className="whitespace-nowrap max-w-[70px] text-ellipsis overflow-hidden">Price Protection</div>
            </div>
          </div>
        </div>
      </div>
      <div className="block">
        <div className="text-2xl leading-9 md:text-xl text-success">{data.price}</div>
        <div className="hidden md:block text-xs">${data.price}</div>
        <div className={twMerge("text-xs md:hidden", data?.change?.includes('-') ? 'text-error' : 'text-success')}>{data?.change}</div>
      </div>
    </div>
  )
  
  const Right = () => (
    <div className="grid grid-cols-2 gap-y-4 gap-x-6 md:gap-0 md:flex items-center">
      <div className="md:mx-4 hidden md:flex flex-col justify-center gap-0.5">
        <div className="text-gray-300 dark:text-gray leading-[17px] text-[10px] md:text-xs">24h Change</div>
        <div className={twMerge("text-xs", data?.change?.includes('-') ? 'text-error' : 'text-success')}>{data?.change}</div>
      </div>
      <div className="mb-auto md:mr-4 flex flex-col justify-center gap-0.5">
        <div className="text-gray-300 dark:text-gray leading-[17px] text-[10px] md:text-xs">24h High</div>
        <div className="text-xs">{data?.high}</div>
      </div>
      <div className="mb-auto md:mr-4 flex flex-col justify-center gap-0.5 order-3">
        <div className="text-gray-300 dark:text-gray leading-[17px] text-[10px] md:text-xs">24h Low</div>
        <div className="text-xs">{data?.low}</div>
      </div>
      <div className="mb-auto md:mr-4 flex flex-col justify-center gap-0.5 text-xs order-2">
        <div className="text-gray-300 dark:text-gray leading-[17px] text-[10px] md:text-xs">24h Volume ({coin1})</div>
        <div className="text-xs">{data?.volume_1}</div>
      </div>
      <div className="mb-auto md:mr-4 flex flex-col justify-center gap-0.5 text-xs order-4">
        <div className="text-gray-300 dark:text-gray leading-[17px] text-[10px] md:text-xs">24h Volume ({coin2})</div>
        <div className="text-xs">{data?.volume_2}</div>
      </div>
    </div>
  )

  const Spots = () => (
    <div className="hidden md:flex items-center justify-end">
      <div className="cursor-pointer flex items-center gap-1 text-xs" onClick={() => setOpenSpotTutorial(true)}>
        <Icon
          name="play"
          size={16}
          className="text-gray-300 dark:text-gray"
        />
        Spot Tutorial
      </div>
      <div
        className="cursor-pointer flex items-center gap-1 text-xs ml-4"
        onClick={() => {
          setActiveRun && setActiveRun(true);
        }}>
        <Icon
          name="guidance"
          size={16}
          className="text-gray-300 dark:text-gray"
        />
        Spot Guidance
      </div>
    </div>
  )

  const TokenModal = () => {
    return (
      <Modal
        title="Token Tags"
        open={openModal}
        setOpen={setOpenModal}
        showCloseButton
        titleClass="text-xl"
        titleWrapperClass="pb-8"
        className="min-w-[346px] w-[346px] md:w-[400px] rounded-lg text-sm py-[18px] px-6 dark:!bg-background"
      >
        <div className="text-gray-300 dark:text-gray-200 mb-4">Click on a tag to learn more about it.</div>
        <div className="mb-2.5 text-gray-300 dark:text-gray font-semibold">Token Info</div>
        <div className="flex items-center mb-4 gap-4">
          <Link href="/en/markets/coinInfo-pow" target="_blank" className="flex items-center p-2 rounded bg-[#F0b9081A] !text-primary-100">
            POW <Icon name="chevron-left" className="rotate-180" size={16} />
          </Link>
          <Link href="/markets/coinInfo-Payments" target="_blank" className="flex items-center p-2 rounded bg-white-300 dark:bg-secondary text-black-300 dark:text-gray">
            Payments <Icon name="chevron-left" className="rotate-180" size={16} />
          </Link>
        </div>
        <div className="mb-2.5 text-gray-300 dark:text-gray font-semibold">Ranking</div>
        <div className="flex items-center mb-4 gap-4">
          <Link href="/markets/trading_data/rankings" target="_blank" className="flex items-center p-2 rounded bg-[#F0b9081A] !text-primary-100">
            Vol <Icon name="chevron-left" className="rotate-180" size={16} />
          </Link>
          <Link href="/markets/trading_data/rankings" target="_blank" className="flex items-center p-2 rounded bg-[#F0b9081A] !text-primary-100">
            Hot <Icon name="chevron-left" className="rotate-180" size={16} />
          </Link>
        </div>
        <div className="mb-2.5 text-gray-300 dark:text-gray font-semibold">Pair Activities</div>
        <div className="flex items-center mb-4 gap-4">
          <Link href="/en/events/asiappcaug24?utm_source=spot&utm_campaign=augppc" target="_blank" className="flex items-center p-2 rounded bg-[#F0b9081A] !text-primary-100">
            Price Protection <Icon name="chevron-left" className="rotate-180" size={16} />
          </Link>
        </div>
      </Modal>
    )
  }

  return (
    <div className="w-full h-full flex flex-col justify-between md:justify-center px-4">
      <div className="w-full flex md:items-center justify-between">
        <div className="flex items-start md:items-center py-3 md:py-0">
          <Left />
          <Right />
        </div>
        <Spots />
      </div>
       <div onClick={() => setOpenModal(true)} className="inline-block md:hidden bg-[rgba(240,185,8,0.1)] rounded px-1 cursor-pointer h-4 text-xs text-primary-100 w-min">
        <div className="flex items-center">
          <div>POW</div>
          <div className="mx-[5px] opacity-[0.25]">᱾</div>
          <div>Vol</div>
          <div className="mx-[5px] opacity-[0.25]">᱾</div>
          <div className="whitespace-nowrap max-w-[70px] text-ellipsis overflow-hidden">Price Protection</div>
        </div>
      </div>
      <VideoModal
        open={openSpotTutorial}
        setOpen={setOpenSpotTutorial}
        title="Welcome to FAZ 3 Spot"
        poster="/images/spot-tutorial.webp"
        video="/video.mp4"
      />
      <TokenModal />
      <Modal
        open={openMarket}
        setOpen={setOpenMarket}
        title="Market"
        showCloseButton
        isMobileOpen
        className="overflow-hidden rounded-b-none px-0 !bg-white dark:!bg-black-100 h-[461px] z-[60]"
        titleClass="!text-base font-normal"
        titleWrapperClass="p-0 pb-3 px-4"
        iconSize={20}
      >
        <TradeMarket />
      </Modal>
    </div>
  )
}