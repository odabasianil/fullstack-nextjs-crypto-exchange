'use client'

import Image from "next/image"
import { SettingsItem } from "../settings-item"
import { Icon } from "@/components/ui/icon"
import { WarningModal } from "@/views/auth/login-password/warning-modal"
import { useState } from "react"
import { ModalButtons } from "./modal-buttons"
import { Modal } from "@/components/ui/modal"
import { twMerge } from "tailwind-merge"

const stepOptions = ['OFF', '500 USDT', '1000 USDT', '1500 USDT']
const modalProps = {
  className:"md:w-[520px] rounded-t-2xl rounded-b-none md:rounded-2xl !p-0",
  titleWrapperClass:"py-5 px-6",
  titleClass:"text-xl",
  isMobileOpen: true,
  showCloseButton: true
}

export const WithdrawalSettings = () => {
  const [openWhitelist, setOpenWhitelist] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);
  const [openStep, setOpenStep] = useState(false);
  const [isOnChain, setIsOnChain] = useState(true);
  const [selectedStep, setSelectedStep] = useState('OFF');

  return (
    <>
      <div className="md:border border-white-100 dark:border-secondary rounded-2xl pt-6 pb-3 md:p-6 md:mb-6">
        <div className="text-lg md:text-2xl font-semibold md:mb-6">Withdrawal</div>
        <SettingsItem
          title="Withdrawal Whitelist"
          desc="Once this function is enabled, your account will only be able to withdraw to addresses on your whitelist."
          buttonText="Enable"
          subLink="/"
          subLinkText="Address Management"
          onClick={() => setOpenWhitelist(true)}
        >
          <div className="flex items-center gap-2">
            <Icon name="close-icon" size={16} className="text-gray-300 dark:text-gray" />
            <div className="text-sm">OFF</div>
          </div>
        </SettingsItem>

        <SettingsItem
          title="One-step Withdrawal"
          desc="When this function is turned on, you can withdraw small amount crypto to whitelisted addresses without passing 2FA verification"
          buttonText="Enable"
          onClick={() => setOpenStep(true)}
        >
          <div className="flex items-center gap-2">
            <Icon name="close-icon" size={16} className="text-gray-300 dark:text-gray" />
            <div className="text-sm">OFF</div>
          </div>
        </SettingsItem>
        <SettingsItem
          title="Withdraw Setting"
          desc="Choose to withdraw through on-chain or off-chain transfer for applicable addresses."
          buttonText="Edit"
          isHiddenBorder
          onClick={() => setOpenSetting(true)}
        >
          <div className="text-sm font-semibold">{isOnChain ? "On-chain withdrawal" : "Off-chain withdrawal"}</div>
        </SettingsItem>
      </div>

      <WarningModal
        open={openWhitelist}
        setOpen={setOpenWhitelist}
        title="Enable Whitelist"
        titleClass="order-2 mb-4 text-2xl"
        textClass="text-center font-medium"
        icon="warning"
        description="Once this function is enabled, your account will only be able to withdraw to addresses on your whitelist."
        buttonText="Confirm"
        isCancelButton
      />

      <Modal
        title="Enable One-Step Withdrawal"
        open={openStep}
        setOpen={setOpenStep}
        {...modalProps}
      >
        <div className="px-6 pb-6 flex flex-col gap-6">
          <div>
            <div className="mb-2 text-sm text-gray-300 dark:text-white-500">24h verification-free-limit: 10000 USDT</div>
            <div className="mb-4 text-sm text-gray-300 dark:text-white-500">Quota of a single One-Step Withdrawal</div>
            <div className="flex flex-col gap-4 mb-4">
              {stepOptions?.map((step) => (
                <div className="flex items-center gap-2 text-sm cursor-pointer" onClick={() => setSelectedStep(step)}>
                  <div
                    className={twMerge(
                      "w-4 h-4 border border-white-100 dark:border-gray-200 relative rounded-full",
                      selectedStep === step && 'border-4 !border-white-100 text-black-100'
                    )}
                  >
                  </div>
                  <div>{step}</div>
                </div>
              ))}
            </div>

            <div className="bg-white-100 dark:bg-secondary p-3 flex items-start gap-1 rounded-xl">
              <Icon name="info" size={20} />
              <div className="text-sm">For the safety of your funds, even if you have enabled 2FA-free withdrawals, we may still require you to perform 2FA authentication based on your account security.</div>
            </div>
          </div>

          <ModalButtons onClick={() => setOpenSetting(false)} />
        </div>
      </Modal>

      <Modal
        title="Withdraw Setting"
        open={openSetting}
        setOpen={setOpenSetting}
        {...modalProps}
      >
        <div className="px-6 pb-6 flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div onClick={() => setIsOnChain(true)} className={twMerge(
              "cursor-pointer border border-secondary rounded-xl p-4 flex flex-col gap-2",
              isOnChain && "border-white-400"
            )}>
              <div>On-chain withdrawal</div>
              <div className="text-sm text-gray-300 dark:text-gray">Withdrawals will be sent on the blockchain.</div>
              <div className="text-sm text-gray-300 dark:text-gray">Network fees charged.</div>
            </div>
            <div onClick={() => setIsOnChain(false)} className={twMerge(
              "cursor-pointer border border-secondary rounded-xl p-4 flex flex-col gap-2",
              !isOnChain && "border-white-400"
            )}>
              <div>Off-chain withdrawal</div>
              <div className="text-sm text-gray-300 dark:text-gray">Withdrawals will be sent on the blockchain.</div>
              <div className="text-sm text-gray-300 dark:text-gray">No Network fees charged.</div>
            </div>

          </div>

          <ModalButtons onClick={() => setOpenSetting(false)} />
        </div>
      </Modal>
    </>
  )
}