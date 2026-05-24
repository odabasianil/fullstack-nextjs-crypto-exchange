'use client'

import { Icon } from "@/components/ui/icon";
import Select from "@/components/ui/select";


interface TradeListHeaderProps {
  list: any;
  sortColumn?: string | null;
  setSortColumn?: (value: string | null) => void;
  sortDirection?: 'asc' | 'desc';
  setSortDirection?: (value: 'asc' | 'desc') => void;
}

export const TradeListHeader = (props: TradeListHeaderProps) => {
  const {
    list,
    sortColumn,
    setSortColumn,
    sortDirection,
    setSortDirection
  } = props;

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection && setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn && setSortColumn(column);
      setSortDirection  && setSortDirection('asc');
    }
  };

  const options = [
    { label: '1h' },
    { label: '4h' },
    { label: '12h' },
    { label: '24h' },
  ];

  return (
  <div className='flex items-center text-gray-300 dark:text-gray text-xs md:py-3'>
    <div className='flex flex-[100_1_0%] w-[100px] md:flex-[170_1_0] md:w-[170px]' onClick={() => handleSort('pair')}>
      <div className='flex items-center cursor-pointer pr-4 flex-grow h-full'>
        <span className='hidden md:block'>Name</span>
        <span className='md:hidden whitespace-nowrap'>Name/24h Volume</span>
        <Icon
          name="sort-icon"
          size={16}
          className="hidden md:block text-gray"
        />
      </div> 
    </div>

    <div className='flex flex-[65_1_0%] w-[65px] md:flex-[212_1_0] md:w-[212px] justify-end text-right' onClick={() => handleSort('price')}>
      <div className='flex items-center cursor-pointer'>
        Price
        <Icon
          name="sort-icon"
          size={16}
          className="text-gray"
        />
      </div>  
    </div>

    <div className='flex flex-[65_1_0%] w-[65px] md:flex-[128_1_0] md:w-[128px] justify-end text-right' >
      <div className='flex items-center cursor-pointer'>
        <Select
          options={options}
          defaultValue="24h"
          className="hidden md:flex w-[60px] !h-[22px] text-xs mr-2"
          valueClass="px-1"
        />

        <span className='hidden md:block' onClick={() => handleSort('change')}>Change</span>
        <span className='md:hidden' onClick={() => handleSort('change')}>24h Change</span>
        <Icon
          name="sort-icon"
          size={16}
          className="text-gray"
        />
      </div>  
    </div>

    <div className='hidden md:flex flex-[65_1_0%] w-[65px] md:flex-[176_1_0] md:w-[176px] justify-end text-right' onClick={() => handleSort('high_low')}>
      <div className='flex items-center cursor-pointer'>
        24h High / 24h Low
        <Icon
          name="sort-icon"
          size={16}
          className="text-gray"
        />
      </div>  
    </div>

    <div className='hidden md:flex flex-[65_1_0%] w-[65px] md:flex-[132_1_0] md:w-[132px] justify-end text-right' onClick={() => handleSort('volume')}>
      <div className='flex items-center cursor-pointer'>
        24h Volume
        <Icon
          name="sort-icon"
          size={16}
          className="text-gray"
        />
      </div>  
    </div>

    {list?.items?.[0]?.market_cap && <div className='hidden md:flex flex-[65_1_0%] w-[65px] md:flex-[176_1_0] md:w-[176px] justify-end text-right' onClick={() => handleSort('market_cap')}>
      <div className='flex items-center cursor-pointer'>
        Market Cap
        <Icon
          name="sort-icon"
          size={16}
          className="text-gray"
        />
      </div>  
    </div>}

    <div className='hidden md:flex flex-[65_1_0%] w-[65px] md:flex-[105_1_0] md:w-[105px] justify-end text-right'>
      <div className='flex items-center'>
        Actions
      </div>  
    </div>
  </div>
  )
}