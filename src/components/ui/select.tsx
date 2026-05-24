"use client";

import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Icon } from "./icon";
import { Input } from "./input";
import Image from "next/image";

const Select = ({
  options,
  selectedOptionLabel,
  className,
  wrapperClassName,
  labelClass,
  valueClass,
  value,
  optionsClassName,
  setValue,
  selectedClass,
  disabled = false,
  defaultValue,
  isSearchable = false,
  listClass,
  closeIcon,
}: any) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [resultData, setResult] = useState(options);

  const handleSearch = () => {
    const filteredResult = options?.filter((item: any) =>
      item?.label?.toLocaleUpperCase()?.includes(value?.label?.toLocaleUpperCase())
    );
    value ? setResult(filteredResult) : setResult(options);
  };

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  const handleSelect = (option: any) => {
    setSelectedOption(option);
    setValue && setValue(option);
    setIsOpen(false);
  };

  useEffect(() => {
    isSearchable && handleSearch();
  }, [value]);

  useEffect(() => {
    if (defaultValue) {
      const selected = options.find((item: any) => item.value === defaultValue);
      setSelectedOption(selected);
      setValue && setValue(selected);
    }
  }, [defaultValue])

  useEffect(() => {
    if (options) {
      setResult(options)
    }
  }, [options])

  return (
    <div
      className={
        twMerge(
          "relative w-[136px] h-8",
          disabled && "cursor-not-allowed",
          className
        )}
    >
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={twMerge(
          'flex items-center justify-between w-full h-full border border-white-100 dark:border-secondary rounded-[4px] cursor-pointer',
          disabled && "pointer-events-none",
          wrapperClassName
        )}

      >
        <div
          className={twMerge(
            "text-sm px-3 text-gray flex items-center gap-2",
            valueClass
          )}
        >
          <div className={labelClass}>{selectedOptionLabel}</div>
          {selectedOption?.flag && (
            <Image src={selectedOption?.flag} alt="" width={16} height={16} />
          )}
          <div className={selectedClass}>{selectedOption?.label}</div>
        </div>
        <Icon
          name="chevron-down"
          size={16}
          className={twMerge(
            "text-gray ml-1 mr-2 min-w-4",
            isOpen && "rotate-180"
          )}
        />
      </div>
      {isOpen && (
        <ul
          className={twMerge(
            'absolute top-full left-0 right-0 shadow-md z-10 p-1 pl-0 border-b border-t border-white-100 dark:border-secondary bg-white dark:bg-[rgb(30,35,41)] rounded-[4px] max-h-[228px] overflow-y-auto',
            optionsClassName
          )}
        >
          {isSearchable && (
            <Input
              type="text"
              value={value?.label}
              onChange={handleChange}
              label={<Icon name="search" size={20} color="transparent" />}
              wrapperClassName="w-full px-3 py-2"
              labelClassName="left-2"
              className="pl-10 h-10 !border-transparent hover:!border-primary-100 focus:!border-primary-100 rounded-md w-full bg-[rgb(242,243,245)] dark:bg-secondary text-sm"
              isClearable={true}
              clearIconSize={16}
            />
          )}
          {resultData.map((option: any, index: number) => (
            <li
              key={index}
              onClick={() => handleSelect(option)}
              className={twMerge(
                "py-2 px-4 cursor-pointer text-sm",
                listClass,
                selectedOption?.label === option?.label && "text-primary"
              )}
            >
              {option.flag && (
                <Image
                  src={option.flag}
                  alt=""
                  width={14}
                  height={14}
                  className="mr-1"
                />
              )}
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
