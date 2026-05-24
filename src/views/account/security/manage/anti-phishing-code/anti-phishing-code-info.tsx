"use client";
import { Icon } from "@/components/ui/icon";
import { twMerge } from "tailwind-merge";

type AntiPhishingCodeInfoProps = {
  title?: string;
  textClass?: string;
  className?: string;
  wrapperClassName?:string;
};

export const AntiPhishingCodeInfo = ({
  title,
  textClass,
  className,
  wrapperClassName
}: AntiPhishingCodeInfoProps) => {
  return (
    <>
      <div className={twMerge(
        "md:w-[384px] md:max-w-full md:px-0 mb-6 mx-auto w-full max-w-[375px] bg-transparent",
        className
      )}>
        <div className={twMerge("rounded-[4px] flex items-start w-full bg-white-1100 dark:bg-brown p-3",
          wrapperClassName
        )}>
          <div className="flex items-start flex-1">
            <div className="mr-2">
              <Icon
                name="payment-warning"
                className="text-primary-100"
                size="24"
              />
            </div>
            <div
              className={twMerge(
                "text-sm text-black-200 dark:text-white-100",
                textClass
              )}
            >
              {title}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
