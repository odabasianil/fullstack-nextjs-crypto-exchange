'use client'
import { EstimatedBalance } from "@/components/ui/estimated-balance"
import { Announcements } from "@/views/account/dashboard/announcements"
import { MarketsDiscover } from "@/views/account/dashboard/markets-discover"
import { AccountSquare } from "@/views/account/dashboard/square"
import { UserInfo } from "@/views/account/user-info"

export default function Account() {
  return (
    <>
      <UserInfo />
      <EstimatedBalance />
      <MarketsDiscover />
      <div className="w-full flex flex-col md:flex-row gap-6 justify-between">
        <div className="flex-1 w-full">
          <AccountSquare />
        </div>
        <div className="w-full lg:w-[39%]">
          <Announcements />
        </div>
      </div>
    </>
  )
}