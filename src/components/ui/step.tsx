import { twMerge } from "tailwind-merge";
import { Icon } from "./icon";

export const Step = (props: any) => {
  const {
    title,
    isActive,
    isFailed = false,
    index,
    children,
    className,
    titleClass = "",
    isLast = false
  } = props;

  return (
    <>
      <div
        className={twMerge("flex flex-row [&:not(:last-child)]:pb-12 gap-2.5 flex-1 relative", className)}
      >
        <div
          className={twMerge(
            "flex items-center justify-center bg-black-100 dark:bg-white-100 top-1.5 text-white-500 rotate-45 rounded-sm dark:text-black-1000 text-[12px] font-medium h-4 w-4 relative z-20 transition-colors duration-fast ease-linear",
            !isActive && "bg-white-400 dark:bg-gray-300 text-black-100 dark:text-white-100",
            isFailed && "bg-error dark:bg-error text-black-100 dark:text-black-100",
          )}
        >
          <div className="-rotate-45 flex items-center justify-center">
            {(isActive && !isLast) ? (
              <Icon name="check" size={12} className="text-white-500 dark:text-black-100" />
            ) : index}
          </div>
        </div>

        <div className="ml-2 flex-1 w-auto md:w-[200px] transition-colors duration-100 ease-linear">
          <div className="md:text-base text-xs">
            <div
              className="flex flex-col font-semibold "
            >
              <div className={
                twMerge(
                  "mb-2 text-xl font-semibold",
                  isActive
                    ? "text-black-100 dark:text-white-100" : "text-white-500 dark:text-gray-200",
                  titleClass,
                )}
              >
                {title}
              </div>
              {isActive && <div className="mt-2">
                {children}
              </div>}
            </div>
          </div>
        </div>

        <div
          className={twMerge(
            "absolute bottom-0 h-auto left-[7px] top-0 w-[2px] transform translate-y-5",
            isLast ? 'h-0' : 'h-auto',
            isActive
              ? "bg-background-500 dark:bg-white-100" : "bg-white-400 dark:bg-gray-300"
          )}
        />

      </div>
    </>
  )
}