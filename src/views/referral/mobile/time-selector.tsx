'use client'

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon"
import { Modal } from "@/components/ui/modal";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export const TimeSelector = (props: any) => {
  const { date, setDate } = props;
  const [openModal, setOpenModal] = useState(false);
  const [checked, setChecked] = useState('week');

  const handleClick = () => {
    const today = new Date();
    const oneMonthAgo = new Date(today);
    oneMonthAgo.setMonth(today.getMonth() - 1);
  
    const formatDate = (date: any) => date.toISOString().split('T')[0];
  
    if (checked === 'week') {
      const oneWeekAgo = new Date(today);
      oneWeekAgo.setDate(today.getDate() - 7);
      setDate([formatDate(oneWeekAgo), formatDate(today)]);
    } else if (checked === 'month') {
      setDate([formatDate(oneMonthAgo), formatDate(today)]);
    } else if (checked === 'day') {
      const oneDayAgo = new Date(today);
      oneDayAgo.setDate(today.getDate() - 1);
      setDate([formatDate(oneDayAgo), formatDate(today)]);
    } else if (checked === 'all') {
      setDate(['2019-01-01', '2024-09-16']);
    }
    
    setOpenModal(false);
  }
  
  return (
    <>
      <div className="py-4">
        <div onClick={() => setOpenModal(true)} className="text-sm flex items-center justify-between border border-white-100 dark:border-secondary rounded-3xl px-3 py-2.5">
          {date?.[0]} -&gt; {date?.[1]}
          <Icon name="chevron-left" size={16} className="-rotate-90 text-gray-300 dark:text-gray" />
        </div>
      </div>
      <Modal
        open={openModal}
        setOpen={setOpenModal}
        title="Time Range Selector"
        showCloseButton
        isMobileOpen
        className="rounded-b-none"
      >
        <div className="py-3">
          <div className="text-sm text-gray-300 dark:text-gray">Select time range</div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm" onClick={() => setChecked('week')}>
              <div
                className={twMerge(
                  "w-4 h-4 border border-white-100 dark:border-gray-200 relative rounded-full",
                  checked === 'week' && 'border-4 !border-white-100 text-black-100'
                )}
              />
              <div>This Week</div>
            </div>

            <div className="flex items-center gap-2 text-sm" onClick={() => setChecked('month')}>
              <div
                className={twMerge(
                  "w-4 h-4 border border-white-100 dark:border-gray-200 relative rounded-full",
                  checked === 'month' && 'border-4 !border-white-100 text-black-100'
                )}
              />
              <div>This Month</div>
            </div>


            <div className="flex items-center gap-2 text-sm" onClick={() => setChecked('day')}>
              <div
                className={twMerge(
                  "w-4 h-4 border border-white-100 dark:border-gray-200 relative rounded-full",
                  checked === 'day' && 'border-4 !border-white-100 text-black-100'
                )}
              />
              <div>This Day</div>
            </div>

            <div className="flex items-center gap-2 text-sm" onClick={() => setChecked('all')}>
              <div
                className={twMerge(
                  "w-4 h-4 border border-white-100 dark:border-gray-200 relative rounded-full",
                  checked === 'all' && 'border-4 !border-white-100 text-black-100'
                )}
              />
              <div>All Time</div>
            </div>
          </div>
          <div className="mt-10 flex items-center gap-2 w-full">
            <Button appearance="secondary" className="w-full rounded-3xl font-semibold">Cancel</Button>
            <Button onClick={handleClick} className="w-full rounded-3xl font-semibold">Save</Button>
          </div>
        </div>
      </Modal>
    </>
  )
}