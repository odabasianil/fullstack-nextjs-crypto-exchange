'use client';

import { Button } from "@/components/ui/button"
import { HelpText } from "@/components/ui/help-text"
import { Icon } from "@/components/ui/icon"
import Select from "@/components/ui/select"
import Link from "next/link"
import { useState } from "react"
import { CreateModal } from "./create-modal";



export const Filter = (props: any) => {
  const { statusTabs, status, setStatus, count, onSubmit, handleSearch } = props;
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="my-5 hidden md:flex flex-wrap items-center gap-6 px-4 md:px-0">
        <Select
          options={[{ label: 'All', value: 'all' }]}
          selectedOptionLabel="Sub Accounts"
          value={'all'}
          wrapperClassName="md:w-[250px] 2xl:w-[400px] h-10 dark:bg-secondary dark:border-gray-300"
          className="md:w-[250px] 2xl:w-[400px]"
          selectedClass="text-black-100 dark:text-white-100 text-sm font-semibold"
          valueClass="flex justify-between w-full"
        />
        <Select
          options={statusTabs}
          selectedOptionLabel="Status"
          value={status}
          setValue={setStatus}
          defaultValue={status?.value}
          wrapperClassName="md:w-[250px] 2xl:w-[400px] h-10 dark:bg-secondary dark:border-gray-300"
          className="md:w-[250px] 2xl:w-[400px]"
          selectedClass="text-black-100 dark:text-white-100 text-sm font-semibold"
          valueClass="flex justify-between w-full"
        />
        <div className="flex gap-2 mt-1.5">
          <Button onClick={() => handleSearch(false)} className="h-10 font-semibold text-sm" >Search</Button>
          <Button onClick={() => {
            handleSearch(true);
          }} appearance="secondary" className="h-10 font-semibold text-sm">Reset</Button>
        </div>
        <div className="flex xl4:justify-end items-center w-full gap-2">
          <div className="flex items-center gap-0.5">
            <div className="text-gray-300 dark:text-gray text-sm font-semibold underline decoration-dashed relative group">
              Sub Accounts
              <HelpText className="text-sm font-normal w-max">
                Sub Accounts <Link href="/faq" className="text-primary-100" >FAQ</Link>
              </HelpText>
            </div>
            <div className="text-sm">({count})</div>
          </div>
          <Button
            appearance="secondary"
            className="h-8 text-sm font-semibold dark:bg-gray-300 px-3"
            onClick={() => setOpenModal(true)}
          >
            <Icon name="plus" className="mr-0.5" size={16} />
            Create Sub Account
          </Button>
        </div>
      </div>
      <CreateModal
        open={openModal}
        setOpen={setOpenModal}
        onSubmit={onSubmit}
      />
    </>
  )
}