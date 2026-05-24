'use client'

import { Icon } from "@/components/ui/icon"
import { SettingsItem } from "../settings-item"
import { useState } from "react"

export const PrivacySettings = () => {
  const [analytics, setAnalytics] = useState(true)
  const [advertising, setAdvertising] = useState(true)

  return (
    <>
      <div className="md:border border-white-100 dark:border-secondary rounded-2xl pt-6 pb-3 md:p-6 md:mb-6">
        <div className="text-lg md:text-2xl font-semibold md:mb-6">Privacy</div>
        <SettingsItem
          title="Analytics"
          desc="FAZ 3 may share usage data to 3rd party analytics platforms to help improve our products and marketing."
          buttonText={analytics ? "Disable" : "Enable"}
          onClick={() => setAnalytics(!analytics)}
        >
          <div className="flex items-center gap-2">
            {analytics ? <Icon name="check" size={16} className="text-green" /> : <Icon name="close-icon" size={16} className="text-gray-300 dark:text-gray" />}
            <div className="text-sm">{analytics ? "On" : "Off"}</div>
          </div>
        </SettingsItem>

        <SettingsItem
          title="Advertising"
          desc="FAZ 3 may share usage data to 3rd party ad platforms to help improve our targeting and marketing quality"
          buttonText={advertising ? "Disable" : "Enable"}
          isHiddenBorder
          onClick={() => setAdvertising(!advertising)}
        >
          <div className="flex items-center gap-2">
            {advertising ? <Icon name="check" size={16} className="text-green" /> : <Icon name="close-icon" size={16} className="text-gray-300 dark:text-gray" />}
            <div className="text-sm">{advertising ? "On" : "Off"}</div>
          </div>
        </SettingsItem>
      </div>
    </>
  )
}