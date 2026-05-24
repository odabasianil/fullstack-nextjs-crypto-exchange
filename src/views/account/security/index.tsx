import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import Link from "next/link"
import { TwoFactorView } from "./two-factor"
import { AdvancedSecurity } from "./advanced-security"
import { DeviciesActivities } from "./devices-activities"
import { AccountManagement } from "./account-management"

export const SecurityView = () => {

  return (
    <div className="p-4 md:py-0 md:px-14">
      <div className="md:border border-white-100 dark:border-secondary rounded-2xl py-4 md:p-6 mb-6">
        <div className="text-lg md:text-2xl font-semibold mb-6">Security Checkup</div>
        <div className="flex flex-col md:flex-row md:items-center mt-3 gap-6">
          <div className="flex items-center gap-2">
            <Icon name="close-icon" size={16} className="text-gray-300 dark:text-gray" />
            <div className="text-sm">Two-Factor Authentication (2FA)</div>
          </div>

          <div className="flex items-center gap-2">
            <Icon name="close-icon" size={16} className="text-gray-300 dark:text-gray" />
            <Link href="/me/settings/kyc" className="text-sm underline">Identity Verification</Link>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="close-icon" size={16} className="text-gray-300 dark:text-gray" />
            <Link href="#" className="text-sm underline">Anti-Phishing Code</Link>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="close-icon" size={16} className="text-gray-300 dark:text-gray" />
            <Link href="/me/security/address-management" className="text-sm underline">Withdrawal Whitelist</Link>
          </div>
        </div>
      </div>
      <TwoFactorView />
      <AdvancedSecurity />
      <DeviciesActivities />
      <AccountManagement />

    </div>
  )
}