import { Icon } from "@/components/ui/icon"
import Image from "next/image"
import Link from "next/link"

export const MarketsTable = () => {

  return (
    <>
      <div className="flex justify-between md:justify-normal items-center py-3 w-full px-4 md:px-0">
        <div className='text-xs flex w-[22%] justify-start text-gray-300 dark:text-gray hover:text-black-100 dark:hover:text-white-100'>
          <div className='flex items-center cursor-pointer'>
            <div className="hidden md:block"> Popular Coins</div>
            <div className="md:hidden">Coins</div>
            <Icon
              name="sort-icon"
              size={16}
              className="text-gray"
            />
          </div>  
        </div>
        <div className='text-xs hidden md:flex w-[22%] justify-end text-right text-gray-300 dark:text-gray hover:text-black-100 dark:hover:text-white-100'>
          <div className='flex items-center cursor-pointer'>
            Amount
            <Icon
              name="sort-icon"
              size={16}
              className="text-gray"
            />
          </div>  
        </div>
        <div className='text-xs flex w-[22%] justify-end text-right text-gray-300 dark:text-gray hover:text-black-100 dark:hover:text-white-100'>
          <div className='flex items-center cursor-pointer'>
            Coin Price
            <Icon
              name="sort-icon"
              size={16}
              className="text-gray"
            />
          </div>  
        </div>
        <div className='text-xs hidden md:flex w-[22%] justify-end text-right text-gray-300 dark:text-gray hover:text-black-100 dark:hover:text-white-100'>
          <div className='flex items-center cursor-pointer'>
            Growth (last 3 years)
            <Icon
              name="sort-icon"
              size={16}
              className="text-gray"
            />
          </div>  
        </div>
        <div className='text-xs hidden md:flex w-[12%] justify-end text-right text-gray-300 dark:text-gray hover:text-black-100 dark:hover:text-white-100'>
          Action
        </div>
      </div>
      <div className="max-h-[548px] overflow-y-auto overflow-x-hidden px-4 md:px-0">
        {
          new Array(15).fill(null).map((_, idx) => (
            <div className="flex justify-between md:justify-normal items-center py-3 w-full" key={idx}>
            <div className='flex w-[22%] justify-start'>
              <div className='gap-2 flex items-center cursor-pointer'>
                <Image src="https://www.cryptocompare.com/media/19633/btc.png" width={24} height={24} alt="Bitcoin" />
                <div>
                  <div>BTC</div>
                  <div className="text-sm text-gray-300 dark:text-gray">Bitcoin</div>
                </div>
              </div>  
            </div>
            <div className='hidden md:flex w-[22%] justify-end text-right'>
              <div>
                <div>0.00</div>
                <div className="text-sm text-gray-300 dark:text-gray">0.00</div>
              </div>  
            </div>
            <div className='flex w-[22%] justify-end text-right'>
              <div>
                <div>$ 56,976</div>
                <div className="text-sm text-gray-300 dark:text-gray">0.00%</div>
              </div>  
            </div>
            <div className='hidden md:flex w-[22%] justify-end text-right'>
              <div className="flex items-center gap-2">
                <Icon name="upgrade" size={24} className="text-gray-300 dark:text-gray" />
                <div className="text-gray-300 dark:text-gray">0.00%</div>
              </div>  
            </div>

            <Link href="/" className='text-sm hidden md:flex w-[12%] justify-end text-right text-primary-100 underline'>
              Cash In
            </Link>
            </div>
          ))
        }
      </div>
    </>
  )
}