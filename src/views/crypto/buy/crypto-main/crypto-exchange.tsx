"use client";
import { twMerge } from "tailwind-merge";
import CoinSelect from "../../../../components/ui/coin-select";
import { useState } from "react";
import { Button } from "../../../../components/ui/button";
import PayWith from "../../payment/pay-with";
import { CartModal } from "../../payment/cart-modal";

interface CoinItem {
  name: string;
  image: string;
  [key: string]: any;
}

interface CoinSection {
  title: string;
  type?: string;
  items: CoinItem[];
}

interface PaymentOption {
  name: string;
  price: string;
  icon: string;
  [key: string]: any;
}

interface CryptoExchangeProps {
  theme: string;
  coins: {
    buy: CoinSection[];
    sell: CoinSection[];
  };
  paymentMethods: {
    category: string;
    options: PaymentOption[];
  }[];
}

export default function CryptoExchange({
  theme,
  coins,
  paymentMethods,
}: CryptoExchangeProps) {
  const [selectedTab, setSelectedTab] = useState<"buy" | "sell">("buy");
  const [paymentMethod, setPaymentMethod] = useState<[string, string]>([
    "Vodafone Cash",
    "/images/default.png",
  ]);
  const [open, setOpen] = useState(false);

  const handleCoinSelect = (coin: any) => {
    switch (coin.name) {
      case "EUR":
        setPaymentMethod(["Card (VISA/Mastercard)", "visa"]);
        break;
      case "Ethereum":
        setPaymentMethod(["Card (VISA/Mastercard)", "visa"]);
        break;
      case "BNB":
        setPaymentMethod(["PayPal", "/images/paypal.png"]);
        break;
      default:
        setPaymentMethod([
          "Enter Amount and select payment",
          "select-method-empty",
        ]);
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="md:mx-0 mx-4">
          <div
            className={twMerge(
              "border dark:border-secondary  border-white-100 rounded-[24px] md:h-[592px] h-[unset] md:pb-6 pb-0 relative",
              theme === "primary" && "md:w-[486px] w-full"
            )}
          >
            <div
              className={twMerge(
                "rounded-tl-[24px] rounded-tr-[24px] h-[84px]",
                selectedTab === "buy"
                  ? "dark:bg-dark-buy-gradient bg-light-buy-gradient"
                  : "dark:bg-dark-sell-gradient bg-light-sell-gradient"
              )}
            >
              <div
                className={twMerge(
                  "rounded-tl-[24px] rounded-tr-[24px] h-16 overflow-hidden",
                  selectedTab === "buy"
                    ? "dark:bg-dark-buy-gradient-2 bg-light-buy-gradient-2"
                    : "dark:bg-dark-buy-gradient-2 bg-light-buy-gradient-2"
                )}
              >
                <div className="flex rounded-t-[24px] h-16 justify-start overflow-hidden">
                  <div
                    datatype="buy"
                    onClick={() => setSelectedTab("buy")}
                    className={twMerge(
                      "flex flex-1 items-center pl-4  text-xl font-semibold justify-center relative  after:rounded-2xl after:bottom-0 after:absolute after:right-[-24px] after:top-0 after:w-6  cursor-pointer",
                      selectedTab === "buy"
                        ? "dark:bg-background dark:after:bg-background dark:text-white-100 text-black-200 bg-white after:skew-x-[15deg] after:bg-white"
                        : "dark:bg-secondary dark:text-gray-200 text-gray-100 bg-white-300 dark:after:bg-secondary after:bg-white-300 after:skew-x-[-15deg]"
                    )}
                  >
                    Buy
                  </div>

                  <div
                    className={twMerge(
                      "flex ml-12 items-center text-gray-200 flex-1 text-xl font-semibold justify-center leading-7 relative before:absolute before:rounded-2xl before:bottom-0 before:left-[-24px] before:top-0 before:w-6 cursor-pointer",
                      selectedTab === "buy"
                        ? "dark:bg-secondary dark:before:bg-secondary bg-white-300 dark:text-gray-200 text-gray-100 before:bg-white-300 before:skew-x-[15deg]"
                        : "dark:bg-background dark:before:bg-background bg-white dark:text-white-100 text-black-200 before:bg-white before:skew-x-[-15deg]"
                    )}
                    onClick={() => setSelectedTab("sell")}
                  >
                    Sell
                  </div>
                </div>
              </div>
            </div>
            <div className="pb-4 md:px-7 px-4 pt-6 dark:bg-background bg-white rounded-2xl mt-[-20px]">
              {selectedTab === "buy" ? (
                <div>
                  {coins.buy.map((category) => (
                    <div key={category.title} className="last:mt-3">
                      <CoinSelect
                        coins={category.items}
                        title={category.title}
                        onCoinSelect={handleCoinSelect}
                        max={false}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <div>
                    {coins.sell.map((category) => (
                      <div key={category.title} className="last:mt-3">
                        <CoinSelect
                          coins={category.items}
                          title={category.title}
                          onCoinSelect={handleCoinSelect}
                          max={true}
                          type={category.type}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="md:absolute md:mt-0 mt-4 relative w-full md:px-7 px-4 left-0 bottom-6">
              <PayWith
                paymentMethod={paymentMethod}
                paymentMethods={paymentMethods}
              />
              <div className="w-full">
                <Button
                  appearance="primary"
                  className="h-[56px] rounded-[4px] w-full text-xl font-medium"
                  onClick={() => setOpen(true)}
                >
                  Buy USDT
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CartModal open={open} setOpen={setOpen} />
    </>
  );
}
