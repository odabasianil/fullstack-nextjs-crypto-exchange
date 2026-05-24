import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { PriceInput } from "@/components/ui/price-input";
import { Range } from "@/components/ui/range";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Aviable } from "./avbl";
import { FundWalletModal } from "../ui/fund-wallet-modal";
import { PercentButtons } from "@/views/trade/order-form/percent-buttons";

interface LimitFormInterface {
  coin1?: string;
  coin2?: string;
  isBuy?: boolean;
  openTp?: boolean;
  setOpenTp?: any;
  type?: string;
}

export const LimitForm = (props: LimitFormInterface) => {
  const { coin1, coin2, isBuy, openTp, setOpenTp, type } = props;
  const [rangeValue, setRangeValue] = useState(0);
  const [priceValue, setPriceValue] = useState(0);
  const [amountValue, setAmountValue] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [percentValue, setPerecentValue] = useState(null);

  const handleTp = () => {
    setOpenTp(!openTp);
  }
  
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('Submit');
    setOpenModal(true);
  }


  return (
    <>
      <form onSubmit={handleSubmit}>
        <PriceInput
          label="Price"
          coin={coin2}
          value={priceValue}
          onChange={(e: any) => setPriceValue(e.target.value)}
          className="flex-1 mb-3"
          step={0.01}
          min={0.01}
          tooltipLabel={`~$${priceValue}`}
        />
        <PriceInput
          label="Amount"
          coin={coin1}
          value={amountValue}
          onChange={(e: any) => setAmountValue(e.target.value)}
          className="flex-1 mt-3 mb-2"
          step={0.00001000}
          min={0.00001000}
          tooltipLabel={`Amount ${amountValue}`}
        />
        <div className="md:hidden">
          <PercentButtons
            percentValue={percentValue}
            setPerecentValue={setPerecentValue}
          />
        </div>
        <Range
          value={rangeValue}
          setValue={setRangeValue}
          className="hidden md:block"
        />
        <PriceInput
          label="Total"
          coin={coin2}
          className="hidden md:flex flex-1 mt-3 mb-2"
          step={0.00001000}
          min={0.00001000}
        />

        {openTp !== undefined && <div className="py-1 hidden md:flex items-center gap-2">
          <div onClick={handleTp} className={twMerge(
            "cursor-pointer w-4 h-4 border rounded-sm border-white-100 dark:border-secondary relative",
            openTp && '!bg-primary border-none text-black-100'
            )}>
            {openTp && <Icon name="check" className="absolute w-full h-full" />}
          </div>
          <div onClick={handleTp} className="text-xs ">TP/SL</div>
        </div>}
        {openTp && <>
          <div className="text-xs leading-[18px] mb-1 text-gray-300 dark:text-gray">Take Profit</div>
          <div className="flex mb-2 gap-2">
            <PriceInput
              label="Limit"
              className="w-full h-10 flex-[3_1_0%]"
              step={0.00001000}
              min={0.00001000}
            />
            <PriceInput
              coin="%"
              label="Offset"
              className="w-full h-10 flex-[2_1_0%]"
              step={0.01}
              min={0.01}
            />
          </div>
          <div className="text-xs leading-[18px] mb-1 mt-3 text-gray-300 dark:text-gray">Stop Loss</div>
          <div className="flex mb-2 gap-2">
            <PriceInput
              label="Trigger"
              className="w-full h-10 flex-[3_1_0%]"
              step={0.00001000}
              min={0.00001000}
            />
            <PriceInput
              coin="%"
              label="Offset"
              className="w-full h-10 flex-[2_1_0%]"
              step={0.01}
              min={0.01}
            />
          </div>
          <PriceInput
            label="Limit"
            className="w-full mb-2"
            step={0.00001000}
            min={0.00001000}
          />
        </>}
        <Aviable coin1={coin1} coin2={coin2} isBuy={isBuy} />
        {(type === undefined || type?.toLowerCase() === 'borrow') && <div className="mb-1 text-xs flex items-center justify-between gap-2">
          <div className="text-gray-300 dark:text-gray-400 dark:md:text-gray">Max {isBuy ? 'Buy' : 'Sell'}</div>
          <div>0 {coin1}</div>
        </div>}
        {
          type?.toLowerCase() === 'borrow' && 
          <div className="mb-1 text-xs flex items-center justify-between gap-2">
            <div className="text-gray-300 dark:text-gray-400 dark:md:text-gray">Borrowing</div>
            <div>0 {coin2}</div>
          </div>
        }
        {
          type?.toLowerCase() === 'repay' && 
          <div className="mb-1 text-xs flex items-center justify-between gap-2">
            <div className="text-gray-300 dark:text-gray-400 dark:md:text-gray">Repaying</div>
            <div>0 {coin1}</div>
          </div>
        }
        {/* <div className="mb-1 text-xs text-gray-300 dark:text-gray-400 dark:md:text-gray">Est. Fee</div> */}
        <Button
          type="submit"
          className={twMerge(
            "w-full text-white-100 hover:text-white-100 font-semibold !border-none  h-9 text-sm mt-3 md:mt-1 hover:opacity-80 rounded-lg",
            isBuy ? '!bg-success-100' : '!bg-error'
          )}
        >
          {isBuy ? 'Buy' : 'Sell'} {coin1}
        </Button>
      </form>
      <FundWalletModal
        open={openModal}
        setOpen={setOpenModal}
        coin={coin1}
      />
    </>
  )
}