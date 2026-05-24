import { twMerge } from "tailwind-merge";

export const PercentButtons = (props: any) => {
  const { percentValue, setPerecentValue } = props;


  return (
    <div className="my-0.5 flex items-center w-full justify-between">
      { [25, 50, 75, 100].map((percent: number) => (
        <button 
          type="button"
          onClick={() => setPerecentValue(percent)}
          className={twMerge(
            "min-w-[calc(25%-6px)] h-6 flex items-center justify-center mr-2 flex-1 text-sm rounded-sm text-center bg-white-300 dark:bg-secondary text-gray-300 dark:text-gray",
            percentValue === percent && "!text-primary-100"
          )}>
          {percent}%
        </button>
        ))
      }
    </div>
  )
}