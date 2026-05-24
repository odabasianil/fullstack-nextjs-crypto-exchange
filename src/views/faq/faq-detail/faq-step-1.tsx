"use client";
import Link from "next/link";

interface LinkItem {
  name: string;
  url: string;
}

interface FaqStep1 {
  level?: number;
  title?: string;
  links?: LinkItem[];
}

interface FaqStep1Props {
  data: FaqStep1;
}

export const FaqStep1 = ({ data }: FaqStep1Props) => {
  return (
    <div className="lg:mx-8 md:mx-6 mx-0 pt-2">
      <h1 className="lg:text-[28px] lg:leading-[36px] lg:mb-6 md:text-2xl md:mb-4 text-xl mb-2 dark:text-white-100 text-black-1100 font-semibold">
        {data.title}
      </h1>
      <div className="md:mb-12 mt-0 mr-[-2] mb-2 ml-[-8px]">
        <div className="flex flex-wrap">
          {data.links?.map((item, index) => (
            <div className="lg:w-[calc(50%-16px)] md:w-[calc(100%-16px)] w-[calc(100%-16px)]">
              <Link
                key={index}
                href={item.url}
                className="text-base lg:mb-6 mb-4 inline-block p-2 dark:text-white-100 text-black-1100"
              >
                {item.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
