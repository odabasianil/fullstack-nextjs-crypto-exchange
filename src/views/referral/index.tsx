import { ReferralDesktopBanner } from "./desktop-banner"
import { ReferralOverview } from "./overview"
import { MyReferrrals } from "./referrals"
import { MyRewards } from "./rewards"
import { ReferralRules } from "./rules"
import { ReferralTips } from "./tips"

export const ReferralView = () => {

  return (
    <>
      <ReferralDesktopBanner />
      <div className="rounded-t-2xl pt-8 pb-12 container mx-auto max-w-[1248px] w-full">
        <ReferralTips />
        <ReferralRules />
        <ReferralOverview />
        <MyRewards />
        <MyReferrrals />
      </div>
    </>
  )
}