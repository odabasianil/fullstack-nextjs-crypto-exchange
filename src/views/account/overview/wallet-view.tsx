import { Icon } from "@/components/ui/icon"
import Image from "next/image"
import Link from "next/link"

export const WalletView = () => {


  return (
    <>
      <div className="hidden md:flex items-center py-3 w-full">
        <div className='text-xs flex w-2/5 justify-start text-gray-300 dark:text-gray hover:text-black-100 dark:hover:text-white-100'>
          <div className='flex items-center cursor-pointer'>
            Wallet
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
            Ratio
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

      <div className="max-h-[756px] md:max-h-[256px] overflow-y-auto overflow-x-hidden">
        {
          new Array(15).fill(null).map((_, idx) => (
            <div className="flex items-center justify-between md:justify-normal py-3 w-full hover:bg-white-100 hover:dark:bg-background-200">
              <div className='flex w-2/5 justify-start'>
                <div className='gap-2 flex items-center cursor-pointer'>
                  <Image src="/images/copy-trading.png" width={24} height={24} alt="Bitcoin" />
                  <div>Copy Trading</div>
                </div>  
              </div>
              <div className='flex w-1/5 justify-end text-right'>
                <div>
                  <div>*****</div>
                  <div className="text-sm text-gray-300 dark:text-gray">*****</div>
                </div>  
              </div>
              <div className='hidden md:flex w-1/5 justify-end text-right'>
                  <div>******</div>
              </div>

              <Link href="/" className='text-sm hidden md:flex w-1/5 justify-end text-right underline'>
                Cash In
              </Link>
            </div>
          ))
        }
      </div>
    </>
  )
}