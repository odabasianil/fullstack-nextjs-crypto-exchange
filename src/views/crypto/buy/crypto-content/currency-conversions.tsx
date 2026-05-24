import Link from "next/link";
import Image from "next/image";

interface CurrencyConversionsItem {
  title: string;
  currency1Amount: number;
  currency2Amount: number;
  image1: string;
  image2: string;
  link: string;
}

interface CurrencyConversionsProps {
  title: string;
  description: string;
  items: CurrencyConversionsItem[];
}

export const CurrencyConversions: React.FC<CurrencyConversionsProps> = ({
  title,
  description,
  items,
}) => {
  return (
    <div className="lg:mt-32 md:mt-24 mt-8 px-4 lg:px-0">
      <h2 className="md:text-[40px] text-[28px] leading-[36px] md:leading-[48px] dark:text-white-100 font-semibold">
        {title}
      </h2>
      <div className="md:text-base text-sm dark:text-gray mt-2">
        {description}
      </div>
      <div className="md:mt-8 mt-3">
        <div className="grid md:gap-4 gap-3 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
          {items.map((item, index) => (
            <div
              key={index}
              className="p-6 border dark:border-background-300 border-white-100 flex justify-between items-center rounded-2xl"
            >
              <div className="flex-1 flex flex-col gap-2">
                <Link
                  href={item.link}
                  className="dark:text-white-100 text-black-200 font-semibold hover:text-primary-200 dark:hover:text-primary"
                >
                  {item.title}
                </Link>
                <div className="dark:text-gray text-gray-300">
                  {item.currency1Amount} USDT = {item.currency2Amount}{" "}
                  {item.title.split(" to ")[1]}
                </div>
              </div>
              <div className="h-[40px] flex items-center">
                <Image src={item.image1} alt="coin 1" width={40} height={40} />
                <Image
                  src={item.image2}
                  alt="coin 2"
                  width={40}
                  height={40}
                  className="relative right-[8px]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="lg:mb-16 md:mb-12 mb-6 text-sm text-gray mt-3">
        This site is protected by reCAPTCHA and the Google{" "}
        <Link href="" className="font-medium hover:text-primary text-primary font-semibold">
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link href="" className="text-primary hover:text-primary font-semibold">
          Terms of Service
        </Link>{" "}
        apply.
      </div>
    </div>
  );
};
