'use client'

import Image from "next/image"
import { SettingsItem } from "../settings-item"
import { Icon } from "@/components/ui/icon"
import { useState } from "react"
import { ThemeSwitcher } from "@/components/ui/theme-switcher"
import { twMerge } from "tailwind-merge"
import { SwitchChecbox } from "@/components/ui/switch-checbox"
import { Button } from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"
import { ModalButtons } from "./modal-buttons"

const modalProps = {
  className:"md:w-[520px] rounded-t-2xl rounded-b-none md:rounded-2xl !p-0",
  titleWrapperClass:"py-5 px-6",
  titleClass:"text-xl",
  isMobileOpen: true,
  showCloseButton: true
}

const times = ['Last 24 hours', 'UTC +3, 00:00 (Current)', 'UTC +12, 00:00', 'UTC +3, 00:00', 'UTC +12, 00:00', 'UTC +3, 00:00', 'UTC +12, 00:00', 'UTC +3, 00:00', 'UTC +12, 00:00', 'UTC +3, 00:00', 'UTC +12, 00:00', 'UTC +3, 00:00', 'UTC +12, 00:00', 'UTC +3, 00:00', 'UTC +12, 00:00', 'UTC +3, 00:00', 'UTC +12, 00:00', 'UTC +3, 00:00', 'UTC +12, 00:00', 'UTC +3, 00:00', 'UTC +12, 00:00', 'UTC +3, 00:00', 'UTC +12, 00:00']

export const PreferenceSettings = () => {
  const [theme, setTheme] = useState<string>('dark');
  const [checked, setChecked] = useState<boolean>(false);
  const [colorModal, setColorModal] = useState(false);
  const [styleModal, setStyleModal] = useState(false);
  const [timeModal, setTimeModal] = useState(false);
  const [selectedTime, setSelectedTime] = useState('Last 24 hours');
  const [shortcutModal, setShortcutModal] = useState(false);

  return (
    <>
      <div className="md:border border-white-100 dark:border-secondary rounded-2xl pt-6 pb-3 md:p-6 md:mb-6">
        <div className="text-lg md:text-2xl font-semibold md:mb-6">Preferences</div>
        <SettingsItem
          title="Color Preference"
          buttonText="Edit"
          onClick={() => setColorModal(true)}
        >
          <div className="flex items-center gap-2">
            <Icon name="change" size={20} />
            <div className="text-sm font-semibold">Green Up / Red Down</div>
          </div>
        </SettingsItem>

        <SettingsItem
          title="Style Settings"
          buttonText="Manage"
          onClick={() => setStyleModal(true)}
        >
          <div className="text-sm flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 rounded bg-green" />
              <div className="w-4 h-4 rounded bg-error" />
            </div>
            Fresh
          </div>
        </SettingsItem>
        <SettingsItem
          title="UTC Time Zone"
          buttonText="Manage"
          onClick={() => setTimeModal(true)}
        >
          <div className="text-sm font-semibold">Last 24 hours</div>
        </SettingsItem>
        <SettingsItem
          title="Shortcuts"
        >
          <SwitchChecbox checked={checked} setChecked={setChecked} />
        </SettingsItem>
        <SettingsItem
          title="Theme"
          isHiddenBorder
        >
          <div className="text-sm font-semibold">Dark</div>
          <ThemeSwitcher theme={theme} setTheme={setTheme} />
        </SettingsItem>
      </div>

      <Modal
        title="Color Preference"
        open={colorModal}
        setOpen={setColorModal}
        {...modalProps}
      >
        <div className="px-6 pb-6 flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div className="border border-white-400 rounded-xl p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Icon name="change" size={20} />
                <div className="text-sm">Green Up / Red Down</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-full w-5 h-5 bg-white-100 dark:bg-secondary" />
                  <div className="rounded-md w-20 h-4 bg-white-100 dark:bg-secondary" />
                </div>
                <div className="text-green text-sm font-semibold">+4.15%</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-full w-5 h-5 bg-white-100 dark:bg-secondary" />
                  <div className="rounded-md w-20 h-4 bg-white-100 dark:bg-secondary" />
                </div>
                <div className="text-error text-sm font-semibold">-3.21%</div>
              </div>
            </div>

            <div className="border border-secondary rounded-xl p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Icon name="change" size={20} />
                <div className="text-sm">Red Up / Green Down</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-full w-5 h-5 bg-white-100 dark:bg-secondary" />
                  <div className="rounded-md w-20 h-4 bg-white-100 dark:bg-secondary" />
                </div>
                <div className="text-error text-sm font-semibold">+4.15%</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-full w-5 h-5 bg-white-100 dark:bg-secondary" />
                  <div className="rounded-md w-20 h-4 bg-white-100 dark:bg-secondary" />
                </div>
                <div className="text-green text-sm font-semibold">-3.21%</div>
              </div>
            </div>
          </div>

          <ModalButtons onClick={() => setColorModal(false)} />
        </div>
      </Modal>

      <Modal
        title="Style Settings"
        open={styleModal}
        setOpen={setStyleModal}
        {...modalProps}
      >
        <div className="px-6 pb-6 flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div className="border border-white-400 rounded-xl p-4 flex flex-col gap-2">
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 rounded bg-[#74A700]" />
                <div className="w-4 h-4 rounded bg-[#E50370]" />
                <div className="ml-1.5 text-sm">Traditional</div>
              </div>
              <Image src="/images/color.svg" width="400" height="100" alt="img" className="w-full h-auto" />
            </div>

            <div className="border border-secondary rounded-xl p-4 flex flex-col gap-2">
              <div className="flex items-center gap-0.5">
                <div className="w-4 h-4 rounded bg-green" />
                <div className="w-4 h-4 rounded bg-error" />
                <div className="ml-1.5 text-sm">Fresh</div>
              </div>
              <Image src="/images/color.svg" width="400" height="100" alt="img" className="w-full h-auto" />
            </div>
          </div>

          <ModalButtons onClick={() => setStyleModal(false)} />
        </div>
      </Modal>
    

      
      <Modal
        title="UTC Time Zone"
        open={timeModal}
        setOpen={setTimeModal}
        {...modalProps}
      >
        <div className="px-6 pb-6 flex flex-col gap-6">
          <div className="mt-2 max-h-[256px] overflow-y-auto flex flex-col gap-4">
            {times?.map((time) => (
              <div className="flex items-center gap-2 text-sm cursor-pointer" onClick={() => setSelectedTime(time)}>
                  <div
                  className={twMerge(
                    "w-4 h-4 border border-white-100 dark:border-gray-200 relative rounded-full",
                    selectedTime === time && 'border-4 !border-white-100 text-black-100'
                  )}
                >
                </div>
                <div>{time}</div>
              </div>
            ))}
          </div>
          <ModalButtons onClick={() => setTimeModal(false)} />
        </div>
      </Modal>
    </>
  )
}