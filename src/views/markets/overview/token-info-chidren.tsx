import Image from "next/image"
import { twMerge } from "tailwind-merge"

export const TokenInfoChildren = ({list} : {list: any}) => {

  return (
    <>
      <div className="flex items-center justify-between w-[240px] pl-6">
        <div>
          <div className="text-xs text-gray-300 dark:text-gray mb-2">{list?.col_1}</div>
          <div className="text-xl mb-1">{list?.val_1}</div>
          {list?.val_change && <div className={twMerge(
            'text-sm',
            list?.val_change.includes('-') ? 'text-error' : 'text-success'
          )}>
            {list?.val_change}
          </div>}
        </div>
        <div>
          <Image
            src={list?.val_change.includes('-') ? '/images/markets/downgrade.png' : '/images/markets/upgrade.png'}
            width={75}
            height={70}
            alt={list?.title}
          />
        </div>
      </div>

      <div className="flex items-center justify-between w-[240px] pl-6">
        <div>
          <div className="text-xs text-gray-300 dark:text-gray mb-2">{list?.col_2}</div>
          <div className="text-xl mb-1">{list?.val_2}</div>
          {list?.val_change_2 && <div className={twMerge(
            'text-sm',
            list?.val_change_2.includes('-') ? 'text-error' : 'text-success'
          )}>
            {list?.val_change_2}
          </div>}
        </div>
        <div>
          <Image
            src={list?.val_change_2.includes('-') ? '/images/markets/downgrade.png' : '/images/markets/upgrade.png'}
            width={75}
            height={70}
            alt={list?.title}
          />
        </div>
      </div>
    </>
  )
}