import { twMerge } from "tailwind-merge";
import Image from "next/image";

interface BuySellRatioProps {
  promoCode?: string;
  orderDate?: string;
  tax?: string;
  promoDiscount?: string;
  totalPrice?: string;
}

export const CoinSummaryView = (props: BuySellRatioProps) => {
  const { orderDate, promoCode, tax, promoDiscount, totalPrice } = props;

  return (
    <div className="bg-[#ECEDEF] dark:bg-black-100 rounded-md p-6 lg:p-8">
      <div className="text-base lg:text-lg">Order details</div>
      <div className="flex items-center mt-6 justify-between">
        <div className="flex items-center gap-2 w-[120px] lg:w-[229px] lg:min-w-[229px]">
          <Image
            src="https://www.cryptocompare.com/media/19633/btc.png"
            width={70}
            height={70}
            alt="Bitcoin"
            className="w-10 h-10 lg:w-[70px] lg:h-[70px]"
          />
          <div className="ml-2.5">
            <div className="text-base lg:text-lg">Bitcoin</div>
            <div className="mt-1 text-lg lg:text-2xl">$100,00</div>
          </div>
        </div>
        <div className="w-6 lg:w-[229px] mx-5 border border-dashed"></div>
        <div className="text-base lg:text-lg">$100,00</div>
      </div>
      <div className="mt-6 lg:mt-12 flex items-center justify-between">
        <div className="w-full">
          <div className="font-medium text-base lg:text-lg">Order Completed</div>
          <div className="mt-2.5 text-base lg:text-lg flex justify-between">
            <div className="">
              <div className="text-base mb-2">Entry Price</div>
              <div className="text-sm">$119,750.18</div>
            </div>
            <div className="">
              <div className="text-base mb-2">Order</div>
              <div className="text-sm mb-1">$100,00</div>
            </div>
            <div className="">
              <div className="text-base mb-2">Amount</div>
              <div className="text-sm mb-1">0.0000123</div>
            </div>
            <div className="">
              <div className="text-base mb-2">Fee</div>
              <div className="text-sm mb-1">0.012</div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 lg:mt-12 flex items-center justify-between">
        <div className="w-[120px] lg:w-[229px]">
          <div className="font-medium text-base lg:text-lg">Promo discount</div>
          <div className="mt-2.5 text-base lg:text-lg">
            {promoCode || "No Promo Code"}
          </div>
        </div>
        <div className="mx-5 w-6 lg:w-[229px] border border-dashed"></div>
        <div className="text-base lg:text-lg">{promoDiscount}</div>
      </div>

      <div className="mt-14">
        <div className="text-base lg:text-lg font-medium">Order date</div>
        <div className="mt-2.5 flex items-center gap-6 text-base lg:text-lg">
          <div>{orderDate}</div>
          <div>00:20 am</div>
        </div>
        <div className="w-full h-[1px] bg-[#C9C9C9] my-[30px]"></div>
        <div className="flex items-center justify-between gap-2.5">
          <div className="text-base lg:text-lg font-medium w-[143px]">Tax</div>
          <div className="w-12 lg:w-[229px] border border-dashed"></div>
          <div className="text-base lg:text-lg text-end w-[142px]">{tax}</div>
        </div>
        <div className="flex items-center justify-between gap-2.5 mt-3">
          <div className="text-base lg:text-lg font-medium w-[143px]">
            Promo code
          </div>
          <div className="w-12 lg:w-[229px] border border-dashed"></div>
          <div className="text-base lg:text-lg text-end w-[142px]">
            {promoCode || "No Promo Code"}
          </div>
        </div>
        <div className="flex items-center justify-between gap-2.5 mt-3">
          <div className="text-base lg:text-lg font-medium w-[143px]">
            Total
          </div>
          <div className="w-12 lg:w-[229px] border border-dashed"></div>
          <div className="text-base lg:text-lg text-end w-[142px]">
            {totalPrice || "$0,00"}
          </div>
        </div>
      </div>
    </div>
  );
};
