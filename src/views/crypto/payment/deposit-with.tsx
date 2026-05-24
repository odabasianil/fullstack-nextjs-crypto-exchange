import Image from "next/image";

interface DepositWithProps {
  buyRatio: number;
  sellRatio: number;
}

export const DepositWith = () => {
  return (
    <div className="mt-8 mb-8 cursor-pointer">
      <div className="dark:text-white-100 text-black-1000 text-sm mb-1">
        Deposit With
      </div>
      <div className="pt-5 pb-5 pr-4 pl-4 border-[1.5px] dark:border-white-100 border-background-500 rounded-xl mb-2">
        <div className="flex gap-2 items-start">
          <Image src="/images/pay-1.png" alt="" width={24} height={24} />
          <div className="flex flex-col">
            <div className="dark:text-white-100 text-black-1000 text-base font-semibold">
              P2P Express
            </div>
            <div className="text-gray mt-1 text-sm">0 Fee</div>
            <div className="w-full inline-block mt-1">
              <div className="dark:text-white-100 text-black-1000 dark:bg-background-300 bg-white-300 px-[5px]">
                Buy on FAZ 3 P2P
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
