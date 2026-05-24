import React from "react";

interface CurrencyExchangeItem {
  currency1Amount: number;
  currency2Amount: number;
}

interface CurrencyExchangeViewProps {
  items: {
    title: string;
    items: CurrencyExchangeItem[];
  }[];
}

export const CurrencyExchangeView: React.FC<CurrencyExchangeViewProps> = ({
  items,
}) => {
  return (
    <div className="flex gap-6 md:flex-row flex-col justify-between mt-6 md:px-0 px-4">
      {items.map((exchange, index) => (
        <div key={index} className="flex-1 border border-white-100 dark:border-secondary rounded-2xl">
          <div className="md:p-6 p-4">
            <div className="mb-4 text-2xl text-black-200 dark:text-white-100 font-semibold">
              {exchange.title}
            </div>
            {exchange.items.map((item, i) => (
              <div
                key={i}
                className="flex justify-between text-black-200  dark:text-white-100 py-4 items-center md:text-base"
              >
                <div>{item.currency1Amount} USDT</div>
                <div>{item.currency2Amount} AZN</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
