import { Icon } from "@/components/ui/icon"
import { twMerge } from "tailwind-merge"

export const FormType = (props: any) => {
  const { types, type, setType } = props;

  return (
    <div className="w-full flex items-center py-2.5 gap-2 border-t border-t-white-100 dark:border-t-secondary">
      <div className="flex items-center">
        {
          types.map((item: any) => (
            <div
              onClick={() => setType(item)}
              className={twMerge(
                "text-xs cursor-pointer py-[3px] px-2 rounded-md text-black-300 dark:text-gray",
                type === item && "text-black-200 dark:text-white-100 bg-white-300 dark:bg-secondary"
              )}
            >
              {item}
            </div>
          ))
        }
      </div>
      <div className="group relative">
        <Icon
          name="info"
          size={16}
          className="text-gray-300 dark:text-gray cursor-help"
        />
        <div className={twMerge(
          "invisible opacity-0 group-hover:opacity-100 group-hover:visible",
          "absolute top-4 -right-12 md:right-0 bg-black-100 dark:bg-white-100 text-white-100 dark:text-background-200",
          "w-[234px] h-[160px] overflow-y-auto py-2 px-4 rounded shadow-lg z-30",
        )}>
          <div className="text-sm font-medium max-w-[200px] text-left">
          <b>{type} Mode:</b> Assets received after a trade will automatically be used to repay the debt of the same coin in your margin account. If there is an insufficient amount when repaying, it will repay 90% of the debt only.
          </div>
        </div>
      </div>
    </div>
  )
}