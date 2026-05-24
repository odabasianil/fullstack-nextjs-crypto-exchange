'use client'

import { Icon } from "@/components/ui/icon"
import Link from "next/link"
import { NoResult } from "../crypto/payment/no-result"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { twMerge } from "tailwind-merge"

export const MyReferrrals = () => {
  const tabs = ['All', 'Successful', 'Rejected']
  const [activeTab, setActiveTab] = useState(tabs[0])

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="flex items-center gap-2">
          <Icon name="tip" size={32} />
          <div className="font-semibold text-[32px] leading-10">My Referrals</div>
        </div>
      </div>
      <div className="relative overflow-x-auto">
        <div className="flex gap-4 mb-6">
          {tabs.map((tab) => (
            <div
              className={twMerge(
                "cursor-pointer bg-white-100 dark:bg-secondary rounded py-1.5 px-4 font-semibold text-gray-300 dark:text-gray text-sm",
                activeTab === tab && "text-black-100 dark:text-white-100"
              )}
              onClick={() => handleTabChange(tab)}
              >
                {tab}
            </div>)
          )}
        </div>
        <table className="w-auto min-w-full table-auto text-left border-collapse">
          <colgroup>
          </colgroup>
          <thead>
            <tr className="text-gray-300 dark:text-gray text-sm ">
              <th className="py-2.5 px-4 !font-normal">ID</th>
              <th className="py-2.5 px-4 !font-normal">Registered</th>
              <th className="py-2.5 px-4 !font-normal">Task completed</th>
            </tr>
          </thead>
          <tbody>
            <td colSpan={5} className="pt-8">
              <NoResult
                text="No referrals"
                imageClass="mb-0"
              />
              <Button className="mt-8 w-full md:w-[384px] mx-auto font-semibold border-none">
                Invite Friends
              </Button>
            </td>
          </tbody>
        </table>
      </div>
      <div className="mt-6 text-xs text-gray-300 dark:text-gray-100">As per our Terms of Use and in compliance with local regulations, any user that is a resident in Singapore that you have previously referred will be removed from your referral list. You will also not be able to refer new users who are resident in Singapore.</div>
    </div>
  )
}