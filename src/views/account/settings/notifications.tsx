'use client'

import Image from "next/image"
import { SettingsItem } from "../settings-item"
import { useState } from "react"
import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { twMerge } from "tailwind-merge"
import { Icon } from "@/components/ui/icon"
import { SwitchChecbox } from "@/components/ui/switch-checbox"
import { ModalButtons } from "./modal-buttons"

const languages = ["English", "Chinese", "Korean", "Japanese", "Russian", "Spanish", "French", "German", "Italian", "Portuguese", "Turkish", "Vietnamese", "Arabic", "Hindi", "Thai", "Bengali", "Filipino", "Indonesian", "Malay", "Dutch", "Polish", "Ukrainian", "Romanian", "Czech", "Slovak", "Hungarian", "Finnish", "Swedish", "Norwegian", "Danish", "Greek", "Bulgarian", "Serbian", "Croatian", "Slovenian", "Estonian", "Latvian", "Lithuanian", "Maltese", "Irish", "Welsh", "Scottish", "Galician", "Basque", "Catalan", "Corsican", "Luxembourgish", "Monégasque", "Moldovan", "Icelandic", "Faroese", "Greenlandic", "Albanian", "Macedonian", "Montenegrin", "Bosnian", "Kosovar", "Georgian", "Armenian", "Azerbaijani", "Kazakh", "Uzbek", "Turkmen", "Kyrgyz", "Tajik", "Tatar", "Bashkir", "Chechen", "Ingush", "Dagestani", "Kabardian", "Ossetian", "Abkhaz", "Chuvash", "Mari", "Mordvin", "Udmurt", "Komi", "Karelian", "Veps", "Votic", "Saami", "Komi-Permyak", "Khanty", "Mansi", "Nenets", "Selkup", "Chukchi", "Koryak", "Itelmen", "Yukaghir", "Nivkh", "Evenki", "Even", "Negidal", "Ulch", "Orok", "Udege", "Nanai", "Oroch", "Ainu", "Chukotko-Kamchatkan", "Eskimo-Aleut", "Yupik", "Naukan", "Sirenik", "Chaplin", "Aleut"];
const preferences = ["Activities", "Trade Notification", "FAZ 3 News", "System Messages"];

const modalProps = {
  className:"md:w-[520px] rounded-t-2xl rounded-b-none md:rounded-2xl !p-0",
  titleWrapperClass:"py-5 px-6",
  titleClass:"text-xl",
  isMobileOpen: true,
  showCloseButton: true
}

export const NotificationSettings = () => {
  const [languageModal, setLanguageModal] = useState(false)
  const [preferenceModal, setPreferenceModal] = useState(false)
  const [checked, setChecked] = useState("");
  const [notificatinChecked, setNotificationChecked] = useState(false);
  const [soundChecked, setSoundChecked] = useState(false);
  const [priceModal, setPriceModal] = useState(false);
  const [preference, setPreference] = useState(preferences);
  
  const handleCheck = (value:string) => {
    setChecked(value);
  }

  const handleCheckPreference = (value:string) => {
    if (preference.includes(value)) {
      setPreference(preference.filter((item) => item !== value));
    } else {
      setPreference([...preference, value]);
    }
  }

  return (
    <>
      <div className="md:border border-white-100 dark:border-secondary rounded-2xl pt-6 pb-3 md:p-6 md:mb-6">
        <div className="text-lg md:text-2xl font-semibold md:mb-6">Notifications</div>
        <SettingsItem
          title="Notification Language"
          desc="This will affect the language settings of E-mail and App push."
          buttonText="Edit"
          onClick={() => setLanguageModal(true)}
        >
          <div className="text-sm font-semibold">Default</div>
        </SettingsItem>

        <SettingsItem
          title="Notification Preferences"
          desc="Once configured, you will receive relevant on-site inbox notifications within the app and website."
          buttonText="Manage"
          onClick={() => setPreferenceModal(true)}
        >
          <div className="text-sm text-left md:text-right max-w-[292px] font-semibold">Activities, Trade Notification, FAZ 3 News, System Messages</div>
        </SettingsItem>
        <SettingsItem
          title="Auto Price Alert"
          desc="Once configured, you will receive alerts on the price changes of major and holding cryptos."
          buttonText="Manage"
          onClick={() => setPriceModal(true)}
          isHiddenBorder
        >
          <div className="text-sm font-semibold">Notification On, Sound On</div>
        </SettingsItem>
      </div>

      <Modal
        title="Edit Profile"
        open={languageModal}
        setOpen={setLanguageModal}
        {...modalProps}
      >
        <div className="px-6 pb-6 flex flex-col gap-6">
          <div className="mt-2 max-h-[256px] overflow-y-auto flex flex-col gap-4">
            {languages?.map((language) => (
              <div className="flex items-center gap-2 text-sm cursor-pointer" onClick={() => handleCheck(language)}>
                  <div
                  className={twMerge(
                    "w-4 h-4 border border-white-100 dark:border-gray-200 relative rounded-full",
                    checked === language && 'border-4 !border-white-100 text-black-100'
                  )}
                >
                </div>
                <div>{language}</div>
              </div>
            ))}
          </div>
          <ModalButtons onClick={() => setLanguageModal(false)} />
        </div>
      </Modal>

      <Modal
        title="Edit Profile"
        open={preferenceModal}
        setOpen={setPreferenceModal}
        {...modalProps}
      >
        <div className="px-6 pb-6 flex flex-col gap-6">
          <div className="mt-2 max-h-[256px] overflow-y-auto flex flex-col gap-4">
            {preferences?.map((item) => (
              <div className="flex items-center gap-2 text-sm cursor-pointer" onClick={() => handleCheckPreference(item)}>
                  <div
                  className={twMerge(
                    "w-4 h-4 border border-white-100 dark:border-gray-200 relative rounded",
                    preference.includes(item) && 'border-none !bg-white-100 text-black-100'
                  )}
                >
                  {preference.includes(item) && <Icon name="check" className="absolute w-full h-full" />}
                </div>
                <div>{item}</div>
              </div>
            ))}
          </div>
          <ModalButtons onClick={() => setPreferenceModal(false)} />
        </div>
      </Modal>

      <Modal
        title="Auto Price Alert"
        open={priceModal}
        setOpen={setPriceModal}
        {...modalProps}
      >
        <div className="px-6 pb-6 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <div>Notification</div>
              <div className="text-sm text-gray-300 dark:text-gray">Once open auto price alert, you will receive notifications on price changes for major and holding cryptos on website.</div>
            </div>
            <SwitchChecbox checked={notificatinChecked} setChecked={setNotificationChecked} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div>Notification sound</div>
              <div className="text-sm text-gray-300 dark:text-gray">Notification sound synchronized with price alerts.</div>
            </div>
            <SwitchChecbox checked={soundChecked} setChecked={setSoundChecked} />
          </div>
          <ModalButtons onClick={() => setPriceModal(false)} />
        </div>
      </Modal>
    </>
  )
}