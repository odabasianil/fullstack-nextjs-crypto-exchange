import { Icon } from "@/components/ui/icon"
import Link from "next/link"
import { NoResult } from "../crypto/payment/no-result"
import { Button } from "@/components/ui/button"

export const MyRewards = () => {

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Icon name="tip" size={32} />
          <div className="font-semibold text-[32px] leading-10">My Rewards</div>
        </div>
        <div></div>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-auto min-w-full table-auto text-left border-collapse">
          <colgroup>
            <col className="w-[220px]" />
            <col className="w-[220px]" />
            <col className="w-[220px]" />
            <col className="w-[220px]" />
            <col className="w-[130px]" />
          </colgroup>
          <thead>
            <tr className="text-gray-300 dark:text-gray text-sm">
              <th className="py-2.5 px-4 !font-normal">ID</th>
              <th className="py-2.5 px-4 !font-normal">Distribution Date</th>
              <th className="py-2.5 px-4 !font-normal">Bonus</th>
              <th className="py-2.5 px-4 !font-normal">Reward Type</th>
              <th className="py-2.5 px-4 !font-normal text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            <td colSpan={5} className="pt-8">
              <NoResult
                text="No rewards"
                imageClass="mb-0"
              />
              <Button className="mt-8 w-full md:w-[384px] mx-auto font-semibold border-none">
                Invite Friends
              </Button>
            </td>
          </tbody>
        </table>
      </div>
    </div>
  )
}