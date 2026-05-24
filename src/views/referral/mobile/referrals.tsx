'use client'

import { Icon } from "@/components/ui/icon"
import { NoResult } from "@/views/crypto/payment/no-result"
import { TimeSelector } from "./time-selector"
import { useState } from "react";
import { Input } from "@/components/ui/input";

export const ReferralsMobile = () => {
  const [date, setDate] = useState(['2019-01-01', '2024-09-16']);
  const [openSearch, setOpenSearch] = useState(false);

  const handleSearch = () => {
    setOpenSearch(!openSearch);
  }

  return (
    <>
      <div className="px-4">
        <TimeSelector
          date={date}
          setDate={setDate}
        />
        <div className="p-[15px] grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs">Total Referrals</div>
            <div className="text-[32px] leading-[44px]">0</div>
          </div>
          <div>
            <div className="text-xs">Task Completed Referrals</div>
            <div className="text-[32px] leading-[44px]">0</div>
          </div>
        </div>
        <div className="mt-10 flex items-center justify-between">
          <div className="text-xl">My Referrals</div>
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
      </div>
    </>
  )
}