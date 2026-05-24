import React, { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { Icon } from "./icon";

export interface Coin {
  name: string;
  symbol?: string;
  image: string;
  placeholder?: string;
  min?: string;
  spot?: boolean;
}

export interface CoinSelectProps {
  title: string;
  coins: Coin[];
  type?: string;
  onCoinSelect: (coin: Coin) => void;
  reset?: boolean;
  max: boolean;
}

const CoinSelect: React.FC<CoinSelectProps> = ({
  coins,
  title,
  onCoinSelect,
  max,
  type,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [animateOpen, setAnimateOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("spot");

  useEffect(() => {
    if (coins.length > 0) {
      setSelectedCoin(coins[0]);
      onCoinSelect(coins[0]);
    }
  }, [coins]);

  useEffect(() => {
    if (isOpen) {
      setAnimateOpen(true);
    } else {
      const timer = setTimeout(() => {
        setAnimateOpen(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const spotCoins = filteredCoins.filter((coin) => coin.spot === true);
  const fundingCoins = filteredCoins.filter((coin) => !coin.spot);

  const handleSelect = (coin: Coin) => {
    setSelectedCoin(coin);
    setIsOpen(false);
    onCoinSelect(coin);
    setInputValue("");
    setError(null);
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);

    if (
      selectedCoin &&
      selectedCoin.min &&
      parseFloat(value) < parseFloat(selectedCoin.min)
    ) {
      setError(`Min amount ${selectedCoin.min} ${selectedCoin.name}`);
    } else {
      setError(null);
    }
  };

  return (
    <>
      <div
        className={twMerge(
          "dark:bg-black-600 md:dark:bg-background md:bg-white bg-white-300 relative rounded-xl w-full border p-4",
          error
            ? "border-error hover:border-error"
            : "dark:border-secondary border-white-100 dark:hover:border-primary-100 hover:border-primary-100"
        )}
      >
        <div className="flex justify-between items-center md:text-sm text-xs font-normal dark:text-white-100 text-black-200">
          {title}
        </div>
        <div className="flex gap-3 items-center mt-1">
          <div className="flex flex-1">
            <input
              placeholder={selectedCoin ? selectedCoin.placeholder : ""}
              className="h-8 w-full dark:text-white-100 md:text-2xl text-lg font-medium dark:bg-black-600 md:dark:bg-background md:bg-white bg-white-300 outline-none"
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
            />
          </div>
          {inputValue.length > 0 && (
            <div
              className="cursor-pointer"
              onClick={() => {
                setInputValue("");
              }}
            >
              <Icon
                name="close-icon"
                size={20}
                color=""
                className="text-gray"
              />
            </div>
          )}
          {max && type == "sell" && (
            <div className="font-base text-primary font-medium cursor-pointer">
              Max
            </div>
          )}

          <div
            className="md:dark:bg-background dark:bg-black-600 md:bg-white bg-white-300 flex justify-center items-center w-[97px] cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            {selectedCoin ? (
              <>
                <img
                  className="w-5 h-5"
                  src={selectedCoin.image}
                  alt={selectedCoin.name}
                />
                <div className="ml-[8px] text-nc-PrimaryText text-[16px] font-[500]">
                  {selectedCoin.name}
                </div>
                <Icon
                  name="chevron-down"
                  size={20}
                  className={twMerge("text-gray ml-1 mr-2 min-w-4")}
                />
              </>
            ) : (
              <div>Select a coin</div>
            )}
          </div>
        </div>
        {error && (
          <div className="text-error-100 text-sm leading-[20px] mt-2">
            {error}
          </div>
        )}
        {isOpen && (
          <div
            className={twMerge(
              "md:h-auto md:max-h-none h-[calc(100%-80px)] max-h-[calc(100%-80px)] md:absolute md:left-0 md:top-custom fixed right-0 top-[auto] md:bottom-auto bottom-0 py-2.5 w-full z-10",
              "md:dark:bg-black-100 dark:bg-black-200 bg-white shadow-custom",
              "md:rounded-xl rounded-tl-2xl rounded-tr-2xl",
              "invisible opacity-0 translate-3d-100 transition-transform-250 md:transition-none",
              animateOpen ? "translate-3d-reset visible opacity-100" : ""
            )}
          >
            <div className="px-2.5 flex justify-between gap-4 items-center w-full">
              <div className="flex justify-between items-center px-2.5 py-2.5 dark:bg-black-600 md:dark:bg-transparent bg-white-300 md:bg-transparent dark:border-secondary border-white-100 border md:h-[42px] h-[32px] w-full mb-2.5 rounded-lg hover:border-primary dark:hover:border-primary ">
                <Icon
                  name="search"
                  size={14}
                  color="#fff"
                  className="dark:hidden text-gray"
                />
                <Icon
                  name="search"
                  size={14}
                  color="transparent"
                  className="hidden dark:block dark:text-gray"
                />
                <div className="flex flex-1">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="dark:text-white-100 text-black-200 leading-[22px] font-medium text-sm bg-transparent w-full h-[32px] md:h-[42px] ml-1.5 outline-none"
                  />
                </div>
              </div>
              <div
                onClick={() => {
                  setIsOpen(false);
                }}
                className="md:hidden block text-primary font-base cursor-pointer font-medium"
              >
                Cancel
              </div>
            </div>

            {spotCoins.length > 0 ? (
              <div>
                <div className="flex gap-6 pl-2.5">
                  <div
                    onClick={() => setActiveTab("spot")}
                    className={twMerge(
                      "dark:text-black-300 text-black-300  text-sm pr-2.5 pl-2.5 pt-2 pb-1 cursor-pointer font-medium relative",
                      activeTab === "spot"
                        ? "text-black-100 dark:text-white after:content-[''] after:absolute after:bottom-[-3px] after:left-1/2 after:bg-primary after:w-4 after:h-[3px] after:transform after:-translate-x-1/2"
                        : ""
                    )}
                  >
                    Spot Wallet
                  </div>
                  <div
                    onClick={() => setActiveTab("funding")}
                    className={twMerge(
                      "dark:text-black-300 text-black-300 text-sm cursor-pointer font-medium pt-2 pb-1 relative",
                      activeTab === "funding"
                        ? "text-black-100 dark:text-white after:content-[''] after:absolute after:bottom-[-3px] after:left-1/2 after:bg-primary after:w-4 after:h-[3px] after:transform after:-translate-x-1/2"
                        : ""
                    )}
                  >
                    Funding Wallet
                  </div>
                </div>
                <div className="flex items-center px-2.5 pt-2 pb-1 my-1.5 h-[30px]">
                  <Icon
                    name="payment-warning"
                    size={16}
                    className="mr-1 text-gray cursor-pointer"
                  />
                  <div className=" dark:text-gray text-black-300 text-xs">
                    The assets show below only support Fiat trading.
                  </div>
                </div>
                <div className="h-[228px] overflow-y-auto custom-scroll">
                  {activeTab === "spot" &&
                    spotCoins.map((coin, index) => (
                      <div
                        key={coin.name}
                        onClick={() => handleSelect(coin)}
                        className="dark:hover:bg-background-300 hover:bg-white-300 py-[9px] px-2.5 my-[5px] flex items-center text-sm cursor-pointer"
                      >
                        <div className="flex items-center flex-1">
                          <img
                            src={coin.image}
                            alt={coin.name}
                            className="w-[20px] h-[20px] mr-[8px]"
                          />
                          {coin.name}
                        </div>
                      </div>
                    ))}
                  {activeTab === "funding" &&
                    fundingCoins.map((coin) => (
                      <div
                        key={coin.name}
                        onClick={() => handleSelect(coin)}
                        className="dark:hover:bg-background-300 hover:bg-white-300 py-[9px] px-2.5 my-[5px] flex items-center text-sm cursor-pointer"
                      >
                        <div className="flex items-center flex-1">
                          <img
                            src={coin.image}
                            alt={coin.name}
                            className="w-[20px] h-[20px] mr-[8px]"
                          />
                          {coin.name}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              <div className="h-[228px] overflow-y-auto custom-scroll">
                {filteredCoins.map((coin) => (
                  <div
                    key={coin.name}
                    onClick={() => handleSelect(coin)}
                    className="dark:hover:bg-background-300 hover:bg-white-300 py-[9px] px-2.5 my-[5px] flex items-center text-sm cursor-pointer"
                  >
                    <div className="flex items-center flex-1">
                      <img
                        src={coin.image}
                        alt={coin.name}
                        className="w-[20px] h-[20px] mr-[8px]"
                      />
                      {coin.name}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      {isOpen && (
        <div className="md:hidden block fixed bg-black opacity-50 w-full h-full right-0 top-0 z-9"></div>
      )}
    </>
  );
};

export default CoinSelect;
