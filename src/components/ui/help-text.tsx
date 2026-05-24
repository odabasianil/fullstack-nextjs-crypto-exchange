import { twMerge } from "tailwind-merge";

export const HelpText = ({
  className,
  arrowClass,
  isVisibleArrow=true,
  isTop=true,
  children,
}: {
  className?: string;
  arrowClass?: string;
  isVisibleArrow?: boolean;
  isTop?: boolean;
  children: React.ReactNode;
}) => {

  return (
    <>
      <div className={twMerge(
        "hidden group-hover:flex gap-1 flex-wrap py-2 px-3 rounded-lg h-fit w-[220px]",
        "z-20 absolute left-1/2 -translate-x-1/2 opacity-[.95] text-xs leading-4",
        "bg-black-200 dark:bg-gray-200 text-white-100",
        isTop ? 'bottom-6' : 'top-6',
        className
        )}>
          {isVisibleArrow && <div
            className={twMerge(
              "absolute w-[8px] h-[8px] left-1/2 -translate-x-1/2 rotate-45 bg-black-200 dark:bg-gray-200",
              isTop ? "-bottom-0.5" : "-top-0.5",
              arrowClass
            )}
          ></div>}
          {children}
      </div>
    </>
  )
}