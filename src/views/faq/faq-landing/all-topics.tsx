"use client";
import Image from "next/image";
import Link from "next/link";

interface Topic {
  icon: string;
  text: string;
  link: string;
}

interface AllTopicsProps {
  data: Topic[];
}

export const AllTopics = ({ data }: AllTopicsProps) => {
  return (
    <div className="lg:py-12 md:py-10 py-6">
      <div className="mx-auto max-w-[1248px]">
        <h4 className="lg:mb-8 md:mb-6 lg:text-[28px] lg:leading-[36px] lg:font-semibold md:text-xl md:px-6 text-xl font-medium mb-6 px-4 dark:text-gray-800 text-black-100">
          All Topics
        </h4>
        <div className="md:px-3 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 px-1 m-auto gap-y-6 gap-x-8">
          {data.map((topic) => (
            <div key={topic.text}>
              <Link
                className="m-0 grid w-fit items-start grid-cols-[24px_1fr] rounded-lg gap-2 px-[13px] py-[9px] text-black-700 dark:text-white-700 hover:bg-white-300 dark:hover:bg-black-900"
                href={topic.link}
              >
                <Image
                  src={topic.icon}
                  alt={topic.text}
                  width={24}
                  height={24}
                />
                <div className="text-black-700 dark:text-white-700 text-base font-normal">
                  {topic.text}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
