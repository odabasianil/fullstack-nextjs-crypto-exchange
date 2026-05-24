import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { PriceInput } from "@/components/ui/price-input";
import { Range } from "@/components/ui/range";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Aviable } from "./avbl";
import { FundWalletModal } from "../ui/fund-wallet-modal";

interface MarketFormInterface {
  coin1?: string;
  coin2?: string;
  type?: string;
  isBuy?: boolean;
}

export const MarketForm = (props: MarketFormInterface) => {
  const { coin1, coin2, isBuy, type } = props;
  const [rangeValue, setRangeValue] = useState(0);
  const [priceValue, setPriceValue] = useState(0);
  const [amountValue, setAmountValue] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  
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
        />
        <PriceInput
          label="Total"
          coin={coin2}
          className="flex-1 mt-3 mb-2"
          step={0.00001000}
          min={0.00001000}
        />

        <Aviable coin1={coin1} coin2={coin2} isBuy={isBuy} />
        <div className="mb-1 text-xs  flex items-center gap-2">
          <div className="text-gray-300 dark:text-gray">Max Buy</div>
          <div>0 {coin1}</div>
        </div>
        {
          type?.toLowerCase() === 'borrow' && 
          <div className="mb-1 text-xs flex items-center justify-between gap-2">
            <div className="text-gray-300 dark:text-gray">Borrowing</div>
            <div>0 {coin2}</div>
          </div>
        }
        {
          type?.toLowerCase() === 'repay' && 
          <div className="mb-1 text-xs flex items-center justify-between gap-2">
            <div className="text-gray-300 dark:text-gray">Repaying</div>
            <div>0 {coin1}</div>
          </div>
        }
        <div className="mb-1 text-xs text-gray-300 dark:text-gray">Est. Fee</div>
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