import data from "@/data/recurring/recurring-content/data.json";
import data2 from "@/data/recurring/recurring-content/dcabenefits.json";
import data3 from "@/data/recurring/recurring-content/gettingstarted.json";
import data4 from "@/data/recurring/recurring-content/top-crypto-currency.json";
import data5 from "@/data/recurring/recurring-content/guides-resources.json";
import data6 from "@/data/recurring/recurring-content/faq.json";
import DcaOverview from "./dca-overview";
import DcaBenefits from "./dca-benefits";
import GettingStarted from "./getting-started";
import TopCryptoCurrency from "./top-crypto-currency";
import GuidesResources from "./guides-resources";
import Faq from "./faq";
const { dcaSummary, overview } = data;

const RecurringContentView = () => {
  return (
    <div className="lg:px-[120px] md:px-6 px-4 md:mt-[80px] mt-[40px]">
      <div className="flex flex-col">
        <DcaOverview overview={overview} summaryData={dcaSummary} />
        <DcaBenefits data={data2} />
        <GettingStarted data={data3}/>
        <TopCryptoCurrency data={data4}/>
        <GuidesResources data={data5}/>
        <Faq data={data6}/>
      </div>
    </div>
  );
};

export default RecurringContentView;
