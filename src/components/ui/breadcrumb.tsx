import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { Icon } from "./icon";

interface BreadCrumbProps {
  className?: string;
  segments: { name: string; href: string }[];
}

export const BreadCrumb = ({ className, segments }: BreadCrumbProps) => {
  return (
    <div className={twMerge("relative", className)}>
      <div className="flex items-center h-auto overflow-x-auto overflow-y-hidden no-scrollbar dark:text-gray-100 text-gray-700">
        <Link className="dark:text-gray text-white-1000 flex-shrink-0" href="/">
          <div className="text-sm">Home</div>
        </Link>
        {segments.map((segment, index) => (
          <>
            <div key={index} className="flex items-center flex-shrink-0">
              {index < segments.length && (
                <div className="flex-shrink-0">
                  <Icon
                    name="chevron-left"
                    size={18}
                    className="dark:text-gray-300 text-gray-800 leading-[1] mx-2 transform rotate-180"
                  />
                </div>
              )}
              <Link
                className={twMerge("dark:text-gray text-white-1000")}
                href={segment.href}
              >
                <div
                  className={twMerge(
                    "text-sm",
                    index == segments.length - 1 &&
                      "dark:text-gray-800 text-black-1100"
                  )}
                >
                  {segment.name}
                </div>
              </Link>
            </div>
          </>
        ))}
      </div>
      <div className="md:hidden absolute h-[34px] w-[60px] top-0 right-[-1px] bg-gradient-link"></div>
    </div>
  );
};
