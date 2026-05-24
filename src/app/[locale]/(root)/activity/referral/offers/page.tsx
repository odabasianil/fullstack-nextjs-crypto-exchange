"use client";
import { ReferralView } from "@/views/referral";
import { ReferralMobileView } from "@/views/referral/mobile";

export default function Referral() {

  return (
    <>
      <div className="hidden md:block">
        <ReferralView />
      </div>
      <div className="block md:hidden">
        <ReferralMobileView />
      </div>
    </>
  )
}
