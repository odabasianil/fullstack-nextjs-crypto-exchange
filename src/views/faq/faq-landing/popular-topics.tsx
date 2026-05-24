"use client";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import Link from "next/link";

interface Topic {
  image: string;
  title: string;
  description: string;
}

interface PopularTopicsProps {
  data: Topic[];
}

export const PopularTopics = ({ data }: PopularTopicsProps) => {
  return (
    <div className="lg:py-12 md:py-10 py-6">
      <div className="md:px-6 px-4 mx-auto max-w-[1248px]">
        <h4 className="lg:mb-8 md:mb-6 mb-6 lg:text-[28px] lg:leading-[36px] lg:font-semibold md:text-xl md:font-medium text-xl dark:text-gray-800 text-black-100">
          Popular Topics
        </h4>
        <div className="lg:mx-[-12px] lg:mb-[-24px] md:mx-[-8px] md:mb-[-16px] mx-[-8px] mb-[-16px] flex flex-wrap">
          {data.map((topic, index) => (
            <Card
              key={index}
              className="lg:w-[33%] lg:mb-6 md:w-[33%] md:mb-4 w-[50%] mb-2 md:p-0 md:dark:bg-transparent"
            >
              <Link
                className="h-full mx-1 lg:px-12 lg:py-10 lg:mr-3 md:py-9 md:px-4 md:mx-2 md:flex-col flex flex-row py-6 px-2 rounded-lg dark:bg-black-900 bg-white-200"
                href="#"
              >
                <Image
                  src={topic.image}
                  alt={topic.title}
                  width={64}
                  height={64}
                  className="lg:w-[64px] lg:h-[64px] md:w-[48px] md:h-[48px] w-[24px] h-[24px] md:mb-6 mb-0"
                />
                <div className="md:pl-0 pl-2.5">
                  <div className="lg:text-xl md:text-xl text-base dark:text-gray-800 text-black-100">
                    {topic.title}
                  </div>
                  <div className="lg:mt-4 md:mt-2 md:h-auto text-sm dark:text-white-700 text-black-700 h-0 overflow-hidden text-left font-normal">
                    {topic.description}
                  </div>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
