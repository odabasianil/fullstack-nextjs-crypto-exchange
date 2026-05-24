"use client";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Icon } from "./icon";

interface Step {
  title: string;
  description: string;
  icon?: string;
}

interface HowItWorksProps {
  className?: string;
}

const stepsData: Step[] = [
  {
    title: "Complete Advanced KYC",
    description: "You have completed KYC verification.",
    icon: "check1",
  },
  {
    title: "Place an Order",
    description:
      "Select the payment method, enter the amount, and complete the order payment.",
  },
  {
    title: "Transaction Completed",
    description: "Complete deposit. You can trade in the Buy & Sell market.",
  },
];

export const HowItWorks = ({ className }: HowItWorksProps) => {

  const [openSteps, setOpenSteps] = useState<number[]>([1]);

  const toggleStep = (index: number) => {
    if (openSteps.includes(index)) {
      setOpenSteps(openSteps.filter((step) => step !== index));
    } else {
      setOpenSteps([...openSteps, index]);
    }
  };

  return (
    <>
      <div className={twMerge("md:block hidden", className)}>
        <div className="mb-8 w-full">
          <div className="mb-4 text-xl dark:text-white-100 text-black-1000">
            How it works?
          </div>
          <div className="flex flex-col relative">
            {stepsData.map((step, index) => (
              <div
                key={index}
                className="flex flex-row [&:not(:last-child)]:pb-[22px] md:pr-4 gap-2.5 flex-1 relative"
              >
                <div
                  className={twMerge(
                    "flex items-center justify-center bg-background-500 top-1 rounded-sm text-white-500 dark:text-black-1000 text-[12px] font-medium h-4 w-4 relative rotate-45 z-2 transition-colors duration-fast ease-linear cursor-pointer",
                    index == 2
                      ? "bg-white-100 dark:bg-background-300"
                      : "bg-background-500 dark:bg-white-100"
                  )}
                  onClick={() => toggleStep(index)}
                >
                  <div className="flex items-center justify-center -rotate-45">
                    {step.icon ? (
                      <Icon
                        name="check1"
                        size={12}
                        className={twMerge("text-white dark:text-black-1000")}
                      />
                    ) : (
                      <div
                        className={twMerge(
                          index === 2 && "dark:text-gray-200"
                        )}
                      >
                        {index + 1}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex-1 w-auto md:w-[200px] transition-colors duration-100 ease-linear">
                  <div className="md:text-base text-xs">
                    <div
                      className="flex items-center text-black-300 font-semibold cursor-pointer"
                      onClick={() => toggleStep(index)}
                    >
                      <div>{step.title}</div>
                      <Icon
                        name="chevron-down"
                        size={20}
                        className={twMerge(
                          "text-gray ml-1 mr-2 min-w-4",
                          openSteps.includes(index) ? "rotate-180" : "rotate-0"
                        )}
                      />
                    </div>
                  </div>

                  {openSteps.includes(index) && (
                    <div className="md:text-sm text-xs text-black-300 mt-2">
                      {step.description}
                    </div>
                  )}
                </div>

                {index === 0 && (
                  <div className="absolute bottom-4 h-auto left-[7px] top-0 w-[2px] transform translate-y-5 bg-background-500 dark:bg-white-100"></div>
                )}
                {index === 1 && (
                  <div className="absolute bottom-4 h-auto left-[7px] top-0 w-[2px] transform translate-y-5 linear-gradient-1 "></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
