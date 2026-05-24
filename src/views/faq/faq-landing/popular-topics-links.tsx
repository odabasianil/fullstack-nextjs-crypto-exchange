"use client";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface Topic {
  text: string;
  link: string;
}

interface PopularTopicsLinksProps {
  data: Topic[];
  className?: string;
  parentClass?: string;
  rowClass?: string;
}

export const PopularTopicsLinks = ({
  data,
  className,
  parentClass,
  rowClass,
}: PopularTopicsLinksProps) => {
  const groupedData = data.reduce(
    (acc: Topic[][], curr: Topic, index: number) => {
      if (index % 3 === 0) {
        acc.push([curr]);
      } else {
        acc[acc.length - 1].push(curr);
      }
      return acc;
    },
    []
  );

  return (
    <div className={twMerge(parentClass)}>
      <div className={twMerge("", className)}>
        <h4 className="lg:mb-8 md:mb-6 mb-6 lg:text-[28px] lg:leading-[36px] lg:font-semibold md:text-xl md:font-medium text-xl dark:text-gray-800 text-black-100">
          Popular Topics
        </h4>
        <div className="flex flex-col">
          <div
            className={twMerge(
              "grid md:grid-cols-[repeat(auto-fill,minmax(475.5px,1fr))] grid-cols-[repeat(auto-fill,1fr)] md:gap-6 gap-6",
              rowClass
            )}
          >
            {groupedData.map((group, groupIndex) => (
              <div key={groupIndex} className="lg:block md:none">
                {group.map((topic, topicIndex) => (
                  <div
                    key={topicIndex}
                    className="lg:mb-10 md:mb-6 mb-6 break-words "
                  >
                    <Link
                      className="lg:text-base md:text-base text-sm dark:text-gray-800 text-black-100 hover:underline"
                      href={topic.link}
                    >
                      {topic.text}
                    </Link>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
