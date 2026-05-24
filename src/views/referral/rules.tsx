import { Icon } from "@/components/ui/icon"
import Link from "next/link"

export const ReferralRules = () => {

  return (
    <div className="rounded-lg bg-white-200 dark:bg-black-100 py-10 px-12 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Icon name="tip" size={32} />
          <div className="font-semibold text-lg">Rules</div>
        </div>
        <Link href="/faq" className="text-primary-100 text-sm flex items-center gap-0.5">
          FAQ
          <Icon name="chevron-left" size={14} className="rotate-180" />
        </Link>
      </div>
      <div className="text-sm">
        Share your Referral ID / link with a friend who does not have a FAZ 3 account. <br /> <br />
        Regular Task: <br />
        Referees must accumulatively deposit more than $50 within 14 days of registration. Both referrer and referee will be rewarded with a 100 USD trading fee rebate voucher each.
        <br /> <br />
        Disclaimer: You can only claim one reward per referral. For example, you will not be eligible for Referral Pro rewards if friends sign up using your [Referral Mode] ID / link.
      </div>
    </div>
  )
}