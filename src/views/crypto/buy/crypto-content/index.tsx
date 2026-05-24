import { CryptoPurchaseView } from "./crypto-purchase";
import { CurrencyExchangeView } from "./currency-exchange";
import { TetherMarketInfo } from "./tether-market-info";
import data from "@/data/crypto/crypto-content/cards.json";
import data2 from "@/data/crypto/crypto-content/markets.json";
import data3 from "@/data/crypto/crypto-content/exchange.json";
import data4 from "@/data/crypto/crypto-content/conversions.json";

import { CurrencyConversions } from "./currency-conversions";

export const CryptoContentView: React.FC = (params):any => {
  return (
    <>
      <CryptoPurchaseView title={data.title} data={data.steps} />
      <TetherMarketInfo data={data2} />
      <CurrencyExchangeView items={data3} />
      <CurrencyConversions items={data4.items} title={data4.title} description={data4.description}/>
    </>
  );
};
