import Image from "next/image"

export const AssetsTable = () => {

  return (
    <>
      <table className="hidden md:table w-[730px] table-auto min-w-full border-collapse border-spacing-0">
        <colgroup>
          <col className="min-w-[100px]" />
          <col className="min-w-[120px]" />
          <col className="min-w-[120px]" />
          <col className="min-w-[120px]" />
          <col className="min-w-[120px]" />
          <col className="min-w-[150px]" />
        </colgroup>
        <thead>
          <tr className="border-none bg-transparent">
            <th className="py-3 whitespace-nowrap font-normal text-left text-xs text-gray-300 dark:text-gray">Asset</th>
            <th className="py-3 whitespace-nowrap font-normal text-right text-xs text-gray-300 dark:text-gray">Wallet Balance</th>
            <th className="py-3 whitespace-nowrap font-normal text-right text-xs text-gray-300 dark:text-gray">Unrealized PNL</th>
            <th className="py-3 whitespace-nowrap font-normal text-right text-xs text-gray-300 dark:text-gray">Margin Balance</th>
            <th className="py-3 whitespace-nowrap font-normal text-right text-xs text-gray-300 dark:text-gray">Available for Transfer</th>
            <th className="py-3 whitespace-nowrap font-normal text-right text-xs text-gray-300 dark:text-gray">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            new Array(6).fill(0).map((_, index) => (
              <tr>
                <td className="h-16 whitespace-nowrap p-0 text-sm leading-[22px] flex items-center gap-2">
                  <Image src="https://www.cryptocompare.com/media/40485170/bnb.png" alt="coin" width={32} height={32} />
                  <div className="font-semibold text-base">BNB</div>
                </td>
                <td className="h-16 whitespace-nowrap p-0 text-sm leading-[22px] text-right">******</td>
                <td className="h-16 whitespace-nowrap p-0 text-sm leading-[22px] text-right">******</td>
                <td className="h-16 whitespace-nowrap p-0 text-sm leading-[22px] text-right">******</td>
                <td className="h-16 whitespace-nowrap p-0 text-sm leading-[22px] text-right">******</td>
                <td className="h-16 whitespace-nowrap p-0 text-sm leading-[22px] text-right text-primary-100 font-semibold">Transfer</td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <div className="md:hidden max-h-[540px] overflow-y-auto w-full">
        {
          new Array(6).fill(0).map((_, index) => (
            <div className="border-b border-white-100 dark:border-secondary py-3">
              <div className="flex items-center justify-between py-1">
                <div className="flex items-center gap-1">
                  <Image src="https://www.cryptocompare.com/media/40485170/bnb.png" alt="coin" width={28} height={28} />
                  <div className="font-semibold text-base">BNB</div>
                </div>
              </div>
              <div className="flex items-center justify-between py-1">
                <div className="text-sm text-gray-300 dark:text-gray">Wallet Balance</div>
                <div className="text-sm text-right">******</div>
              </div>
              <div className="flex items-center justify-between py-1">
                <div className="text-sm text-gray-300 dark:text-gray">Unrealized PNL</div>
                <div className="text-sm text-right">******</div>
              </div>
              <div className="flex items-center justify-between py-1">
                <div className="text-sm text-gray-300 dark:text-gray">Margin Balance</div>
                <div className="text-sm text-right">******</div>
              </div>
              <div className="flex items-center justify-between py-1">
                <div className="text-sm text-gray-300 dark:text-gray">Available for Transfer</div>
                <div className="text-sm text-right">******</div>
              </div>
            </div>
          ))
        }
      </div>

    </>
  )
}