'use client'

import { useState } from "react"
import { ReferralMenu } from "./menu"
import { ReferralInvite } from "./invite"
import { ReferralMore } from "./more"
import { ReferralsMobile } from "./referrals"
import { ReferralRewards } from "./rewards"

const tabs = [
  {
    icon: "users",
    text: 'Invite'
  },
  {
    icon: "users",
    text: 'Referrals'
  },
  {
    icon: "users",
    text: 'Rewards'
  },
  {
    icon: "users",
    text: 'More'
  }
]

export const ReferralMobileView = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].text);

  return (
    <div className="bg-white dark:bg-[#181E25] min-h-screen">
      <ReferralMenu
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {activeTab === 'Invite' && (<ReferralInvite />)}
      {activeTab === 'More' && (<ReferralMore />)}
      {activeTab === 'Referrals' && <ReferralsMobile />}
      {activeTab === 'Rewards' && <ReferralRewards />}

    </div>
  )
}