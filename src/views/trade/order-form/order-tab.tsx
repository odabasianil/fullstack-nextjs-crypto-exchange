import { twMerge } from "tailwind-merge";

export const OrderTab = (props: any) => {
  const { isBuy, setIsBuy } = props;

  const handleClick = (isBuyButton: boolean) => {
    setIsBuy(isBuyButton);
  }

  return (
    <div className="flex w-full mt-2 mb-1 relative gap-3 overflow-visible h-[25px] border border-white-300 dark:border-[#434C5A] rounded-md bg-transparent">
      <button
        onClick={() => handleClick(true)}
        className={twMerge(
          "relative text-white-100 min-w-[50px] text-sm leading-[22px] font-semibold m-[-1px] flex items-center justify-center flex-grow rounded",
          isBuy && 'bg-green after:bg-green after:rounded after:h-[17px] after:w-[17px] after:absolute after:right-[-7px] after:transform after:rotate-[-135deg] after:z-[1]'
        )}>
        Buy
      </button>
      <button
        onClick={() => handleClick(false)}
        className={twMerge(
          "relative text-white-100 min-w-[50px] text-sm leading-[22px] font-semibold m-[-1px] flex items-center justify-center flex-grow rounded",
          !isBuy && 'bg-error before:bg-error before:rounded before:h-[17px] before:w-[17px] before:absolute before:left-[-7px] before:transform before:rotate-[-135deg] before:z-[1]'
        )}>
        Sell
      </button>
    </div>
  )
}