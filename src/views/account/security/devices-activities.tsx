'use client'

import { Icon } from "@/components/ui/icon"
import { SettingsItem } from "../settings-item"

export const DeviciesActivities = () => {


  return (
    <>
      <div className="md:border border-white-100 dark:border-secondary rounded-2xl pt-6 pb-3 md:p-6 md:mb-6">
        <div className="text-lg md:text-2xl font-semibold md:mb-6">Devices and Activities</div>
        <SettingsItem
          icon="users"
          title="My Devices"
          desc="Manage devices that have login status, and view your device history."
          buttonText="Manage"
        />

        <SettingsItem
          icon="users"
          title="Account Activity"
          desc="Last login: 2024-09-12 20:18:14"
          subLink="/faq"
          subLinkText="Disable Account"
          buttonText="More"
          isHiddenBorder
        />

      </div>
    </>
  )
}