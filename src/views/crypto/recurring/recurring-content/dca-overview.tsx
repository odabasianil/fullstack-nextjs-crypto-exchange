import DcaSummary from "./dca-summary";

interface OverviewData {
  title: string;
  intro: {
    question: string;
    answer: string;
  };
  calculation: {
    question: string;
    answer: string;
  };
}
interface CryptoData {
  timePeriod: string;
  crypto: {
    name: string;
    price: string;
    amount: string;
    totalCost: string;
  };
}

interface DcaOverviewProps {
  overview: OverviewData;
  summaryData: CryptoData[];
}

const DcaOverview = ({ overview, summaryData }: DcaOverviewProps) => {
  return (
    <div className="lg:mt-0 flex md:flex-row flex-col-reverse justify-between w-full">
      <div className="">
        <h2 className="md:text-[28px] md:leading-[36px] md:block hidden dark:text-white-100 font-semibold">
          {overview.title}
        </h2>
        <div className="lg:mt-12 md:mt-7 mt-[25px] md:text-xl text-lg md:font-normal font-semibold dark:text-white-100">
          {overview.intro.question}
        </div>
        <div className="md:text-base text-sm md:dark:text-gray-100 dark:text-gray-900 text-black-300 mt-2">
          {overview.intro.answer}
        </div>
        <div className="lg:mt-12 md:mt-7 mt-[25px] md:text-xl text-lg md:font-normal font-semibold dark:text-white-100">
          {overview.calculation.question}
        </div>
        <div className="md:text-base text-sm md:dark:text-gray-100 dark:text-gray-900 text-black-300 mt-2">
          {overview.calculation.answer}
        </div>
      </div>
      <DcaSummary data={summaryData} />
    </div>
  );
};

export default DcaOverview;
