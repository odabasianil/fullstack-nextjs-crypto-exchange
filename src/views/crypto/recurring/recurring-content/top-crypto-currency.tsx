import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface Currency {
  label: string;
  image: string;
}

interface Pair {
  label: string;
  image: string;
  link: string;
}

interface TopCryptoCurrencyProps {
  data: {
    currencies: Currency[];
    pairs: Pair[];
  };
}

const TopCryptoCurrency: React.FC<TopCryptoCurrencyProps> = ({ data }) => {
  return (
    <div className="lg:mt-[120px] lg:ml-[-120px] lg:mr-[-120px] md:mt-[96px] md:mr-[-24px] md:ml-[-24px] mt-[42px] ml-[-16px] mr-[-16px]">
      <div className="flex wrap w-full dark:bg-background bg-white-900 justify-center ">
        <div className="lg:w-full lg:max-w-[1200px] lg:ml-[81px] lg:mr-[81px] lg:pt-[24px] md:w-[640px] md:max-w-none md:ml-0 md:mr-0 md:pt-[24px] w-[343px] max-w-none flex justify-between ml-0 mr-0 items-center">
          <div className="w-full flex flex-col">
            <h2>
              <div className="lg:text-[28px] lg:mb-4 md:text-xl md:mb-3 dark:text-white-100 text-xl text-black-1000 text-center font-semibold">
                Top Cryptocurrency Conversions
              </div>
            </h2>
            <div className="lg:mt-12 md:mt-12 mt-[40px]">
              <div className="relative">
                <div className="lg:pb-8 md:pb-8 pb-6 border-b dark:border-black-700 border-gray-800 flex flex-row flex-wrap justify-center w-full">
                  {data.currencies.map((currency, index) => (
                    <div key={index} className="cursor-pointer">
                      <div className="lg:w-[190px] lg:mb-0 md:w-[190px] w-[168px] md:mb-2 flex justify-center items-center text-base dark:text-white-100 text-black-1000 mb-2 h-[40px]">
                        <Image
                          src={currency.image}
                          alt={currency.label}
                          width={24}
                          height={24}
                          className="mr-2"
                        />
                        <span>{currency.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center wrap w-full ">
                <div className="lg:pt-6 lg:pb-6 md:pb-6 md:pt-6 flex flex-wrap justify-center pt-4 pb-4 w-full">
                  {data.pairs.map((pair, index) => (
                    <div key={index} className="lg:w-[230px] md:w-[128px] w-[112px] h-[44px] flex justify-center items-center">
                      <Link href={pair.link} className="text-sm flex items-center justify-center cursor-pointer dark:text-white-100 text-black-1000 whitespace-nowrap">
                        <Image
                          src={pair.image}
                          alt={pair.label}
                          width={20}
                          height={20}
                          className="lg:mr-2 md:mr-2 mr-0.5"
                        />
                        {pair.label}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopCryptoCurrency;
