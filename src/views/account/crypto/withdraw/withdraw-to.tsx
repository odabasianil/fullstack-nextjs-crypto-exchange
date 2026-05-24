'use client'

import { useState } from "react"
import { twMerge } from "tailwind-merge"
import { WithdrawToUser } from "./withdraw-to-user"
import { WithdrawToAddress } from "./withdraw-to-address"
import { useTranslation } from "react-i18next"

export const WithdrawTo = (props: any) => {
  const {
    address,
    setAddress,
    networks,
    selectedNetwork,
    setSelectedNetwork,
    selectedAddress,
    whitelist,
    initWhitelist,
    tag,
    setTag
  } = props;
  const { t } = useTranslation();
  const tabs = [t('withdraw.address'), t('withdraw.faz3_user')]
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <>
      <div className="flex items-start gap-6">
        {
          tabs.map((tab) => (
            <div
              onClick={() => {
                setActiveTab(tab)
                setAddress('')
              }}
              className={twMerge(
                'cursor-pointer text-base font-semibold pt-2 pb-1 text-gray-300 dark:text-gray',
                activeTab === tab && 'text-black-100 dark:text-white-100'
              )}
            >
              {tab}
              {activeTab === tab && <div className="h-[3px] w-5 bg-primary mt-1 mx-auto" />}
            </div>
          ))
        }
      </div>
      <div className="w-full mt-2">
        {
          activeTab === t('withdraw.address') && (
            <WithdrawToAddress
              whitelist={whitelist}
              networks={networks}
              selectedNetwork={selectedNetwork}
              setSelectedNetwork={setSelectedNetwork}
              address={address}
              setAddress={setAddress}
              initWhitelist={initWhitelist}
              selectedAddress={selectedAddress}
              tag={tag}
              setTag={setTag}
            />
          )
        }
        {
          activeTab === t('withdraw.faz3_user') && (
            <WithdrawToUser />
          )
        }
      </div>
    </>
  )
}