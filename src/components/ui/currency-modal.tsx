import { Icon } from "./icon";
import { Input } from "./input";
import { Modal } from "./modal";
import { useState } from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

interface CurrencyModalProps {
  open: boolean;
  data: any;
  selectedItem: any;
  setSelectedItem: (item: any) => void;
  setOpen: (open: boolean) => void;
  type: "currency" | "crypto";
  className?: string;
  inputClassName?: string;
  clearIconClass?:string;
  closeIconClass?:string;
}

export const CurrencyModal = ({
  open,
  data,
  selectedItem,
  setSelectedItem,
  setOpen,
  type,
  className,
  inputClassName,
  clearIconClass,
  closeIconClass
}: CurrencyModalProps) => {
  const [value, setValue] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("hot");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const items = type === "currency" ? data.currencies : data.cryptos;

  const handleFilterClick = (filter: string) => {
    setSelectedFilter(filter);
  };

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      className={twMerge(
        "md:py-0 md:px-0 px-0 py-0 md:w-[360px] rounded-md",
        className
      )}
      isMobileOpen={true}
      title={type === "currency" ? "Select Currency" : "Select Crypto"}
      showCloseButton={true}
      titleWrapperClass="py-4 px-6"
      closeIconClass={closeIconClass}
    >
      <div className="px-6">
        <Input
          type="text"
          placeholder="Search"
          value={value}
          onChange={handleChange}
          label={<Icon name="search" size={16} color="transparent" />}
          wrapperClassName="w-full"
          className={twMerge(
            "pl-10 w-full md:w-full h-10 rounded-[4px] hover:border-primary focus:border-primary placeholder:text-gray-100",
            inputClassName
          )}
          isClearable
          clearIconSize={20}
          clearIconClass={clearIconClass}
        />
      </div>
      <div className="h-[460px] overflow-auto p-6">
        {type === "crypto" && (
          <div className="flex justify-between h-[40px] mt-3 items-center px-6">
            <div className="text-gray text-xs">Sort by</div>
            <div className="flex">
              {[
                { label: "Hot", arrow: null },
                { label: "24h vol", arrow: null },
                { label: "24h change", arrow: "top" },
                { label: "24h change", arrow: "bottom" },
              ].map(({ label, arrow }, index) => (
                <div
                  key={index}
                  className={`text-gray text-xs px-2 py-1.5 rounded-[2px] text-center cursor-pointer ${
                    selectedFilter === label + (arrow ? arrow : "")
                      ? "bg-gray-1000 dark:bg-black-900"
                      : ""
                  }`}
                  onClick={() =>
                    handleFilterClick(label + (arrow ? arrow : ""))
                  }
                >
                  {label === "24h change" ? (
                    <>
                      <span>24h change</span>
                      <Icon
                        name="arrow-top"
                        size={10}
                        className={`inline-block ${
                          arrow === "bottom" ? "rotate-180" : ""
                        }`}
                      />
                    </>
                  ) : (
                    label
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        {items
          .filter((item: any) =>
            item.name.toLowerCase().includes(value.toLowerCase())
          )
          .map((item: any) => (
            <div
              key={item.id}
              className="text-sm text-black-200 cursor-pointer w-full h-[64px] flex items-center hover:bg-white-300 dark:hover:bg-black-900"
              onClick={() => {
                setSelectedItem(item);
                setOpen(false);
              }}
            >
              <div className="flex gap-4 items-center font-semibold">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={32}
                  height={32}
                  className="rounded-sm"
                />
                <div className="flex flex-col items-start">
                  <div className="text-black-100 dark:text-white-100">
                    {item.name}
                  </div>
                  <div className="text-xs text-black-300 dark:text-white-700 font-normal">
                    {item.country}
                  </div>
                </div>
              </div>
            </div>
          ))}
        {!items.some((item: any) =>
          item.name.toLowerCase().includes(value.toLowerCase())
        ) && (
          <div className="px-6 py-2 text-sm text-gray-100">
            <div className="pt-10 flex flex-col gap-6 items-center">
              <Image
                src="/images/no-result.svg"
                alt="No Result"
                width={96}
                height={96}
              />
              <span>No records found</span>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
