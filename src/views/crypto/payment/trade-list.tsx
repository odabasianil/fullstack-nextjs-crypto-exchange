'use client'

import { Icon } from '@/components/ui/icon';
import { Pagination } from '@/components/ui/pagination';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { TradeListHeader } from './trade-list-header';
import { NoResult } from './no-result';

interface TradeListProps {
  list: any;
}

export const TradeList = ({list}: TradeListProps) => {
  const [page, setPage] = useState(1);
  const [splittedData, setSplittedData] = useState([]);
  const pageCount = Number(Math.ceil(list?.items?.length / 10));
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    let sortedData = list?.items ? [...list?.items] as any : [];

    if (sortColumn) {
      sortedData.sort((a: any, b: any) => {
        let aValue = a[sortColumn];
        let bValue = b[sortColumn];

        if (sortColumn === 'pair') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        } else if (sortColumn === 'price' || sortColumn === 'volume' || sortColumn === 'market_cap') {
          aValue = parseFloat(aValue.replace(/[^0-9.-]+/g, ''));
          bValue = parseFloat(bValue.replace(/[^0-9.-]+/g, ''));
        }

        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    const start = (page - 1) * 10;
    const end = start + 10;
    setSplittedData(sortedData.slice(start, end));
  }, [page, list, sortColumn, sortDirection]);


  if (!list) {
    return (
      <>
        <TradeListHeader list={list} />
        <div className='my-6 w-full'>
          <NoResult />
        </div>
      </>
    )
  }

  return (
    <div className='w-full '>
      <TradeListHeader
        list={list}
        sortColumn={sortColumn}
        setSortColumn={setSortColumn}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
      />
      <div>
        {
          splittedData?.map((item: any, index : number) => (
            <div className='h-16 flex'>
              <div className='flex items-center justify-between flex-1  '>
                <div className='flex flex-[100_1_0%] w-[100px] md:flex-[170_1_0] md:w-[170px]'>
                  <div className='flex flex-col gap-0'>
                    <div className='flex items-center gap-1 md:gap-2 cursor-pointer pr-4 flex-grow h-full '>
                      {
                        !item.image ? 
                          <Icon
                            name="star"
                            size={16}
                            className="text-[rgb(234,236,239)] dark:text-[rgb(71,77,87)]"
                          /> :
                          <Image
                            src={item.image}
                            width={24}
                            height={24}
                            alt={item.name}
                          />
                      }
                      <div className='flex gap-0.5 items-center'>
                        <span className='text-base font-semibold'>{item.pair?.split('/')[0]}</span>
                        <span className='text-xs md:text-sm'>/</span> 
                        <span className='text-xs md:text-sm'>{item.pair?.split('/')[1]}</span>
                      </div>
                    </div> 
                    <div className='text-xs md:hidden text-gray-300 dark:text-gray'>Vol {item.volume}</div>
                  </div>
                </div>

                <div className='flex flex-[65_1_0%] w-[65px] md:flex-[212_1_0] md:w-[212px] justify-end text-right'>
                  <div className='hidden md:flex items-center cursor-pointer'>
                    {item.price}
                  </div>
                  <div className='md:hidden'>
                    {item.price.split('/')[0]}
                    <span className='text-xs'>{item.price.split('/')[1]}</span>
                  </div>
                </div>

                <div className='flex flex-[65_1_0%] w-[65px] md:flex-[128_1_0] md:w-[128px] justify-end text-right'>
                  <div className={twMerge(
                    'flex items-center justify-center md:justify-end cursor-pointer min-w-[80px] h-[30px] rounded-md md:min-w-auto md:h-auto text-sm md:text-base',
                    item.change.includes('-') ? 'bg-error md:bg-transparent md:text-error' : 'bg-success md:bg-transparent md:text-success'
                    )}>
                    {item.change}
                  </div>  
                </div>

                <div className='hidden md:flex flex-[65_1_0%] w-[65px] md:flex-[176_1_0] md:w-[176px] justify-end text-right'>
                  <div className='flex items-center cursor-pointer'>
                    {item.high_low}
                  </div>  
                </div>

                {item.volume && <div className='hidden md:flex flex-[65_1_0%] w-[65px] md:flex-[132_1_0] md:w-[132px] justify-end text-right'>
                  <div className='flex items-center cursor-pointer'>
                    {item.volume}
                  </div>  
                </div>}

                {item.market_cap && <div className='hidden md:flex flex-[65_1_0%] w-[65px] md:flex-[176_1_0] md:w-[176px] justify-end text-right'>
                  <div className='flex items-center cursor-pointer'>
                    {item.market_cap}
                  </div>  
                </div>}

                <div className='hidden md:flex items-center gap-6 flex-[65_1_0%] w-[65px] md:flex-[105_1_0] md:w-[105px] justify-end text-right'>
                  {
                    item.history_link && (
                      <Link href={item.history_link} className='flex items-center cursor-pointer'>
                        <Icon
                          name="history"
                          size={20}  
                        />
                      </Link>  
                    )
                  }
                  <Link href={item.trade_link} className='flex items-center cursor-pointer'>
                    <Icon
                      name="trade-action"
                      size={20}  
                    />
                  </Link>  
                </div>
              </div>
            </div>
          ))
        }
      </div>
      <div className="mt-6 flex justify-end w-full">
        <Pagination page={page} setPage={setPage} pageCount={pageCount} />
      </div>
    </div>
  )
}