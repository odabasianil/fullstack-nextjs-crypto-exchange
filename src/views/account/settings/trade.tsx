'use client'

import { useState } from "react";
import { SettingsItem } from "../settings-item"
import { Modal } from "@/components/ui/modal";
import { ModalButtons } from "./modal-buttons";
import { Icon } from "@/components/ui/icon";
import { twMerge } from "tailwind-merge";
import { SwitchChecbox } from "@/components/ui/switch-checbox";

const modalProps = {
  className:"md:w-[520px] rounded-t-2xl rounded-b-none md:rounded-2xl !p-0",
  titleWrapperClass:"py-5 px-6",
  titleClass:"text-xl",
  isMobileOpen: true,
  showCloseButton: true
}

const preferences = ["Limit Order", "Market Order", "Stop-Limit Order", "Auto Borrow/Repay for Margin"];
export const TradeSettings = () => {
  const [openOrderModal, setOpenOrderModal] = useState(false);
  const [openFeeModal, setOpenFeeModal] = useState(false);
  const [checks, setChecks] = useState(preferences);
  const [feeChecked, setFeeChecked] = useState(false);
  const [marginChecked, setMarginChecked] = useState(false);
  const [futureChecked, setFutureChecked] = useState(false);

  const handleCheck = (value:string) => {
    if (checks.includes(value)) {
      setChecks(checks.filter((item) => item !== value));
    } else {
      setChecks([...checks, value]);
    }
  }
  return (
    <>
      <div className="md:border border-white-100 dark:border-secondary rounded-2xl pt-6 pb-3 md:p-6 md:mb-6">
        <div className="text-lg md:text-2xl font-semibold md:mb-6">Trade</div>
        <SettingsItem
          title="Order Confirmation Reminders"
          desc="If the order reminder function is enabled, it will need to be reconfirmed every time an order is submitted."
          buttonText="Manage"
          onClick={() => setOpenOrderModal(true)}
        >
          <div className="text-sm md:text-right font-semibold max-w-[288px]">Stop-Limit Order, Auto Borrow/Repay for Margin</div>
        </SettingsItem>

        <SettingsItem
          title="Fee Deduction"
          desc="Use BNB to pay fees"
          buttonText="Manage"
          isHiddenBorder
          onClick={() => setOpenFeeModal(true)}
        >
          <div className="text-sm font-semibold">Spot fees</div>
        </SettingsItem>
      </div>

      <Modal
        title="Order Confirmation Reminders"
        open={openOrderModal}
        setOpen={setOpenOrderModal}
        {...modalProps}
      >
        <div className="px-6 pb-6 flex flex-col gap-6">
          <div className="mt-2 max-h-[256px] overflow-y-auto flex flex-col gap-4">
            {preferences?.map((preference) => (
              <div className="flex items-center gap-2 text-sm cursor-pointer" onClick={() => handleCheck(preference)}>
                  <div
                  className={twMerge(
                    "w-4 h-4 border border-white-100 dark:border-gray-200 relative rounded",
                    checks.includes(preference) && 'border-none !bg-white-100 text-black-100'
                  )}
                >
                  {checks.includes(preference) && <Icon name="check" className="absolute w-full h-full" />}
                </div>
                <div>{preference}</div>
              </div>
            ))}
          </div>
          <ModalButtons onClick={() => setOpenOrderModal(false)} />
        </div>
      </Modal>

      <Modal
        title="Fee Deduction"
        open={openFeeModal}
        setOpen={setOpenFeeModal}
        {...modalProps}
      >
        <div className="px-6 pb-6 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <div>Use BNB to pay fees</div>
              <div className="text-sm text-gray-300 dark:text-gray">Enjoy 25% discount</div>
            </div>
            <SwitchChecbox checked={feeChecked} setChecked={setFeeChecked} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div>Use BNB to pay Margin interests</div>
              <div className="text-sm text-gray-300 dark:text-gray">Enjoy 5% discount</div>
            </div>
            <SwitchChecbox checked={marginChecked} setChecked={setMarginChecked} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div>Use BNB to pay USDⓈ-M Futures fees</div>
              <div className="text-sm text-gray-300 dark:text-gray">Enjoy 10% discount</div>
            </div>
            <SwitchChecbox checked={futureChecked} setChecked={setFutureChecked} />
          </div>
          <ModalButtons onClick={() => setOpenFeeModal(false)} />
        </div>
      </Modal>
    </>
  )
}