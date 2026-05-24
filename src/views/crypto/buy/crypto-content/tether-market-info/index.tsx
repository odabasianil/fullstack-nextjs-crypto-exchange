import Image from "next/image";
import { MarketsChart } from "./markets-chart";
import { MarketsSummary } from "./markets-summary";

interface TetherMarketInfoProps {
  data: any;
}

export const TetherMarketInfo: React.FC<TetherMarketInfoProps> = ({ data }) => {
  return (
    <>
      <div className="mt-[32px] md:mt-[96px] lg:mt-[128px] lg:px-0 px-4">
        <h2 className="md:text-[40px] md:leading-[48px] text-black-200 font-semibold dark:text-white-100 text-[28px] leading-[36px]">
          Tether USDt Markets
        </h2>
        <div className="flex lg:flex-row flex-col md:gap-6 mt-6">
          <MarketsChart />
          <MarketsSummary
            marketData={data.marketData}
            conversionData={data.conversionData}
            infoHtml={data.infoHtml}
            conversionInfoHtml={data.conversionInfoHtml}
          />
        </div>
      </div>
    </>
  );
};
