'use client'

import { Icon } from "@/components/ui/icon"
import { SettingsItem } from "../settings-item"

export const AdvancedSecurity = () => {


  return (
    <>
      <div className="md:border border-white-100 dark:border-secondary rounded-2xl pt-6 pb-3 md:p-6 md:mb-6">
        <div className="text-lg md:text-2xl font-semibold md:mb-6">Advanced Security</div>
        <SettingsItem
          icon="users"
          title="Account Connections"
          desc="Use a third-party account, such as your Apple ID or Google account to log in to your FAZ 3 account."
          buttonText="Manage"
        />
        <SettingsItem
          icon="users"
          title="Anti-Phishing Code"
          desc="Protect your account from phishing attempts and ensure that your notification emails are from FAZ 3 only."
          buttonText="Enable"
        >
          <div className="flex items-center gap-2">
            <Icon name="close-icon" size={16} className="text-gray-300 dark:text-gray" />
            <div className="text-sm">OFF</div>
          </div>
        </SettingsItem>

        <SettingsItem
          icon="users"
          title="App Authorization"
          desc=" use your FAZ 3 Account to sign in to third party sites and apps."
          buttonText="Manage"
          isHiddenBorder
        />

      </div>
    </>
  )
}