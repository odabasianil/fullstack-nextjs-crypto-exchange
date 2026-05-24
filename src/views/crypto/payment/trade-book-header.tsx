import { Icon } from "@/components/ui/icon";
import Select from "@/components/ui/select";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

interface TradeBookHeaderProps {
  selectValue: string;
  setSelectValue: (value: string) => void;
  layout: string;
  setLayout: (type: string) => void;
  checkedBuySell: boolean;
  setCheckedBuySell: (value: boolean) => void;
  showTooltip?: boolean;
  setShowTooltip?: (value: boolean) => void;
}

export const TradeBookHeader = (props: TradeBookHeaderProps) => {
  const {
    selectValue,
    setSelectValue,
    layout,
    setLayout,
    checkedBuySell,
    setCheckedBuySell,
    showTooltip,
    setShowTooltip
  } = props;
  const [openPopup, setOpenPopup] = useState(false);
  const [amountChecked, setAmountChecked] = useState(false);
  const [cumulativeChecked, setCumulativeChecked] = useState(false);

  const popupRef = useRef(null);

  const handleLayoutChange = (type: string) => {
    setLayout(type);
  }

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (popupRef.current && !(popupRef.current as any).contains(event.target)) {
        setOpenPopup(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popupRef]);

  return (
    <>
      <div className="pt-1 px-4 pb-0 hidden md:flex items-center justify-between w-full h-[42px] border-b border-white-300 dark:border-secondary">
        <div className="text-sm">Order Book</div>
        <div className="relative">
          <div className="cursor-pointer" onClick={() => setOpenPopup(!openPopup)}>
            <Icon
              name="dots"
              className="text-gray-300 dark:text-gray hover:text-black-100 dark:hover:text-white-100"
              size={16}
            />
          </div>
          {
            openPopup && (
              <div ref={popupRef} className="z-40 absolute top-6 right-0 w-[220px] bg-white shadow dark:bg-black-100 rounded-xl py-2 h-max">
                <div className="px-2.5 text-xs h-8 text-gray-300 dark:text-gray flex items-center">Order Book Display</div>
                {(showTooltip !== undefined && setShowTooltip) && <div onClick={() => setShowTooltip(!showTooltip)} className="cursor-pointer flex items-center py-2 px-2.5 gap-1 text-xs leading-[22px] hover:dark:bg-secondary">
                  <div
                    className={twMerge(
                      "w-[13px] h-[13px] border rounded-sm border-white-100 dark:border-gray-200 relative",
                      showTooltip && '!bg-white-100 border-none text-black-100'
                    )}
                  >
                    {showTooltip && <Icon name="check" className="absolute w-full h-full" />}
                  </div>
                  <div>Display Avg.&Sum</div>
                </div>}
                <div onClick={() => setCheckedBuySell(!checkedBuySell)} className="cursor-pointer flex items-center py-2 px-2.5 gap-1 text-xs leading-[22px] hover:dark:bg-secondary">
                  <div
                    className={twMerge(
                      "w-[13px] h-[13px] border rounded-sm border-white-100 dark:border-gray-200 relative",
                      checkedBuySell && '!bg-white-100 border-none text-black-100'
                    )}
                  >
                    {checkedBuySell && <Icon name="check" className="absolute w-full h-full" />}
                  </div>
                  <div>Show Buy/Sell Ratio</div>
                </div>
                <div className="w-[calc(100%-20px)] mx-auto h-[1px] bg-white-300 dark:bg-secondary" />
                <div className="px-2.5 text-xs h-8 text-gray-300 dark:text-gray flex items-center">Book Depth Visualization</div>
                <div className="cursor-pointer flex items-center py-2 px-2.5 gap-1 text-xs leading-[22px] hover:dark:bg-secondary" onClick={() => setAmountChecked(!amountChecked)}>
                  <div
                    className={twMerge(
                      "w-4 h-4 border border-white-100 dark:border-gray-200 relative rounded-full",
                      amountChecked && '!border-4 !border-white-100 text-black-100'
                    )}
                  />
                  <div>Amount</div>
                </div>
                <div className="cursor-pointer flex items-center py-2 px-2.5 gap-1 text-xs leading-[22px] hover:dark:bg-secondary" onClick={() => setCumulativeChecked(!cumulativeChecked)}>
                  <div
                    className={twMerge(
                      "w-4 h-4 border border-white-100 dark:border-gray-200 relative rounded-full",
                      cumulativeChecked && '!border-4 !border-white-100 text-black-100'
                    )}
                  />
                  <div>Cumulative</div>
                </div>
              </div>
            )
          }
        </div>
      </div>
      <div className="flex items-center justify-between mt-3 mx-4 mb-1">
        <div className="flex gap-3 items-center">
          <div onClick={() => handleLayoutChange('buysell')}>
            <Icon
              name="buysell-layout"
              size={16}
              className={twMerge("cursor-pointer opacity-50", layout === 'buysell' && 'opacity-100')}
            />
          </div>
          <div onClick={() => handleLayoutChange('buy')}>
            <Icon
              name="buy-layout"
              size={16}
              className={twMerge("cursor-pointer opacity-50", layout === 'buy' && 'opacity-100')}
            />
          </div>
          <div onClick={() => handleLayoutChange('sell')}>
            <Icon
              name="sell-layout"
              size={16}
              className={twMerge("cursor-pointer opacity-50", layout === 'sell' && 'opacity-100')}
            />
          </div>
        </div>
        <Select
          options={[
            { label: "0.01", value: "0.01" },
            { label: "0.1", value: "0.1" },
            { label: "1", value: "1" },
            { label: "10", value: "10" },
            { label: "100", value: "100" },
          ]}
          value={selectValue}
          setValue={setSelectValue}
          className="w-10 !bg-transparent !border-none h-5"
          wrapperClassName="!border-none !bg-transparent"
          valueClass="px-0 text-black-100 dark:text-white-100"
          optionsClassName="w-[100px] -left-8 z-20"
          />
      </div>
    </>
  )
}