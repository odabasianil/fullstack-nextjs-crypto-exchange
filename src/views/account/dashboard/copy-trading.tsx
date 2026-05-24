import { Icon } from "@/components/ui/icon"
import Image from "next/image"
import Link from "next/link"

export const CopyTrading = () => {

  return (
    <>
      <div className="flex items-center py-3 w-full">
        <div className='text-xs flex w-[21%] justify-start text-gray-300 dark:text-gray hover:text-black-100 dark:hover:text-white-100'>
          <div className='flex items-center cursor-pointer'>
            Top Traders
            <Icon
              name="sort-icon"
              size={16}
              className="text-gray"
            />
          </div>  
        </div>
        <div className='text-xs flex w-[16%] justify-end text-right text-gray-300 dark:text-gray hover:text-black-100 dark:hover:text-white-100'>
          <div className='flex items-center cursor-pointer'>
            30D ROI
            <Icon
              name="sort-icon"
              size={16}
              className="text-gray"
            />
          </div>  
        </div>
        <div className='text-xs flex w-[16%] justify-end text-right text-gray-300 dark:text-gray hover:text-black-100 dark:hover:text-white-100'>
          <div className='flex items-center cursor-pointer'>
            30D PNL(USDT)
            <Icon
              name="sort-icon"
              size={16}
              className="text-gray"
            />
          </div>  
        </div>
        <div className='text-xs flex w-[16%] justify-end text-right text-gray-300 dark:text-gray hover:text-black-100 dark:hover:text-white-100'>
          <div className='flex items-center cursor-pointer'>
            AUM (USDT)
            <Icon
              name="sort-icon"
              size={16}
              className="text-gray"
            />
          </div>  
        </div>
        <div className='text-xs flex w-[13%] justify-end text-right text-gray-300 dark:text-gray hover:text-black-100 dark:hover:text-white-100'>
          <div className='flex items-center cursor-pointer'>
            Win Rate
            <Icon
              name="sort-icon"
              size={16}
              className="text-gray"
            />
          </div>  
        </div>
        <div className='text-xs flex w-[18%] justify-end text-right text-gray-300 dark:text-gray hover:text-black-100 dark:hover:text-white-100'>
          Action
        </div>
      </div>
      <div className="max-h-[288px] overflow-y-auto overflow-x-hidden">
        {
          new Array(15).fill(null).map((_, idx) => (
          <div className="flex items-center py-3 w-full h-16">
            <div className='flex w-[21%] justify-start'>
              <div className='gap-2 flex items-center cursor-pointer'>
                <Image src="/images/user.png" width={24} height={24} alt="User" className="rounded-xl" />
                <div>KING-J</div>
              </div>  
            </div>
            <div className='flex w-[16%] justify-end text-right'>
              <div className="text-green">+36.88%</div>  
            </div>
            <div className='flex w-[16%] justify-end text-right'>
              <div>56,976</div>
            </div>
            <div className='flex w-[16%] justify-end text-right'>
              <div>46.144.71</div>
            </div>
            <div className='flex w-[13%] justify-end text-right'>
              <div>62.50%</div>
            </div>

            <div className="flex w-[18%] justify-end text-right gap-2">
              <Link href="/" target="_blank" className='text-sm text-primary-100 underline'>
                Mock
              </Link>
              <Link href="/" target="_blank" className='text-sm text-primary-100 underline'>
                Copy
              </Link>
            </div>
            </div>
          ))
        }
      </div>
    </>
  )
}