import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { PriceInput } from "@/components/ui/price-input";
import { Range } from "@/components/ui/range";

export const Investment = (props: any) => {
  const { coin1, coin2, isManual = false } = props;

  return (
    <>
      <div className="py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-0.5">
            <div className="font-semibold text-sm">{isManual ? '3. Investment' : '2. Investment'}</div>
            <div className="group">
              <Icon
                name="info"
                size={16}
                className="text-black-300 dark:text-gray cursor-help"
              />
            </div>
          </div>
          <div className="flex items-center gap-0.5">
            <div className="text-xs">USDT</div>
          </div>
        </div>
        <div className="mb-1 mt-2.5 flex items-center gap-0.5 text-xs">
          <div className="text-gray-300 dark:text-gray">Avbl:</div>
          <div>0.00 {coin2}</div>
          <Icon
            name="loop"
            size={16}
            className="text-primary cursor-pointer"
          />
        </div>
        <div>
          <PriceInput
            value={0}
            onChange={() => {}}
            label="Total"
            coin={coin2}
          />
          <Range
            value={0}
            setValue={() => {}}
            className="mt-3"
          />
          <Button
            className="h-10 text-sm mt-4 w-full rounded font-semibold"
          >
            Create
          </Button>
          {!isManual && <div className="mt-2 flex items-center gap-1">
            <Icon name="info" size={12} className="text-gray-300 dark:text-gray" />
            <div className="text-sm text-[#D77843] leading-4">You are required to sign the Risk Disclaimer Statements before you set up a strategy</div>
          </div>}
        </div>
      </div>
    </>
  )
}