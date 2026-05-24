'use client'

import { Icon } from "@/components/ui/icon"
import { NoResult } from "@/views/crypto/payment/no-result"
import { TimeSelector } from "./time-selector"
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";

export const ReferralRewards = () => {
  const [date, setDate] = useState(['2019-01-01', '2024-09-16']);
  const [openSearch, setOpenSearch] = useState(false);

  const handleSearch = () => {
    setOpenSearch(!openSearch);
  }


  return (
    <>
      <div className="pb-[125px] px-4">
        <TimeSelector
          date={date}
          setDate={setDate}
        />
        <div className="px-4 py-1 my-4">
          <div className="text-xs flex items-center">
            Total Rewards (USD) <Icon name="info" size={16} className="text-gray-300 dark:text-gray ml-2" />
          </div>
          <div className="leading-10 mt-1 text-[32px]">0</div>
          <div className="text-sm text-gray-300 dark:text-gray">≈ $0</div>
        </div>

        <div className="my-4 border border-white-100 dark:border-secondary rounded-2xl py-3 px-4 flex items-center gap-3">
          <Icon name="no-sms-code" size={24} className="" />
          <div>
            <div className="text-sm font-semibold">Your Rewards</div>
            <div className="text-xs flex gap-1">Claim your rewards from the <Link href="/" className="text-primary-100 font-semibold">Reward Hub</Link></div>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between">
          <div className="text-xl">My Rewards</div>
          <div onClick={handleSearch}>
            <Icon name="search" size={20} className="text-gray-300 dark:text-gray" />
          </div>
        </div>
        {
          openSearch && (
            <div className="w-full">
              <Input
                placeholder="Search by UID or Note"
                label={<Icon name="search" size={16} className="text-gray-300 dark:text-gray" />}
                className="my-2 pl-10 text-sm rounded-3xl"
              />
            </div>
          )
        }
        <div className="py-16">
          <NoResult
            text="No data."
            width={96}
            height={96}
            imageClass="mb-0"
          />
        </div>

        <div className="my-4">
          <div className="flex items-center justify-between mb-4">
            <div className="font-semibold text-xl">Activity History</div>
            <Link href="/" className="text-primary-100 font-semibold flex items-center gap-1">More <Icon name="chevron-left" className="rotate-180" /></Link>
          </div>
          <Image src="/images/referral/referral-mobile-banner.png" width={375} height={100} alt="banner" className="rounded-2xl" />
        </div>
      </div>
    </>
  )
}