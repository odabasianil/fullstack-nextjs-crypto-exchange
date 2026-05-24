import Image from "next/image";
import { TradingDataChart } from "./trading-data-chart";

interface TradingDataProps {
  coin1: string;
  coin2: string;
}

export const TradingData = (props: TradingDataProps) => {
  const { coin1, coin2 } = props;

  return (
    <div className="p-4 h-[calc(100%-42px)] overflow-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-y-4 gap-x-6 md:min-w-[1460px]">
        <TradingDataChart
          coin1={coin1}
          title="Money Flow Analysis"
          infoText="The order of the buyer as the taker is the buy order, and the order of the seller as the maker is the sell order.order. The threshold for large, medium and small orders is determined by the average transaction volume of the trading pair over a period of time."
          tabs={['15m', '30m', '1h', '2h', '4h', '1d']}
          showLegend
        />
        <TradingDataChart
          title={`24hr Large Inflow(${coin1})`}
          image="margin-chart"
          description="5 days large inflow: -876.1639"
        />
        <TradingDataChart
          title={`24hr Large Inflow(${coin1})`}
          image="margin-chart"
        />
        <TradingDataChart
          title="Margin Debt Growth"
          image="margin-chart"
          infoText="The growth of total debt of this particular coin in cross and isolated margin accounts"
          tabs={['24h', '30d']}
          options={[coin1, coin2]}
        />
        <TradingDataChart
          title="Margin Long-short Positions Ratio"
          image="margin-chart"
          infoText="The growth of total debt of this particular coin in cross and isolated margin accounts"
          tabs={['24h', '30d']}
          options={[coin1, coin2]}
        />
        <TradingDataChart
          image="margin-chart"
          title="Isolated Margin Borrow Amount Ratio"
          infoText="The growth of total debt of this particular coin in cross and isolated margin accounts"
          tabs={['24h', '30d']}
          options={[coin1, coin2]}
        />

      </div>
    </div>
  )
}