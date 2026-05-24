import { Icon } from "@/components/ui/icon"
import Image from "next/image"
import Link from "next/link"

export const EarnTable = () => {

  return (
    <>
      <div className="flex items-center py-3 w-full">
        <div className='text-xs flex w-[20%] justify-start text-gray-300 dark:text-gray hover:text-black-100 dark:hover:text-white-100'>
          <div className='flex items-center cursor-pointer'>
            Coins
            <Icon
              name="sort-icon"
              size={16}
              className="text-gray"
            />
          </div>  
        </div>
        <div className='text-xs flex w-[22%] justify-end text-right text-gray-300 dark:text-gray hover:text-black-100 dark:hover:text-white-100'>
          <div className='flex items-center cursor-pointer'>
            Est.APR
            <Icon
              name="sort-icon"
              size={16}
              className="text-gray"
            />
          </div>  
        </div>
        <div className='text-xs flex w-[22%] justify-end text-right text-gray-300 dark:text-gray hover:text-black-100 dark:hover:text-white-100'>
          <div className='flex items-center cursor-pointer'>
            Duration
          </div>  
        </div>
        <div className='text-xs flex w-[22%] justify-end text-right text-gray-300 dark:text-gray hover:text-black-100 dark:hover:text-white-100'>
          <div className='flex items-center cursor-pointer'>
            Flexible APR
            <Icon
              name="sort-icon"
              size={16}
              className="text-gray"
            />
          </div>  
        </div>
       
        <div className='text-xs flex w-[14%] justify-end text-right text-gray-300 dark:text-gray hover:text-black-100 dark:hover:text-white-100'>
          Action
        </div>
      </div>
      <div className="max-h-[288px] overflow-y-auto overflow-x-hidden">
        {
          new Array(15).fill(null).map((_, idx) => (
          <div className="flex items-center py-3 w-full h-16">
            <div className='flex w-[20%] justify-start'>
              <div className='gap-2 flex items-center cursor-pointer'>
                <Image src="/images/user.png" width={24} height={24} alt="User" className="rounded-xl" />
                <div>KING-J</div>
              </div>  
            </div>
            <div className='flex w-[22%] justify-end text-right'>
              <div className="text-green">36.88% - 181.26%</div>  
            </div>
            <div className='flex w-[22%] justify-end text-right'>
              <div>flexible</div>
            </div>
            <div className='flex w-[22%] justify-end text-right'>
              <div className="flex items-center gap-1">
                46.144.71
                <div className="bg-[#2D2A20] py-0.5 px-1.5 text-primary rounded-sm text-xs">Low-Risk</div>
              </div>
            </div>

            <div className="flex w-[14%] justify-end text-right gap-2">
              <Link href="/" target="_blank" className='text-sm text-primary-100 underline'>
                Subscribe
              </Link>
            </div>
            </div>
          ))
        }
      </div>
    </>
  )
}