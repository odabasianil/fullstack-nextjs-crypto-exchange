'use client'

import { Button } from "@/components/ui/button";
import { HelpText } from "@/components/ui/help-text";
import { Icon } from "@/components/ui/icon";
import Select from "@/components/ui/select";
import Link from "next/link";
import { useState } from "react";
import { CreateModal } from "./create-modal";

export const MobileFilter = (props: any) => {
  const { statusTabs, status, setStatus, count, onSubmit, handleSearch } = props;
  const [openFilter, setOpenFilter] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="md:hidden px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-0.5">
            <div className="text-gray-300 dark:text-gray text-sm font-semibold underline decoration-dashed relative group">
              Sub Accounts
              <HelpText className="text-sm font-normal w-max">
                Sub Accounts <Link href="/faq" className="text-primary-100" >FAQ</Link>
              </HelpText>
            </div>
            <div className="text-sm">({count})</div>
          </div>
          {/* <div onClick={() => setOpenFilter(true)}>
            <Icon name="filter" size={24} className="text-gray-300 dark:text-gray" />
          </div> */}
        </div>
        <Button
          appearance="secondary"
          className="w-full h-10 my-2 text-sm font-semibold dark:bg-gray-300 px-3"
          onClick={() => setOpenModal(true)}
        >
          <Icon name="plus" className="mr-0.5" size={16} />
          Create Sub Account
        </Button>
      </div>
      {openFilter && (
        <div className="fixed h-full w-full top-0 left-0 px-6 z-[110] bg-white dark:bg-black-100 animate-slideInUp">
          <div className="h-16 flex items-center justify-between">
            <div className="text-xl font-semibold">Filter</div>
            <div onClick={() => setOpenFilter(false)}>
              <Icon name="close" size={24} className="text-gray-300 dark:text-gray" />
            </div>
          </div>
          <Select
            options={[{ label: 'All', value: 'all' }]}
            selectedOptionLabel="Sub Accounts"
            value={'all'}
            wrapperClassName="w-full h-10 dark:bg-secondary border-none"
            className="w-full"
            selectedClass="text-black-100 dark:text-white-100 text-sm font-semibold"
            valueClass="flex justify-between w-full"
            optionsClassName="top-[38px]"
          />
          <Select
            options={statusTabs}
            selectedOptionLabel="Status"
            value={status}
            setValue={setStatus}
            wrapperClassName="w-full mt-8 h-10 dark:bg-secondary border-none"
            className="w-full"
            selectedClass="text-black-100 dark:text-white-100 text-sm font-semibold"
            valueClass="flex justify-between w-full"
            optionsClassName="top-[38px]"
          />
          <div className="fixed bottom-6 px-4 left-0 flex items-center justify-between w-full gap-4">
            <Button onClick={() => {
              handleSearch(true);
              setOpenFilter(false)
            }} appearance="secondary" className="h-10 font-semibold text-sm w-full dark:bg-gray-300" >Reset</Button>
            <Button onClick={() => {
              handleSearch();
              setOpenFilter(false)
            }} className="h-10 font-semibold text-sm w-full" >Search</Button>
          </div>
        </div>
      )}
      <CreateModal
        open={openModal}
        setOpen={setOpenModal}
        onSubmit={onSubmit}
      />
    </>
  )
}