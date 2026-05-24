import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import Image from "next/image"

export const ReferralMore = () => {

  return (
    <>
      <div className="px-8 pt-6 pb-[125px]">
        <div>
          <Image alt="more" src="/images/referral-more.png" width={313} height={123} />
          <div className="font-semibold text-2xl mt-8 text-center mx-auto">Become a KOL</div>
          <div className="mt-2 text-center">Join the "FAZ 3 KOL program today, enjoy exclusive campaigns and up to 50% commission rebate</div>
          <Button className="mt-8 rounded-3xl w-full mx-auto">Join Now</Button>
        </div>
        <div className="mt-10">
          <div className="flex items-center justify-between">
            <div className="text-sm">Top 24H Commission Earners</div>
            <Icon name="chevron-left" size={16} className="rotate-180 text-gray-300 dark:text-gray" />
          </div>
          <div className="mt-5 flex flex-col gap-5">
              {new Array(3).fill(null).map((_) => (<div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon name="user" size={18} />
                  <div className="text-sm">ID 42*****24</div>
                </div>
                <div className="text-sm">3.83824328 BTC</div>
              </div>))}
            </div>
        </div>
      </div>
    </>
  )
}