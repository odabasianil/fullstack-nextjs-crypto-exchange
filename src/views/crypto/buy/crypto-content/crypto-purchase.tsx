import { Card } from "@/components/ui/card";
import Image from "next/image";

interface Card {
  step: number;
  title: string;
  description: string;
  image: string;
}

interface CryptoPurchaseViewProps {
  title: string;
  data: Card[];
}

export const CryptoPurchaseView: React.FC<CryptoPurchaseViewProps> = ({
  title,
  data,
}) => {
  return (
    <>
      <div className="mt-8 md:mt-24 lg:mt-[128px] md:px-6 px-4 lg:px-0">
        <h2 className="md:text-[40px] md:leading-[48px] text-[28px] leading-[36px] text-black-200 dark:text-white-100 font-semibold dark:-text-white-100">
          {title}
        </h2>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 md:gap-6 md:mt-8">
          {data.map((step) => (
            <Card
              key={step.step}
              className="lg:mb-8 md:bg-white bg-white mb-0 p-6 border md:dark:bg-transparent dark:bg-transparent border-white-100 rounded-3xl dark:border-background-300"
            >
              <Image
                src={step.image}
                alt="qr"
                width={96}
                height={96}
                className="md:w-[96px] md:h-[96px] w-[64px] h-[64px]"
              />
              <div className="text-xl text-black-200 font-semibold mt-6 dark:text-white-100">
                {step.title}
              </div>
              <div className="text-sm text-gray-300 mt-2 dark:text-white-100">
                {step.description}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};
