import Image from "next/image";

interface CryptoData {
  timePeriod: string;
  crypto: {
    name: string;
    price: string;
    amount: string;
    totalCost: string;
  };
}

interface DcaSummaryProps {
  data: CryptoData[];
}

const DcaSummary = ({ data }: DcaSummaryProps) => {
  const totalCost = data.reduce(
    (acc, item) =>
      acc + parseFloat(item.crypto.totalCost.replace(/[^0-9.-]+/g, "")),
    0
  );
  const totalBNBAmount = data.reduce(
    (acc, item) => acc + parseFloat(item.crypto.amount),
    0
  );
  const averageCost = totalCost / totalBNBAmount;

  return (
    <>
      <div className="box-border">
        <h2 className="text-2xl block md:hidden dark:text-white-100 font-semibold">
          How does dollar-cost averaging (DCA) work?
        </h2>
        <div className="lg:w-[382px] lg:ml-[78px] md:w-[260px] md:ml-[46px] md:mb-[68px] flex items-center justify-between md:mt-0 mt-6">
          {data.map((item, index) => (
            <>
              <div className="flex items-center" key={index}>
                {/* Item alanı */}
                <div className="box-border">
                  <div className="lg:text-base lg:ml-3 md:text-xs text-sm md:ml-[7px] ml-[11px] md:mb-0 mb-[7px] dark:text-white-500 text-gray-700">
                    {item.timePeriod}
                  </div>
                  <div className="lg:w-[164px] lg:h-[136px] lg:px-[13px] lg:py-4 lg:mt-2 lg:dark:bg-[url('/images/bg-1024.svg')] lg:bg-[url('/images/bg-1024-dark.svg')] md:dark:bg-[url('/images/bg-768.svg')] md:bg-[url('/images/bg-768-dark.svg')] md:w-[122px] md:h-[94px] md:px-2 md:py-2.5 md:mt-[9px] dark:text-white-100 text-gray-700 dark:bg-[url('/images/bg-all.svg')] bg-[url('/images/bg-all-dark.svg')] w-[147px] h-[124px] px-2.5 py-[14px]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Image
                          src="/images/bnb.svg"
                          alt="bnb"
                          width={16}
                          height={16}
                          className="w-[10px] h-[10px] md:w-[16px] md:h-[16px]"
                        />
                        <div className="lg:text-base md:text-xs text-sm dark:text-gray-100 text-gray-700 ml-1">
                          {item.crypto.name}
                        </div>
                      </div>
                      <div className="lg:text-base md:text-xs text-sm dark:text-gray-100 text-gray-700">
                        {item.crypto.price}
                      </div>
                    </div>
                    <div className="lg:mt-2 md:mt-[9px] mt-[7px] flex items-center justify-between">
                      <div className="lg:text-base md:text-xs text-sm dark:text-gray-100 text-gray-700 ml-1">
                        Amount
                      </div>
                      <div className="lg:text-base md:text-xs text-sm dark:text-gray-100 text-gray-700 ml-1">
                        {item.crypto.amount}
                      </div>
                    </div>
                    <div className="box-border border-t border-dashed border-t-[#E6E8EA] mt-[14px]"></div>
                    <div className="lg:mt-2 md:mt-[9px] mt-[7px] flex items-center justify-between">
                      <div className="lg:text-base md:text-xs text-sm dark:text-gray-100 text-gray-700 ml-1">
                        Total Cost
                      </div>
                      <div className="lg:text-base md:text-xs text-sm dark:text-gray-100 text-gray-700 ml-1">
                        {item.crypto.totalCost}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Son item değilse "+" işaretini ekle */}
              {index < data.length - 1 && (
                <div className="dark:text-gray-100 text-gray-700 text-base font-semibold">
                  +
                </div>
              )}
            </>
          ))}
        </div>

        {/* Dinamik Hesaplanan Alanlar */}
        <div className="lg:w-[358px] lg:ml-[90px] md:w-[260px] md:ml-[46px]">
          <div className="lg:mt-[31px] md:mt-[12px] mt-[28px] flex items-center justify-between">
            <div className="lg:text-base md:text-xs text-sm dark:text-gray-100 text-gray-700">
              Total Cost
            </div>
            <div className="lg:text-base md:text-xs text-sm dark:text-gray-100 text-gray-700 font-semibold">
              ${totalCost.toFixed(2)}
            </div>
          </div>
          <div className="lg:mt-[12px] mt-[12px] md:mt-[8px] flex items-center justify-between">
            <div className="lg:text-base md:text-xs text-sm dark:text-gray-100 text-gray-700">
              Total BNB Amount
            </div>
            <div className="lg:text-base md:text-xs text-sm dark:text-gray-100 text-gray-700 font-semibold">
              {totalBNBAmount.toFixed(2)}
            </div>
          </div>
          <div className="lg:mt-[12px] mt-[12px]  md:mt-[8px] flex items-center justify-between">
            <div className="lg:text-base md:text-xs text-sm dark:text-gray-100 text-gray-700">
              Average Cost
            </div>
            <div className="lg:text-base md:text-xs text-sm dark:text-gray-100 text-gray-700 font-semibold">
              ${totalCost.toFixed(2)} ÷ {totalBNBAmount.toFixed(2)} = $
              {averageCost.toFixed(2)}/token
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DcaSummary;
