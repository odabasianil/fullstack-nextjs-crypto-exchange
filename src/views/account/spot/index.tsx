import { Icon } from "@/components/ui/icon"
import Image from "next/image"
import Link from "next/link"

export const AccountSpot = () => {


  return (
    <>
      <div className="md:border border-white-100 dark:border-secondary rounded-2xl px-4 md:p-6 mb-16 md:mb-6"> 
        <div className="pb-4 flex items-center justify-between">
          <div className="text-xl md:text-2xl font-semibold">Spot</div>
          <Link target="_blank" href="/en/square/profile/square-creator-d4fc42eb075a" className="flex items-center gap-0.5 h-8">
            <div className="text-sm font-semibold">More</div>
            <Icon name="chevron-left" size={16} className="text-gray-300 dark:text-gray rotate-180" />
          </Link>
        </div>
        
        <div className="hidden md:flex items-center py-3 w-full">
          <div className='text-xs flex w-2/5 justify-start text-gray-300 dark:text-gray hover:text-black-100 dark:hover:text-white-100'>
            <div className='flex items-center cursor-pointer'>
              Coin
              <Icon
                name="sort-icon"
                size={16}
                className="text-gray"
              />
            </div>  
          </div>
          <div className='text-xs flex w-1/5 justify-end text-right text-gray-300 dark:text-gray hover:text-black-100 dark:hover:text-white-100'>
            <div className='flex items-center cursor-pointer'>
              Amount
              <Icon
                name="sort-icon"
                size={16}
                className="text-gray"
              />
            </div>  
          </div>
          <div className='text-xs flex w-1/5 justify-end text-right text-gray-300 dark:text-gray hover:text-black-100 dark:hover:text-white-100'>
            <div className='flex items-center cursor-pointer'>
              Available
              <Icon
                name="sort-icon"
                size={16}
                className="text-gray"
              />
            </div>  
          </div>
          <div className='text-xs flex w-1/5 justify-end text-right text-gray-300 dark:text-gray hover:text-black-100 dark:hover:text-white-100'>
            Action
          </div>
        </div>

        <div className="max-h-[256px] overflow-y-auto overflow-x-hidden">
          {
            new Array(15).fill(null).map((_, idx) => (
              <div className="flex justify-between md:justify-normal items-center py-3 w-full hover:bg-white-100 hover:dark:bg-background-200">
                <div className='flex w-2/5 justify-start'>
                  <div className='gap-2 flex items-center cursor-pointer'>
                    <Image src="https://www.cryptocompare.com/media/19633/btc.png" width={24} height={24} alt="Bitcoin" />
                    <div>
                      <div>BTC</div>
                      <div className="text-sm text-gray-300 dark:text-gray">Bitcoin</div>
                    </div>
                  </div>  
                </div>
                <div className='flex w-1/5 justify-end text-right'>
                  <div>
                    <div>******</div>
                    <div className="text-sm text-gray-300 dark:text-gray">******</div>
                  </div>  
                </div>
                <div className='hidden md:flex w-1/5 justify-end text-right'>
                    <div>*****</div>
                </div>


                <div className="hidden md:flex w-1/5 justify-end text-right">
                  <div className="flex items-center gap-2">
                    <Link href="/" className='text-sm  underline'>
                      Convert
                    </Link>
                    <Link href="/" className='text-sm  underline'>
                      Earn
                    </Link>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}