import PaymentSupported from "@/views/crypto/payment/payment-supported";
import data from "@/data/crypto/crypto-main/crypto-main.json";
import paymentData from "@/data/payment/payment.json";
import { MiniList } from "@/views/markets/overview/mini-list";
import {
  MiniListItem,
  MiniListProps,
} from "@/app/(root)/markets/[overview]/layout";
import CryptoExchange from "./crypto-exchange";

export const CryptoMainView = (params:any) => {
  return (
    <>
      <div className="flex lg:flex-row flex-col-reverse md:mt-12 mt-4 justify-between">
        <div className="md:pt-8 pt-3 lg:mr-[52px] px-4 md:px-0">
          <h2 className="md:text-[56px] md:font-semibold md:leading-[72px] dark:text-white-100 hidden lg:block">
            {data.title}
          </h2>
          <div className="hidden lg:block">
            <PaymentSupported
              description={data.description}
              payments={data.supportedPayments}
            />
          </div>
          <div className="lg:mt-10 mt-0 lg flex justify-center lg:justify-start">
            {data.markets.map((item: MiniListProps, index: number) => (
              <MiniList
                title={item.title}
                link={item.link}
                list={item.list}
                theme="primary"
              />
            ))}
          </div>
        </div>
        <div className="">
          <CryptoExchange
            theme="primary"
            coins={data.coins} 
            paymentMethods={paymentData.paymentMethods}
          />
        </div>
      </div>
    </>
  );
};
