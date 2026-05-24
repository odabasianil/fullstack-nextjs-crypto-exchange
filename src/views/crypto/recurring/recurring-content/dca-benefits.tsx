import { Card } from "@/components/ui/card";
import Image from "next/image";

interface Benefit {
  title: string;
  description: string;
  icon: string;
}

interface BenefitsData {
  title: string;
  [key: string]: any;
  items: Benefit[];
}

interface DcaBenefitsProps {
  data: BenefitsData;
}

const DcaBenefits = ({ data }: DcaBenefitsProps) => {
  return (
    <div>
      <div className="lg:mt-[160px] lg:mb-[48px] md:text-[28px] md:leading-[36px] md:mt-[96px] md:mb-[29px] text-2xl dark:text-gray-800 font-semibold mt-[64px] mb-[24px]">
        {data.title}
      </div>
      <div className="flex flex-wrap justify-between lg:mb-12 md:mb-6 mb-6">
        {data.items.map((benefit, index) => (
          <Card
            key={index}
            className="md:dark:bg-background-300 rounded-none dark:bg-background-300 bg-gray-1000 lg:w-[calc((100%-48px)/3)] lg:mb-6 lg:px-[27px] lg:py-[28px] md:w-[calc((100%-32px)/3)] md:mb-4 md:px-4 md:py-4 w-full mb-6 px-[20px] py-[20px]"
          >
            <Image
              src={benefit.icon}
              alt={benefit.title}
              width={48}
              height={48}
              className="md:w-[48px] md:h-[48px] w-[32px] h-[32px]"
            />
            <div className="text-base mt-1 dark:text-white-100 text-black-300">
              {benefit.title}
            </div>
            <div className="text-xs dark:text-gray text-black-300 mt-1">
              {benefit.description}
            </div>
          </Card>
        ))}
      </div>

      <div className="lg:mt-[136px] md:mt-[80px] flex md:flex-row flex-col-reverse justify-between w-full">
        <div className="">
          <h2 className="md:text-[28px] md:leading-[36px] dark:text-white-100 text-2xl font-semibold">
            {data?.title2}
          </h2>
          <div className="lg:mt-12 md:mt-7 mt-[25px] md:text-xl text-lg md:font-normal font-semibold dark:text-white-100">
            {data.title3}
          </div>
          <div className="md:text-base text-sm md:dark:text-gray-100 dark:text-gray-900 text-black-300 mt-2">
            {data.description}
          </div>
          <div className="lg:mt-12 md:mt-7 mt-[25px] md:text-xl text-lg md:font-normal font-semibold dark:text-white-100">
            {data.title4}
          </div>
          <div className="md:text-base text-sm md:dark:text-gray-100 dark:text-gray-900 text-black-300 mt-2">
            {data.description2}
          </div>
          <div className="lg:mt-12 md:mt-7 mt-[25px] md:text-xl text-lg md:font-normal font-semibold dark:text-white-100">
            {data.title5}
          </div>
          <div className="md:text-base text-sm md:dark:text-gray-100 dark:text-gray-900 text-black-300 mt-2">
            {data.description3}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DcaBenefits;
