import Image from "next/image";
import { twMerge } from "tailwind-merge";

export const NoResult = ({
  text,
  textClass,
  imageClass,
  width = 96,
  height = 96,
  children
}:
  {
    text?: string;
    textClass?: string;
    imageClass?: string;
    width?: number;
    height?: number;
    children?: React.ReactNode;
  }) => {

  return (
    <div className="w-full flex justify-center items-center">
      <div className="flex flex-col items-center justify-center">
        <Image 
          src="/images/no-result.svg"
          alt="No Result"
          width={width}
          height={height}
          className={twMerge("mt-4 mx-4 mb-6", imageClass)}
        />
        <span className={twMerge("text-center text-gray-500 dark:text-gray mt-4", textClass)}>{text ? text : "No result found"}</span>
        {children}
      </div>
    </div>
  )
}