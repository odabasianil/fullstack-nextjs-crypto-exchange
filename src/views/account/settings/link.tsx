'use client'

import { useState } from "react"
import { SettingsItem } from "../settings-item"
import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"

const modalProps = {
  className: "md:w-[520px] rounded-t-2xl rounded-b-none md:rounded-2xl !p-0",
  titleWrapperClass: "py-5 px-6",
  titleClass: "text-xl",
  isMobileOpen: true,
  showCloseButton: true
}

export const LinkSettings = () => {
  const [linkModal, setLinkModal] = useState(false)

  return (
    <>
      <div className="md:border border-white-100 dark:border-secondary rounded-2xl pt-6 pb-3 md:p-6 md:mb-6">
        <div className="text-lg md:text-2xl font-semibold md:mb-6">Link Account</div>
        <SettingsItem
          title="Link X Account"
          desc="Link your X Account to FAZ 3"
          buttonText="Link"
          isHiddenBorder
          onClick={() => setLinkModal(true)}
        >
          <div className="text-sm font-semibold max-w-[288px]">Not Linked</div>
        </SettingsItem>
      </div>

      <Modal
        title="Connect your X"
        open={linkModal}
        setOpen={setLinkModal}
        {...modalProps}
      >
        <div className="px-6 pb-6 flex flex-col gap-6">
          <div className="twitter-connect-panel"><p className="typography-Body3">After clicking on the Connect button below, you will be redirected to the Twitter homepage to complete authorization for linking your account.</p><p className="typography-Body3">By connecting your Twitter account to your FAZ 3 UID, you will link your Twitter account to your FAZ 3 account, enabling us access to your:</p><ul className="typography-Body3 twitter-connect-panel_list"><li>Twitter profile information</li><li>Tweets from your timeline (including protected Tweets)</li><li>Lists and collections. We will also be able to see your preferences (for example, accounts you follow, mute, and block).</li></ul><p className="typography-subtitle3 twitter-connect-panel_tip">You can delink the accounts at any time.</p><div className="dialog-split-line"></div><div className="bn-checkbox bn-checkbox__square data-size-md"><div className="bn-checkbox-icon"></div>I understand, agree, and consent to the terms above.</div></div>

          <Button className="w-full h-12 rounded-xl font-semibold" onClick={() => setLinkModal(false)}>Connect Account</Button>
        </div>
      </Modal>
    </>
  )
}