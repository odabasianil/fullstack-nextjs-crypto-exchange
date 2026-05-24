import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { PriceInput } from "@/components/ui/price-input";
import Select from "@/components/ui/select";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export const MarginCalculator = (props: any) => {
  const { open, setOpen } = props;
  const tabs = [
    {text: 'PNL', value: 'pnl'},
    {text: 'Margin', value: 'margin'},
    {text: 'Liquidation', value: 'liquidation'}
  ]

  const [selectedTab, setSelectedTab] = useState(tabs[0].value);
  const [isCross, setIsCross] = useState(true);
  const [isSell, setIsSell] = useState(false);

  return (
    <>
      <Modal
        open={open}
        setOpen={setOpen}
        title="Margin Calculator"
        showCloseButton
        className="max-w-screen w-screen md:max-w-[80vw] h-screen md:h-max md:w-[672px] rounded-md"
      >
        <div className="pt-[38px] flex items-start gap-6">
          {
            tabs.map((tab, index) => (
              <div
                onClick={() => setSelectedTab(tab.value)}
                className={twMerge(
                  "text-sm h-[38px] flex items-start whitespace-nowrap text-gray-300 dark:text-gray",
                  "cursor-pointer",
                  selectedTab === tab.value && "border-b-2 border-primary text-black-100 dark:text-white-100"
                )}>
                {tab.text}
              </div>
            ))
          }
        </div>
        <div className="flex pt-6">
          <div className="relative flex flex-col flex-1 mr-8">
            <div className="flex items-center justify-between gap-4">
              <Select
                options={[
                  'BTC/USDT',
                  'CHR/USDT'
                ]}
                className="h-[30px] w-[124px]"
              />
              <div className="flex items-center text-sm rounded overflow-hidden">
                <div
                  onClick={() => setIsCross(true)}
                  className={twMerge(
                    "cursor-pointer min-w-[80px] py-[5px] px-3 flex items-center justify-center",
                    isCross ? "bg-primary text-black-100" : "bg-white-300 dark:bg-secondary text-white-100"
                  )}>
                    Cross
                </div>
                <div
                  onClick={() => setIsCross(false)}
                  className={twMerge(
                    "cursor-pointer min-w-[80px] py-[5px] px-3 flex items-center justify-center",
                    !isCross ? "bg-primary text-black-100" : "bg-white-300 dark:bg-secondary text-white-100"
                  )}>
                    Isolated
                </div>
              </div>
            </div>
            <div className="w-full mt-4 flex items-center text-sm overflow-hidden">
              <div
                onClick={() => setIsSell(false)}
                className={twMerge(
                  "cursor-pointer font-semibold min-w-[80px] w-1/2 py-[5px] px-3 rounded-l flex items-center justify-center",
                  !isSell ? "bg-success-100 text-white-100" : "bg-white-300 dark:bg-secondary text-gray-300 dark:text-gray"
                )}>
                  Margin Buy
              </div>
              <div
                onClick={() => setIsSell(true)}
                className={twMerge(
                  "cursor-pointer font-semibold min-w-[80px] w-1/2 py-[5px] px-3 rounded-r flex items-center justify-center",
                  isSell ? "bg-error text-white-100" : "bg-white-300 dark:bg-secondary text-gray-300 dark:text-gray"
                )}>
                  Margin Sell
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full mt-6">
              <PriceInput
                label="Entry Price"
                coin="USDT"
              />
              <PriceInput
                label="Exit Price"
                coin="USDT"
              />
              <PriceInput
                label="Original Amount"
                coin="CHR"
              />
              <PriceInput
                label="Borrow Amount"
                coin="CHR"
              />
            </div>
            <div className="text-gray-300 dark:text-gray text-xs">Max borrow amount: 3430000 CHR</div>
            <Button
              className="w-full mt-[60px] h-10 text-sm leading-[22px] font-semibold"
              disabled
            >
              Calculate
            </Button>
          </div>
          <div className="flex-1 relative px-4 pb-4 border-l border-l-white-300 dark:border-l-gray-300">
            <div className="mb-4 font-medium leading-[21px]">Result</div>
            <div className="mb-2 flex items-center justify-between text-gray-300 dark:text-gray text-sm">
              <div>PNL</div>
              <div>- USDT</div>
            </div>
            <div className="mb-2 flex items-center justify-between text-gray-300 dark:text-gray text-sm">
              <div>ROE</div>
              <div>- %</div>
            </div>
            <div className="whitespace-normal absolute bottom-4 right-4 left-4 text-xs text-gray-300 dark:text-gray">
              *The calculation result is for reference only, the interest generated during the borrowing period may affect the final PNL & ROE.
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}