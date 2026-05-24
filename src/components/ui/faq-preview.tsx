"use client";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Icon } from "./icon";
import Link from "next/link";

interface Step {
  title: string;
  description?: string;
  link?: string;
}

const stepsData: Step[] = [
  {
    title: "What is P2P exchange?",
    description:
      "P2P stands for peer-to-peer, and P2P exchanges are platforms that allow users to buy and sell crypto for fiat currency directly with other users.",
  },
  {
    title: "How do I buy Bitcoin locally on FAZ 3 P2P?",
    description:
      "After you complete identity verification and add your payment methods, you are ready to buy crypto on FAZ 3 P2P platform. First, choose from all the available offers in the marketplace. Second, place an order to buy your crypto, and pay the seller based on the preferred payment methods. Lastly, get your crypto from the seller after you complete the fiat transaction and confirm your payment on FAZ 3 P2P.",
  },
  {
    title:
      "Learn more about What is P2P Trading and How Does a Local Bitcoin Exchange Work?",
    link: "/",
  },
];

export const FaqPreview = () => {
  const [openStep, setOpenStep] = useState<number | null>(null);

  const toggleStep = (index: number) => {
    if (openStep === index) {
      setOpenStep(null);
    } else {
      setOpenStep(index);
    }
  };

  return (
    <div className="md:mb-8 mb-0 w-full ">
      <div className="relative flex justify-between items-center md:py-0 md:mb-2 py-4 overflow-hidden wrap">
        <span className="text-xl dark:text-white-100 text-black-200">FAQ</span>
        <Link
          className="md:text-xs text-xs dark:text-white-100 text-black-200"
          href={"/faq"}
        >
          <div className="flex items-center">
            <div>View More</div>
            <Icon
              name="chevron-left"
              className="transform rotate-180"
              size={16}
            />
          </div>
        </Link>
      </div>

      {stepsData.map((step, index) => (
        <div
          key={index}
          className={twMerge(
            "p-3 rounded-lg mx-[-12px] md:mb-3",
            openStep === index ? "bg-white-200 dark:bg-black-100" : ""
          )}
        >
          <div
            className={twMerge(
              "flex justify-between cursor-pointer dark:text-white-100 text-black-200 text-sm md:hover:text-primary-200 md:dark:hover:text-primary-100",
              openStep === index
                ? "md:text-primary-200 md:dark:text-primary-100"
                : ""
            )}
            onClick={() => toggleStep(index)}
          >
            <div className="flex-1 gap-3 flex items-center">
              <div className="flex items-center justify-center border md:dark:border-background-300 dark:border-white-100 md:border-background-300 border-white-100 rounded-lg min-w-[24px] min-h-[24px]">
                {index + 1}
              </div>
              <span>{step.title}</span>
            </div>
            {step.description ? (
              <Icon
                name={openStep === index ? "minus" : "plus"}
                size={16}
              />
            ) : (
              <Icon name={"link"} size={16} />
            )}
          </div>

          {openStep === index && (
            <div className="pt-2 text-xs text-black-700 dark:text-gray-100">
              {step.description && <p>{step.description}</p>}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
