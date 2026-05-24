"use client";
import Image from "next/image";
import Link from "next/link";

interface FaqCardData {
  text: string;
  link: string;
}

interface FaqCardsProps {
  data: FaqCardData[];
}

export const FaqCards = ({ data }: FaqCardsProps) => {
  return (
    <div>
      <h1 className="lg:text-[28px] lg:leading-[36px] lg:mb-6 md:text-2xl md:mb-4 text-xl mb-2 dark:text-white-100 text-black-1100 font-semibold">
        Account Functions
      </h1>
      <div className="md:mb-12 mt-0 mr-[-2] mb-2 ml-[-8px]">
        <div className="flex flex-wrap">
          {data.map((item, index) => (
            <Link
              href={item.link}
              key={index}
              className="cursor-pointer lg:mb-2 lg:px-8 lg:w-[calc(33%-16px)] md:mb-4 md:px-4 md:mx-2 md:w-[calc(50%-16px)] dark:bg-black-900 bg-white-900 w-[calc(50%-8px)] mt-2 mr-1 mb-4 ml-1 py-6 px-4"
            >
              <h6 className="md:text-xl md:font-medium text-base font-medium text-black-1100 dark:text-white-100 hover:dark:text-primary-300 hover:text-primary-400">
                {item.text}
              </h6>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
