'use client'

import { Card } from "@/components/ui/card"
import Link from "next/link"
import { useState } from "react"
import { twMerge } from "tailwind-merge"
import popularData from "@/data/home/popular-crypto.json"
import newData from "@/data/home/new-list.json"
import Image from "next/image"
import { Icon } from "@/components/ui/icon"
import { useTranslation } from "react-i18next"


export const CoinCard = () => {
  const [activeTab, setActiveTab] = useState('popular');
  const data = activeTab === 'popular' ? popularData : newData;
  const { t } = useTranslation();

  const handleChange = (tab: string) => {
    setActiveTab(tab);
  }

  const Tab = ({tab, text}: {tab: string; text: string}) => (
    <div
      className={twMerge(
        'cursor-pointer flex flex-col items-center hover:!text-black-100 hover:dark:!text-white-100',
        activeTab === tab && 'text-black-100 dark:text-white-100'
      )}
      onClick={() => handleChange(tab)}
    >
      <p>{text}</p>
      {activeTab === tab && <div className="w-4 h-[3px] mt-1 bg-primary-100 mx-auto" />}
    </div>
  )


  return (
    <Card className="w-full flex flex-col gap-3 lg:gap-4">
      <div className="pt-2 flex justify-center lg:justify-between items-center">
        <div className="flex gap-6 font-medium text-black-300 dark:text-gray whitespace-nowrap">
          <Tab tab="popular" text={t("home.popular")} />
          <Tab tab="new" text={t("home.new_list")} />
        </div>
        <Link href="/cryptos" className="hidden lg:flex items-center text-gray text-sm pb-2 whitespace-nowrap">
          {activeTab === 'new' ? 'Daha Fazla Coin Görüntüle' : '350+ Coinin Tümünü Gör'}
          <Icon
            name="chevron-left"
            size={16}
            className="!text-gray hover:!text-white-100 transform rotate-180 mt-[3px]"
          />
        </Link>
      </div>
      <div className="flex flex-col gap-6 lg:gap-5">
        {
          data.map((item: any, index) => (
            <div className="flex justify-between gap-5 font-medium" key={"coincard-"+index }>
              <div className="flex items-center w-[45%]">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={28}
                  height={28}
                  className="w-6 h-6 lg:w-7 lg:h-7"
                />
                <p className="pl-2 pr-1">{item.symbol}</p>
                <p className="text-sm text-gray font-normal">{item.name}</p>
              </div>
              <div className="flex flex-1 items-center justify-end">
                {item.price}
              </div>
              <div className={(twMerge(
                'flex flex-1 items-center justify-end',
                item.exchange.includes('-') ? 'text-error' : 'text-success'
              ))}>
                {item.exchange}
              </div>
            </div>
          ))
        }
      </div>
      <Link href="/cryptos" className="flex justify-center items-center lg:hidden text-gray text-sm">
        {activeTab === 'new' ? 'Daha Fazla Coin Görüntüle' : '350+ Coinin Tümünü Gör'}
        <Icon
          name="chevron-left"
          size={16}
          className="!text-gray hover:!text-white-100 transform rotate-180 mt-[3px]"
        />
      </Link>
    </Card>
  )
}