"use client";
import { Icon } from "@/components/ui/icon";
import Image from "next/image";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { CurrencyModal } from "@/components/ui/currency-modal";
import { SchedulePicker } from "@/components/ui/schedule-picker";
import { Button } from "@/components/ui/button";
import InfoTooltip from "../../../../components/ui/info-tooltip";

const SelectAssets = ({ data }: { data: any }) => {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<{
    id: string;
    name: string;
    image: string;
    min: string;
    max: string;
  } | null>(null);
  const [selectedCrypto, setSelectedCrypto] = useState<{
    id: string;
    name: string;
    image: string;
  } | null>(null);
  const [type, setType] = useState<"currency" | "crypto">("currency");
  const [error, setError] = useState<string | null>(null);

  const handleOpenModal = (type: "currency" | "crypto") => {
    setType(type);
    setOpen(true);
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);

    if (
      selectedCurrency &&
      selectedCurrency.min &&
      parseFloat(value) < parseFloat(selectedCurrency.min)
    ) {
      setError(
        `The limit per transaction is between ${selectedCurrency.min} - ${selectedCurrency.max}. Please adjust the amount.`
      );
    } else {
      setError(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      currency: selectedCurrency,
      crypto: selectedCrypto,
      amount: inputValue,
    };
  };

  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const [tooltipTarget, setTooltipTarget] = useState<HTMLElement | null>(null);

  const handleMouseEnter = (iconName: string, target: HTMLElement) => {
    setShowTooltip(iconName);
    setTooltipTarget(target);
  };

  const handleMouseLeave = () => {
    setShowTooltip(null);
    setTooltipTarget(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div className="mt-6 mb-1 dark:text-white-100 text-black-200 md:block flex">
          Select Assets
          <span className="text-black-200 dark:text-white-100 md:hidden block text-xs py-1 px-2">
            Auto-Invest with stablecoin {">"}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <div
            className="m-0 w-[calc(50%-20px)] h-12 cursor-pointer"
            onClick={() => handleOpenModal("currency")}
          >
            <div className="dark:bg-background flex items-center justify-between cursor-pointer px-3 h-full border dark:border-gray-300 rounded-md border-gray-800 dark:hover:border-primary hover:border-primary-200">
              <div className="flex items-center">
                <Image
                  src={selectedCurrency?.image || data?.currencies[0].image}
                  alt=""
                  width={20}
                  height={20}
                />
                <div className="dark:text-gray-800 text-black-200 text-sm ml-1">
                  {selectedCurrency?.name || data?.currencies[0].name}
                </div>
              </div>
              <div>
                <Icon
                  name="chevron-left"
                  size={20}
                  className="!text-gray hover:!text-white-100 transform rotate-180 mt-[3px]"
                />
              </div>
            </div>
          </div>
          <div>To</div>
          <div
            className="m-0 w-[calc(50%-20px)] h-12 cursor-pointer"
            onClick={() => handleOpenModal("crypto")}
          >
            <div className="dark:bg-background flex items-center justify-between cursor-pointer px-3 h-full border dark:border-gray-300 rounded-md border-gray-800 dark:hover:border-primary hover:border-primary-200">
              <div className="flex items-center">
                <Image
                  src={selectedCrypto?.image || data?.cryptos[0].image}
                  alt=""
                  width={20}
                  height={20}
                />
                <div className="dark:text-gray-800 text-black-200 text-sm ml-1">
                  {selectedCrypto?.name || data?.cryptos[0].name}
                </div>
              </div>
              <div>
                <Icon
                  name="chevron-left"
                  size={16}
                  className="!text-gray hover:!text-white-100 transform rotate-180 mt-[3px]"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="mt-6 mb-1 flex items-center text-black-200 dark:text-white-100">
            Amount
          </div>
          <div className="">
            <Input
              type="text"
              value={inputValue}
              className="h-[46px] rounded-[4px] text-base placeholder:text-gray-100"
              placeholder={
                selectedCurrency && selectedCurrency.min && selectedCurrency.max
                  ? `${selectedCurrency.min}-${selectedCurrency.max}`
                  : "Enter Amount"
              }
              onChange={(e) =>
                handleInputChange((e.target as HTMLInputElement).value)
              }
              label={selectedCurrency?.name}
              labelClassName="right-4 left-auto pl-3 text-base"
              error={error}
            />
          </div>
        </div>
        <div className="mt-[48px] flex"></div>
        <div className="">
          <SchedulePicker className="" />
        </div>
        <div className="md:sticky md:left-auto md:pb-4 md:shadow-none md:bg-transparent fixed bottom-0 left-0 w-full md:z-0 z-[9] pt-3 md:pt-0 pb-6 mt-0 dark:shadow-[0px_0px_1px_1px_#181A20] shadow-[0px_0px_1px_rgb(255,255,255)] dark:bg-background bg-white-800 box-border">
          <div className="flex md:mt-[66px]">
            <div
              className="text-sm text-gray inline-block md:ml-0 ml-4 mb-3 md:mb-0"
              onMouseEnter={(e) => handleMouseEnter("", e.currentTarget)}
              onMouseLeave={handleMouseLeave}
            >
              You receive
              <span className="text-primary-100">
                {" "}
                0 {selectedCrypto?.name}
              </span>
            </div>
          </div>
          <div className="md:px-0 px-4">
            <Button
              appearance="primary"
              className="md:h-[48px] h-[40px] rounded-[4px] w-full text-base font-medium md:mt-3 md:mb-4"
              type="submit"
            >
              Log In/ Sign Up
            </Button>
          </div>
        </div>
      </div>
      <CurrencyModal
        open={open}
        setOpen={setOpen}
        data={data}
        selectedItem={type === "currency" ? selectedCurrency : selectedCrypto}
        setSelectedItem={
          type === "currency" ? setSelectedCurrency : setSelectedCrypto
        }
        type={type}
      />
      {tooltipTarget && (
        <InfoTooltip
          text="This is the crypto amount you will receive for this purchase. You will receive a different crypto amount each time due to varying exchange rates, but each crypto amount will have the same value of 0 AMD."
          targetRef={{ current: tooltipTarget }}
          visible={showTooltip !== null}
          className="bg-gray-600"
          arrowClass="bg-gray-600"
        />
      )}
    </form>
  );
};

export default SelectAssets;
