import { Card } from "@/components/ui/card";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

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

const GettingStarted = ({ data }: DcaBenefitsProps) => {
  return (
    <div>
      <div className="lg:mt-[160px] lg:mb-[48px] md:text-[28px] md:leading-[36px] md:mt-[96px] md:mb-[29px] text-2xl dark:text-gray-800 font-semibold mt-[64px] mb-[24px]">
        {data.title}
      </div>
      <div className="flex flex-wrap lg:justify-between md:justify-start lg:mb-12 md:mb-6 mb-6">
        {data.items.map((benefit, index) => (
          <Card
            key={index}
            className={twMerge(
              "md:dark:bg-background-300 md:rounded-none dark:bg-background-300 bg-gray-1000 lg:w-[calc((100%-48px)/5)] lg:mb-0 lg:mr-0 lg:px-[24px] lg:pt-[32px] lg:pb-[64px] md:w-[calc((100%-32px)/3)] md:mb-4 md:mr-4 md:px-4 md:pt-4 md:pb-[60px] w-full mb-3 mr-3 rounded-[4px] px-[20px] py-[20px]",
              index % 3 === 2 ? "md:mr-0" : "md:mr-4"
            )}
          >
            <Image
              src={benefit.icon}
              alt={benefit.title}
              width={48}
              height={48}
              className="md:w-[48px] md:h-[48px] w-[32px] h-[32px]"
            />
            <div className="text-base font-semibold dark:text-white-100 text-black-300 md:mt-8 mt-4 ">
              {benefit.title}
            </div>
            <div className="text-xs dark:text-gray text-black-300 mt-1">
              {benefit.description}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GettingStarted;
