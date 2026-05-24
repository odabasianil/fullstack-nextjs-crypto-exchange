import { twMerge } from "tailwind-merge";

interface BuySellRatioProps {
  buyRatio: number;
  sellRatio: number;
}

export const BuySellRatio = (props: BuySellRatioProps) => {
  const { buyRatio, sellRatio } = props;

  return (
    <div className="flex items-center px-4 pt-1 pb-2 ">
      <div className="text-xs">B</div>
      <div className="text-success text-xs ml-0.5">{buyRatio}%</div>
      <div className="px-2 flex items-center flex-[1_1]">
        <div className="bg-success h-[3px]" style={{width: `${buyRatio}%`}}></div>
        <div className="bg-error h-[3px]" style={{width: `${sellRatio}%`}}></div>
      </div>
      <div className="text-error text-xs mr-0.5">{sellRatio}%</div>
      <div className="text-xs">S</div>

    </div>
  )
}