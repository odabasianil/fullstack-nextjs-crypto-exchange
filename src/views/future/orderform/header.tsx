'use client';

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Range } from "@/components/ui/range";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

export const OrderFormHeader = (props: any) => {
  const { checkedMarginMode = false, setCheckedMarginMode, openSettings, setOpenSettings } = props;
  const popupRef = useRef(null);
  const [marginModeModal, setMarginModeModal] = useState(false);
  const [leverageModal, setLeverageModal] = useState(false);
  const [leverage, setLeverage] = useState(5);
  const [marginMode, setMarginMode] = useState('Cross');
    
  const handleClickOutside = (event: any) => {
    if (popupRef.current && !(popupRef.current as any).contains(event.target)) {
      setOpenSettings(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="pt-2.5 pb-2 px-4 flex items-center md:border-b md:border-white-100 md:dark:border-black md:mb-4">
        {
          checkedMarginMode ? <>
            <Button
              onClick={() => setMarginModeModal(true)}
              className="w-[104px] h-6 !bg-secondary text-xs !border-none !text-white disabled:!cursor-not-allowed mr-2"
            >
              {marginMode}
            </Button>
            <Button
              onClick={() => setLeverageModal(true)}
              className="w-[104px] h-6 !border-none !bg-secondary text-xs !text-white"
            >
              {leverage}x
            </Button>
          </> : <div className="text-sm w-full font-semibold">Place Order</div>
        }
        <div ref={popupRef} className="hidden md:block cursor-pointer relative ml-4" onClick={() => setOpenSettings(true)}>
          <Icon
            name="settings"
            size={20}
            className="text-gray-300 dark:text-gray"
          />
          {
            openSettings && <div className="z-30 w-[240px] absolute top-6 right-2 rounded-sm bg-white dark:bg-background py-2 text-xs">
              <div className="flex py-2 px-4 gap-2" onClick={() => setCheckedMarginMode(!checkedMarginMode)}>
                <div className={twMerge(
                    "mt-1 min-w-[14px] h-[14px] border rounded-sm border-white-100 dark:border-secondary relative !cursor-not-allowed",
                    checkedMarginMode && '!bg-primary border-none text-black-100'
                  )}>
                  {checkedMarginMode && <Icon name="check" className="absolute w-full h-full" />}
                </div>
                <div className="text-xs">Display Margin Mode & Leverage Adjustment Button</div>
              </div>
              <div className="flex py-2 px-4 gap-2" onClick={() => setCheckedMarginMode(!checkedMarginMode)}>
                <div className={twMerge(
                    "min-w-[14px] h-[14px] border rounded-sm border-white-100 dark:border-secondary relative !cursor-not-allowed",
                    checkedMarginMode && '!bg-primary border-none text-black-100'
                  )}>
                  {checkedMarginMode && <Icon name="check" className="absolute w-full h-full" />}
                </div>
                <div className="text-xs">Show plus/minus Price tick size</div>
              </div>
            </div>
          }
        </div>
        <Modal
          open={marginModeModal}
          setOpen={setMarginModeModal}
          title="Margin Mode"
          showCloseButton
          className="!overflow-y-visible rounded-b-none md:rounded-b-2xl w-full md:w-[420px] p-0 md:p-0"
          titleWrapperClass="px-6 py-[18px]"
          isMobileOpen
        >
          <div className="p-6 flex flex-col gap-4">
            <div>BTCUSDT</div>
            <div className="flex items-center justify-between gap-4 w-full">
              <div
                onClick={() => setMarginMode('Cross')}
                className={twMerge(
                  "cursor-pointer rounded-lg border border-white-100 dark:border-secondary text-sm w-[calc(50%-0.5px)] h-[38px] flex items-center justify-center",
                  marginMode === 'Cross' && 'border-secondary dark:border-white-100'
                )}
              >
                Cross
              </div>
              <div
                onClick={() => setMarginMode('Isolated')}
                className={twMerge(
                  "cursor-pointer rounded-lg border border-white-100 dark:border-secondary text-sm w-[calc(50%-0.5px)] h-[38px] flex items-center justify-center",
                  marginMode === 'Isolated' && 'border-secondary dark:border-white-100'
                )}
              >
                Isolated
              </div>
            </div>

            <div className="text-xs text-gray-300 dark:text-gray">
              *
              Switching the margin mode will only apply it to the selected contract.
            </div>
            <div className="text-xs text-gray-300 dark:text-gray">
              *
              Cross Margin Mode: All cross positions under the same margin asset share the same asset cross margin balance. In the event of liquidation, your assets full margin balance along with any remaining open positions under the asset may be forfeited.
            </div>
            <div className="text-xs text-gray-300 dark:text-gray">
              Isolated Margin Mode: Manage your risk on individual positions by restricting the amount of margin allocated to each. If the margin ratio of a position reached 100%, the position will be liquidated. Margin can be added or removed to positions using this mode.
            </div>
            <Button onClick={() => setMarginModeModal(false)} className="w-full h-12 rounded-lg">
              Confirm
            </Button>
          </div>
        </Modal>


        <Modal
          open={leverageModal}
          setOpen={setLeverageModal}
          title="Adjust Leverage"
          showCloseButton
          className="!overflow-y-visible rounded-b-none md:!rounded-lg w-full md:w-[420px] p-0 md:p-0 dark:!bg-[#181A20]"
          titleWrapperClass="px-6 pt-5 pb-[28px]"
          isMobileOpen
        >
          <div className="px-6 pb-6">
            <div className="text-gray-300 dark:text-gray mb-1 text-sm">Leverage</div>
            <div className="flex justify-between items-center rounded bg-white-100 dark:bg-secondary p-3 w-full h-12">
              <div onClick={() => setLeverage(leverage-1)} className="cursor-pointer text-gray-300 dark:text-gray">
                <Icon name="minus" size={20} />
              </div>
              <div>{leverage}x</div>
              <div onClick={() => setLeverage(leverage+1)} className="cursor-pointer text-gray-300 dark:text-gray">
                <Icon name="plus" size={20} />
              </div>
            </div>
            <div className="my-4">
              <Range
                value={leverage}
                setValue={setLeverage}
                seperator="x"
                className="z-20"
              />
              <div className="flex items-center justify-between">
                <div onClick={() => setLeverage(1)} className="text-sm text-gray-300 dark:text-gray-100 hover:text-black-100 hover:dark:text-white-100 cursor-pointer ">1x</div>
                <div onClick={() => setLeverage(25)} className="text-sm text-gray-300 dark:text-gray-100 hover:text-black-100 hover:dark:text-white-100 cursor-pointer ml-4">25x</div>
                <div onClick={() => setLeverage(50)} className="text-sm text-gray-300 dark:text-gray-100 hover:text-black-100 hover:dark:text-white-100 cursor-pointer ml-4">50x</div>
                <div onClick={() => setLeverage(75)} className="text-sm text-gray-300 dark:text-gray-100 hover:text-black-100 hover:dark:text-white-100 cursor-pointer ml-4">75x</div>
                <div onClick={() => setLeverage(100)} className="text-sm text-gray-300 dark:text-gray-100 hover:text-black-100 hover:dark:text-white-100 cursor-pointer ">100x</div>
              </div>
            </div>
            <li className="text-gray-200 dark:text-gray-100 text-xs mb-4 list-disc">
              Maximum position at current leverage: 1,800,000,000 USDT
            </li>
            <li className="text-gray-200 dark:text-gray-100 text-xs mb-4 list-disc">
              Please note that leverage changing will also apply for open positions and open orders.
            </li>
            <li className="text-error text-xs mb-4 list-disc">
            Selecting higher leverage such as [10x] increases your liquidation risk. Always manage your risk levels. See our help article for more information.
            </li>
            <Button
              onClick={() => setLeverageModal(false)}
              className="w-full h-12 rounded-lg mt-6"
            >
              Confirm
            </Button>
          </div>
        </Modal>
      </div>
  )
}