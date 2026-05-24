import { ProfileSettings } from "./profile"
import { NotificationSettings } from "./notifications"
import { PreferenceSettings } from "./preferences"
import { WithdrawalSettings } from "./withdrawal"
import { PrivacySettings } from "./privacy"
import { TradeSettings } from "./trade"
import { LinkSettings } from "./link"

export const SettingsView = () => {

  return (
    <div className="p-4 md:py-0 md:px-14">
      <ProfileSettings />
      <NotificationSettings />
      <PreferenceSettings />
      <WithdrawalSettings />
      <TradeSettings />
      <LinkSettings />
      <PrivacySettings />

    </div>
  )
}