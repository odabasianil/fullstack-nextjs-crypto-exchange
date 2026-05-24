import { Input } from "@/components/ui/input";
import { twMerge } from "tailwind-merge";
import { FeaturedSlider } from "./featured-slider";
import { TradingBotSlider } from "./trading-bot-slider";
import { CopyTradingSlider } from "./copy-trading-slider";
import { EarnSlider } from "./earn-slider";
import { useEffect, useState } from "react";
import resultData from "@/data/search/result.json";
import Image from "next/image";
import { Icon } from "@/components/ui/icon";

interface SearchContentProps {
  isOpen: boolean;
  handleClick: () => void;
}

export const SearchContent = (props: SearchContentProps) => {
  const { isOpen, handleClick } = props;
  const [value, setValue] = useState("");
  const [result, setResult] = useState<any>([]);
  const [historyValues, setHistoryValues] = useState<any>([]);

  const handleSearch = () => {
    const filteredResult = resultData.filter((item) =>
      item.toLocaleUpperCase().includes(value.toLocaleUpperCase())
    );
    setResult(filteredResult);
  };

  const handleChange = (e: any) => {
    setValue(e.target.value);

    handleSearch();
  };

  const handleClickResult = (name: string) => {
    setValue(name);
    setResult([]);
    const history = localStorage.getItem("search")
      ? JSON.parse(localStorage.getItem("search") as any)
      : [];
    if (!history.includes(name)) {
      history.push(name);
      const data = JSON.stringify(history);
      localStorage.setItem("search", data);
    }
  };

  const clearHistory = () => {
    localStorage.removeItem("search");
    setHistoryValues([]);
  };

  useEffect(() => {
    if (localStorage.getItem("search")) {
      const history = JSON.parse(localStorage.getItem("search") as any);
      setHistoryValues(history);
    }
  }, []);

  return (
    <>
      <div
        onClick={handleClick}
        className={twMerge(
          isOpen ? "md:fixed" : "hidden",
          "z-10 top-0 left-0 w-full h-full"
        )}
      ></div>
      <div
        className={twMerge(
          "z-20 shadow absolute top-0 md:top-10 -right-32 md:right-0 w-full md:w-max bg-white dark:bg-black-100",
          "opacity-0 invisible transition-all duration-500 md:duration-0",
          isOpen && "opacity-100 visible right-0"
        )}
      >
        <div className="py-2 px-4 flex items-center justify-between w-full md:w-[368px]">
          <Input
            type="text"
            placeholder="WIF"
            value={value}
            onChange={handleChange}
            label={
              <Icon
                name="search"
                size={16}
                color="transparent"
                className="text-gray"
              />
            }
            wrapperClassName="w-full"
            className="pl-10 min-w-[284px] h-10 hover:border-primary focus:border-primary w-full placeholder:font-semibold placeholder:text-gray"
            isClearable
            clearIconSize={16}
          />
          <div
            className="cursor-pointer text-primary-200 dark:text-primary-100 ml-2"
            onClick={handleClick}
          >
            Cancel
          </div>
        </div>
        {value.length < 1 && (
          <div className="flex flex-col gap-6 p-4 h-full md:max-h-[524px] overflow-y-auto ">
            {historyValues.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm">Search History</p>
                  <div className="flex items-center gap-2">
                    <div className="cursor-pointer" onClick={clearHistory}>
                      <Icon name="trash" size={20} color="#929AA5" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full ">
                  {historyValues?.map((item: string, index: number) => (
                    <div
                      key={index}
                      className="bg-white-300 dark:bg-secondary cursor-pointer truncate max-w-[calc(50%-10px)] h-6 mr-[10px] px-[10px] text-sm rounded-[4px]"
                    >
                      <span className="text-base font-medium text-black-200 dark:text-white-100">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <FeaturedSlider />
            <TradingBotSlider />
            <CopyTradingSlider />
            <EarnSlider />
          </div>
        )}
        <div className="px-[15px] ">
          {value.length > 0 &&
            (result.length > 0 ? (
              <div className="flex flex-col h-[600px] max-h-[600px] overflow-y-auto">
                {result.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="cursor-pointer flex gap-4 items-center m-2 py-[9px]"
                    onClick={() => handleClickResult(item)}
                  >
                    <Icon
                      name="search"
                      size={16}
                      color="transparent"
                      className="dark:hidden text-black-200 "
                    />
                    <Icon
                      name="search"
                      size={16}
                      className="hidden dark:block"
                    />
                    <span className="text-base font-medium text-black-200 dark:text-white-100">{item}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-20 flex flex-col gap-6 items-center">
                <Image
                  src="/images/no-result.svg"
                  alt="No Result"
                  width={96}
                  height={96}
                />
                <span className="text-black-200 dark:text-white-100">No results for "{value}"</span>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
