import Link from "next/link";
import SelectAssets from "./select-assets";
import { Icon } from "@/components/ui/icon";
import TopCryptos from "./top-cryptos";

const RecurringPlan = ({ data }: { data: any }) => {
  return (
    <>
      <div className="relative md:w-[486px] md:min-w-[470px] px-4">
        <div className="flex md:flex-row flex-col md:justify-between  md:items-center items-start">
          <div className="md:text-2xl text-xl md:pt-4 pt-2 dark:text-white-100 text-black-200 mb-6 font-medium">
            Create Recurring Plan
          </div>
          <Link
            href={""}
            className="text-xs p-2 rounded-[4px] h-8 md:flex items-center hidden"
          >
            <Icon name="autoinvest" size={16} className="mr-1" />
            <span className="dark:text-white-100 text-black-200">
              Auto-Invest with stablecoin {">"}
            </span>
          </Link>
        </div>
        <SelectAssets data={data} />
      </div>

      <TopCryptos data={data.top_cryptos} />
    </>
  );
};

export default RecurringPlan;
