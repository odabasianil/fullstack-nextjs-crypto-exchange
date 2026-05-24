"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { twMerge } from "tailwind-merge";

interface Topic {
  text: string;
  link: string;
  image: string;
  description: string;
}

interface ReadMoreProps {
  data: Topic[];
}

export const ReadMore = ({ data }: ReadMoreProps) => {
  return (
    <div className="lg:py-12 md:py-10 py-6">
      <div className="md:px-6 px-4 mx-auto max-w-[1248px]">
        <h4 className="lg:mb-8 md:mb-6 mb-6 lg:text-[28px] lg:leading-[36px] lg:font-semibold md:text-xl md:font-medium text-xl dark:text-gray-800 text-black-100">
          Read More
        </h4>
        <div className="md:grid-cols-2 grid-cols-1 md:gap-x-6 gap-x-4 gap-y-6 grid">
          {data.map((item, index) => (
            <div
              key={index}
              className="lg:pt-8 lg:pb-8 lg:py-8 md:pt-0 md:pb-0 md:py-0 pt-0 pb-0 py-0 flex"
            >
              <div
                className={twMerge(
                  "relative md:w-[64px] md:h-[64px] w-[32px] h-[32px] bg-no-repeat bg-cover bg-center bg-transparent flex-shrink-0"
                )}
                style={{ backgroundImage: `url('${item.image}')` }}
              ></div>
              <div className="md:ml-6 ml-4">
                <div className="md:text-xl text-base font-semibold dark:text-gray-800 text-black-100 mb-2">
                  {item.text}
                </div>
                <div className="text-sm text-gray-300 dark:text-white-700">
                  {item.description}
                </div>
                <Link href={item.link}>
                  <Button className="text-sm mt-4" appearance="link">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
