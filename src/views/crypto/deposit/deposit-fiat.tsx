"use client";
import { Icon } from "@/components/ui/icon";
import Image from "next/image";
import { useState } from "react";
import { CurrencyModal } from "@/components/ui/currency-modal";
import { Button } from "@/components/ui/button";
import { DepositWith } from "../payment/deposit-with";

const DepositFiat = ({ data }: { data: any }) => {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<{
    id: string;
    name: string;
    image: string;
    min: string;
    max: string;
    country:string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      currency: selectedCurrency,
      amount: inputValue,
    };
  };

  return (
    <form className="md:w-auto w-full" onSubmit={handleSubmit}>
      <div className="lg:w-[588px] md:w-[384px] w-full md:mb-80 mb-0 ">
        <div className="text-sm mb-1 dark:text-white-100 text-black-1000">
          Currency
        </div>
        <div className="flex justify-between items-center">
          <div className="lg:h-[56px] h-[48px] cursor-pointer w-full" onClick={handleOpenModal}>
            <div className="md:dark:bg-background dark:bg-black-600 md:bg-transparent bg-white-300 flex items-center justify-between cursor-pointer px-3 h-full md:border md:dark:border-gray-300 rounded-md  md:border-gray-800 border-white-100 md:dark:hover:border-primary md:hover:border-primary-200">
              <div className="flex items-center">
                <Image
                  src={selectedCurrency?.image || data?.currencies[0].image}
                  alt=""
                  width={24}
                  height={24}
                />
                <div className="dark:text-gray-800 text-black-200 md:text-base text-base ml-1 font-semibold">
                  <span>{selectedCurrency?.name || data?.currencies[0].name}</span>
                  <span className="dark:text-gray md:text-xs text-xs ml-2 font-normal">
                    {selectedCurrency?.country || data.currencies[0].country}
                  </span>
                </div>
              </div>
              <div>
                <Icon
                  name="chevron-down"
                  size={20}
                  className="!text-gray hover:!text-white-100 mt-[3px]"
                />
              </div>
            </div>
          </div>
        </div>
        <DepositWith/>
        <div className="py-4">
          <div className="">
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
        selectedItem={selectedCurrency}
        setSelectedItem={setSelectedCurrency}
        type="currency"
        className="md:w-[384px]"
        inputClassName="h-[48px] bg-gray-1000 dark:bg-black-900 border-none"
        clearIconClass="text-white-700 dark:text-gray-600"
        closeIconClass="text-white-700 dark:text-gray-600"
      />
    </form>
  );
};

export default DepositFiat;
