import { Icon } from '@/components/ui/icon'
import list from '@/data/footer/social.json'
import Image from 'next/image'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

export const SocialMenu = () => {

  return (
    <div>
      <h3 className='font-semibold'>Topluluk</h3>
      <div className={twMerge(
        'flex flex-wrap',
        'md:grid md:grid-cols-4',
        'my-[18px] md:my-6 gap-6 md:gap-x-0'
      )}>
        {
          list.map((item) => (
            <Link href={item.url} key={item.index} className='w-fit'>
              <Icon
                name={item.icon}
                size={24}
                className="cursor-pointer"
              />
            </Link>
          ))
        }
      </div>
    </div>
  )
}