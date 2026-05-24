'use client'

import { Button } from "@/components/ui/button";
import { HelpText } from "@/components/ui/help-text";
import { Icon } from "@/components/ui/icon";
import { RightModal } from "@/components/ui/right-modal";
import Select from "@/components/ui/select";
import Image from "next/image";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export const FutureAccount = (props: {coin1: string; coin2: string}) => {
  const { coin1, coin2 } = props;
  const [openAssetModal, setOpenAssetModal] = useState(false);
  const [assetMode, setAssetMode] = useState('Single-Asset Mode');


  return (
    <>
      <div className="h-[44px] px-4 border-b border-b-white-300 dark:border-b-secondary text-sm flex items-center font-semibold">Account</div>

      <div className="px-4 pt-4">
        <div className="text-xs mb-2.5">Margin Ratio</div>
        <div className="flex items-center justify-between mb-1 text-xs">
          <div className="text-gray-300 dark:text-gray relative group cursor-help">
            Margin Ratio
            <HelpText>Margin Ratio = Maintenance Margin / Margin Balance. Your positions will be liquidated once Margin Ratio reaches 100%.</HelpText>
          </div>
          <div className="flex items-center gap-0.5">
            <Icon
              name="ratio"
              size={20}
            />
            <div className="text-green">0.00%</div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-1 text-xs">
          <div className="text-gray-300 dark:text-gray relative group cursor-help">
            Maintenance Margin
            <HelpText>The minimum amount of margin balance required to keep your open positions.</HelpText>
          </div>
          <div className="">0.0000 {coin2}</div>
        </div>
        <div className="flex items-center justify-between text-xs">
          <div className="text-gray-300 dark:text-gray relative group cursor-help">
            Margin Balance
            <HelpText>Margin Balance = Wallet Balance + Unrealized PNL. Your positions will be liquidated once Margin Balance = Maintenance Margin.</HelpText>
          </div>
          <div className="">0.0000 {coin2}</div>
        </div>
        <Button
          className="border-none text-white h-6 w-full text-xs mt-2.5 !bg-secondary"
          onClick={() => setOpenAssetModal(true)}
        >
          {assetMode}
        </Button>

        <div className="h-[1px] w-full bg-white-300 dark:bg-secondary my-2.5" />
        <div className="mb-2.5">
          <Select
            options={[{label:'USDT', value:'USDT'}]}
            value="USDT"
            className="!bg-transparent !border-none !text-xs"
            wrapperClassName="border-none w-[70px] text-xs"
            valueClass="!px-0 text-xs text-black-100 dark:text-white-100"
          />
          <div className="flex items-center gap-2">
            <Button
              className="h-6 w-fit text-xs !bg-secondary border-none text-white whitespace-nowrap"
            >
              Buy Crypto
            </Button>
            <Button
              className="h-6 w-fit text-xs !bg-secondary border-none text-white whitespace-nowrap"
            >
              Swap
            </Button>
            <Button
              className="h-6 w-fit text-xs !bg-secondary border-none text-white whitespace-nowrap"
            >
              Transfer
            </Button>
          </div>
        </div>
      </div>

      <RightModal
        open={openAssetModal}
        setOpen={setOpenAssetModal}
        title="Asset Mode"
        showCloseButton
        titleClass="pt-6"
        className="!overflow-y-visible rounded-b-none md:rounded-b-2xl w-full md:w-[420px] p-0 md:p-0"
      >
        <div className="px-4 mt-4">
          <div onClick={() => setAssetMode('Single-Asset Mode')} className={twMerge(
            "cursor-pointer flex gap-2 p-4 mb-4 rounded-xl border",
            assetMode === 'Single-Asset Mode' && 'border-white-100'
            )}
          >
            <div className="m-2 flex items-center justify-center min-w-[50px] h-[60px] rounded-md bg-white-100 dark:bg-secondary">
              <Image src="https://www.cryptocompare.com/media/19633/btc.png" alt="btc" width={24} height={24} />
            </div>
            <div>
              <div className="text-sm mb-1 font-semibold">Single-Asset Mode</div>
              <div className="text-xs text-gray-300 dark:text-gray">· Supports USDⓈ-M Futures trading by only using the single margin asset of the symbol. · PNL of the same margin asset positions can be offset. · Supports Cross Margin Mode and Isolated Margin Mode.</div>
            </div>
          </div>

          <div onClick={() => setAssetMode('Multi-Assets Mode')} className={twMerge(
            "cursor-pointer flex gap-2 p-4 mb-4 rounded-xl border",
            assetMode === 'Multi-Assets Mode' && 'border-white-100'
            )}
          >
            <div className="m-2 flex flex-wrap gap-1 items-center justify-center min-w-[50px] h-[60px] rounded-md bg-white-100 dark:bg-secondary">
              <Image src="https://www.cryptocompare.com/media/19633/btc.png" alt="btc" width={16} height={16} />
              <Image src="https://www.cryptocompare.com/media/37747734/sol.png" alt="btc" width={16} height={16} />
              <Image src="https://www.cryptocompare.com/media/12318177/ada.png" alt="btc" width={16} height={16} />
              <Image src="https://www.cryptocompare.com/media/40485170/bnb.png" alt="btc" width={16} height={16} />
            </div>
            <div>
              <div className="text-sm mb-1 font-semibold">Multi-Assets Mode</div>
              <div className="text-xs text-gray-300 dark:text-gray">· USDⓈ-M Futures trading across multiple margin assets. · PNL can be offset among the different margin asset positions. · Only supports Cross Margin Mode.</div>
            </div>
          </div>

          <div className="text-xs text-gray-300 dark:text-gray">* Multi-Assets Mode only applies to USDⓈ-M Futures. Before activating Multi-Assets Mode, please read the in detail to better manage USDⓈ-M Futures account risk accordingly when using Multi-Assets Mode.</div>
        </div>
      </RightModal>
    </>
  )
}