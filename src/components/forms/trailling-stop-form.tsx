import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { PriceInput } from "@/components/ui/price-input";
import { Range } from "@/components/ui/range";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Aviable } from "./avbl";
import { FundWalletModal } from "../ui/fund-wallet-modal";
import { PercentButtons } from "@/views/trade/order-form/percent-buttons";

interface TraillingStopForm {
  coin1?: string;
  coin2?: string;
  isBuy?: boolean;
  type?: string;
}

export const TraillingStopForm = (props: TraillingStopForm) => {
  const { coin1, coin2, isBuy, type } = props;
  const [rangeValue, setRangeValue] = useState(0);
  const [limitValue, setLimitValue] = useState(0);
  const [amountValue, setAmountValue] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [trailingDelta, setTrailingDelta] = useState(0);
  const [openActivation, setOpenActivation] = useState(false);
  const [percentValue, setPerecentValue] = useState(null);

  const handleActivation = () => {
    setOpenActivation(!openActivation);
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('Submit');
    setOpenModal(true);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center mb-3 gap-1.5">
          <PriceInput
            className="flex-1"
            label='Trailing Delta'
            coin="%"
            value={trailingDelta}
            onChange={(e: any) => setTrailingDelta(e.target.value)}
            min={1}
            step={1}
            max={100}
          />
          <button
            type="button"
            onClick={() => setTrailingDelta(1)}
            className={twMerge(
              "bg-white-300 hover:bg-white-100 dark:bg-secondary dark:hover:bg-gray-300",
              "w-10 h-10 flex items-center justify-center rounded-md text-sm",
              "text-black-300 dark:text-gray hover:text-white-100"
            )}
          >
            1%
          </button>
          <button
            type="button"
            onClick={() => setTrailingDelta(2)}
            className={twMerge(
              "bg-white-300 hover:bg-white-100 dark:bg-secondary dark:hover:bg-gray-300",
              "w-10 h-10 flex items-center justify-center rounded-md text-sm",
              "text-black-300 dark:text-gray hover:text-white-100"
            )}
          >
            2%
          </button>
        </div>
        <PriceInput
          label="Limit"
          coin={coin2}
          value={limitValue}
          onChange={(e: any) => setLimitValue(e.target.value)}
          className="flex-1 mb-3"
          step={0.01}
          min={0.01}
          tooltipLabel={`~$${limitValue}`}
        />
        <PriceInput
          label="Total"
          coin={coin1}
          value={amountValue}
          onChange={(e: any) => setAmountValue(e.target.value)}
          className="flex-1 mt-3 mb-2"
          step={0.00001000}
          min={0.00001000}
          tooltipLabel={`Max Amount ${amountValue}`}
        />
        <Range
          value={rangeValue}
          setValue={setRangeValue}
          className="hidden md:block"
        />
        <div className="md:hidden">
          <PercentButtons
            percentValue={percentValue}
            setPerecentValue={setPerecentValue}
          />
        </div>
        <div className="mb-5 mt-2 flex items-center gap-2">
          <div onClick={handleActivation} className={twMerge(
            "cursor-pointer w-3 h-3 border rounded-sm border-white-100 dark:border-secondary relative",
            openActivation && '!bg-primary border-none text-black-100'
            )}>
            {openActivation && <Icon name="check" className="absolute w-full h-full" />}
          </div>
          <div onClick={handleActivation} className="text-xs ">Activation Price</div>
        </div>
        {
          openActivation && <PriceInput
            label="Total"
            coin={coin2}
            className="flex-1 mt-3 mb-2"
            step={0.00001000}
            min={0.00001000}
          />
        }

        <Aviable coin1={coin1} coin2={coin2} isBuy={isBuy} />
        <div className="mb-1 text-xs  flex items-center gap-2 justify-between">
          <div className="text-gray-300 dark:text-gray-400 dark:md:text-gray">Max {isBuy ? 'Buy' : 'Sell'}</div>
          <div>0 {coin1}</div>
        </div>
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
        {/* <div className="mb-1 text-xs text-gray-300 dark:text-gray">Est. Fee</div> */}
        <Button
          type="submit"
          className={twMerge(
            "w-full text-white-100 hover:text-white-100 font-semibold !border-none  h-9 text-sm mt-1 hover:opacity-80 rounded-lg",
            isBuy ? '!bg-success-100' : '!bg-error'
          )}
        >
          Buy {coin1}
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