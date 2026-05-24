'use client'

import { Icon } from "@/components/ui/icon"
import { SettingsItem } from "../settings-item"
import { useRouter } from "next/navigation";

export const TwoFactorView = () => {
const router = useRouter();


  return (
    <>
      <div className="md:border border-white-100 dark:border-secondary rounded-2xl pt-6 pb-3 md:p-6 md:mb-6">
        <div className="text-lg md:text-2xl font-semibold md:mb-6">Two-Factor Authentication (2FA)</div>
        <SettingsItem
          icon="users"
          title="Passkeys (Biometrics)"
          desc="Protect your account and withdrawals with Passkeys and/or security keys, such as Yubikey."
          subLink="#"
          subLinkText="Having trouble?"
          buttonText="Manage"
          onClick={() => router.push('/security/manage-yubikey-authenticator')}
        >
          <div className="flex items-center gap-2">
            <Icon name="close-icon" size={16} className="text-gray-300 dark:text-gray" />
            <div className="text-sm">OFF</div>
          </div>
        </SettingsItem>

        <SettingsItem
          icon="users"
          title="Authenticator App"
          desc="Use FAZ 3/Google Authenticator to protect your account and transactions."
          buttonText="Manage"
          onClick={() => router.push('/security/manage-google-authenticator')}
        >
          <div className="flex items-center gap-2">
            <Icon name="close-icon" size={16} className="text-gray-300 dark:text-gray" />
            <div className="text-sm">OFF</div>
          </div>
        </SettingsItem>

        <SettingsItem
          icon="users"
          title="Email"
          desc="Use your email to protect your account and transactions."
          buttonText="Manage"
          onClick={() => router.push('/security/manage-email-address')}
        >
          <div className="flex items-center gap-2">
            <Icon name="close-icon" size={16} className="text-gray-300 dark:text-gray" />
            <div className="text-sm">OFF</div>
          </div>
        </SettingsItem>

        <SettingsItem
          icon="users"
          title="Phone Number"
          desc="Use your phone number to protect your account and transactions."
          buttonText="Manage"
          onClick={() => router.push('/security/manage-sms-authenticator')}
        >
          <div className="flex items-center gap-2">
            <Icon name="check" size={16} className="text-green" />
            <div className="text-sm">534****790</div>
          </div>
        </SettingsItem>

        <SettingsItem
          icon="users"
          title="Login Password"
          desc="Login password is used to log in to your account."
          buttonText="Manage"
          isHiddenBorder
        />

      </div>
    </>
  )
}