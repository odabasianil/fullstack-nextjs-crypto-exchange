"use client";

import Select from '@/components/ui/select'
import data from '@/data/markets/trading-data/ranking-list.json'
import { Top10List } from '@/views/crypto/payment/top-10-list';
import Image from 'next/image'

export const RankingsView = () => {
  const options = [
    { label: "Crypto" },
    { label: "All Market" },
    { label: "USDT Market" },
    { label: "BNB Market" },
    { label: "BTC Market" },
    { label: "ETH Market" },
  ];

  return (
    <div className="px-[15px] md:px-0">
      <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-[15px] md:gap-6">
        {data.map((item, index) => (
          <Top10List options={options} item={item} key={index} />
        ))}

        <div className="md:col-span-2 flex flex-col gap-2 border p-4 border-white-100 dark:border-secondary min-h-[544px] rounded-2xl">
          <div className="md:text-xl font-semibold">
            Price Change Distribution
          </div>
          <Image
            src="/images/markets/dark/trading-chart.png"
            alt="Trading Chart"
            width={800}
            height={400}
            className="hidden md:dark:block"
          />
          <Image
            src="/images/markets/dark/trading-chart-mobile.png"
            alt="Trading Chart"
            width={400}
            height={200}
            className="hidden dark:block md:hidden md:dark:hidden"
          />
          <Image
            src="/images/markets/trading-chart.png"
            alt="Trading Chart"
            width={800}
            height={400}
            className="hidden md:block dark:hidden"
          />
          <Image
            src="/images/markets/trading-chart-mobile.png"
            alt="Trading Chart"
            width={400}
            height={200}
            className="block dark:hidden md:hidden"
          />
        </div>
        {<Top10List options={options} item={data[0]} />}
      </div>
    </div>
  );
};
