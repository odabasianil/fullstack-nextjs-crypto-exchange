'use client'

import { Icon } from "@/components/ui/icon"
import { SettingsItem } from "../settings-item"

export const AccountManagement = () => {


  return (
    <>
      <div className="md:border border-white-100 dark:border-secondary rounded-2xl pt-6 pb-3 md:p-6 md:mb-6">
        <div className="text-lg md:text-2xl font-semibold md:mb-6">Account Management</div>
        <SettingsItem
          icon="users"
          title="Disable Account"
          desc="Once the account is disabled, most of your actions will be restricted, such as logging in and trading. You can choose to unblock the account at any time. This action will not delete your account."
          buttonText="Disable"
        />

        <SettingsItem
          icon="users"
          title="Delete Account"
          desc="Please note that account deletion is irreversible. Once deleted, you will not be able to access your account or view your transaction history"
          buttonText="Delete"
          isHiddenBorder
        />

      </div>
    </>
  )
}