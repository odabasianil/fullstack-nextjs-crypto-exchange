'use client'

import Image from "next/image"
import { SettingsItem } from "../settings-item"
import { useState } from "react"
import { Modal } from "@/components/ui/modal"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { ModalButtons } from "./modal-buttons"

export const ProfileSettings = () => {
  const [editModal, setEditModal] = useState(false)
  const [name, setName] = useState("User f435-3");
  const router = useRouter();

  const handleNameChange = (e:any) => {
    setName(e.target.value);
  }

  return (
    <>
      <div className="md:border border-white-100 dark:border-secondary rounded-2xl pt-6 pb-3 md:p-6 md:mb-6">
        <div className="text-lg md:text-2xl font-semibold md:mb-6">Profile</div>
        <SettingsItem
          title="Nickname & Avatar"
          desc="Set up an avatar and nickname, it is suggested not to use your real name or the name of your social account as a nickname."
          buttonText="Edit"
          onClick={() => setEditModal(true)}
        >
          <div className="flex items-center gap-4">
            <Image src="/images/user.png" alt="user" width={32} height={32} className="rounded-lg" />
            <div className="text-sm font-semibold">User f435-3</div>
          </div>
        </SettingsItem>

        <SettingsItem
          title="C2C Profile"
          desc="Edit your C2C nickname, manage your payment methods and the list of users you follow."
          buttonText="Edit"
          onClick={() => router.push("/")}
          isHiddenBorder
        >
          <div className="flex items-center gap-4">
            <Image src="/images/user.png" alt="user" width={32} height={32} className="rounded-lg" />
            <div className="text-sm font-semibold">tr*****.com</div>
          </div>
        </SettingsItem>
      </div>

      <Modal
        title="Edit Profile"
        open={editModal}
        setOpen={setEditModal}
        className="md:w-[480px] rounded-t-2xl rounded-b-none md:rounded-2xl !p-0"
        titleWrapperClass="py-5 px-6"
        titleClass="text-xl"
        isMobileOpen
        showCloseButton
      >
        <div className="px-6 pb-6 flex flex-col gap-6">
          <div className="dark:text-white-500 text-xs md:text-sm">
            *Avatar and nickname will also be applied to FAZ 3 Square. 
            <br />
            Abusing them might lead to community penalties.
          </div>

          <div className="flex items-center gap-4 w-full">
            <div className="flex text-right items-center flex-shrink-0 text-sm font-semibold w-[50px] md:w-[100px]">Avatar</div>
            <div>
              <Image src="/images/user.png" alt="user" width={96} height={96} className="rounded-2xl" />
              <div className="text-xs md:text-sm text-gray-300 dark:text-gray mt-2.5">Avatar can only be modified 1 time per 30 days.</div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start gap-1 md:gap-4 w-full">
            <div className="md:h-12 flex md:text-right items-center flex-shrink-0 text-sm font-semibold w-[100px]">Nickname</div>
            <div>
              <div className="relative">
                <Input placeholder="Nickname" value={name} onChange={handleNameChange} className="w-full h-[46px]" />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 dark:text-gray">{name?.length} / 60</div>
              </div>
              <div className="text-xs md:text-sm text-gray-300 dark:text-gray mt-2.5">Nickname can only be modified 1 time per 30 days.</div>
            </div>
          </div>

          <ModalButtons onClick={() => setEditModal(false)} />
        </div>
      </Modal>
    </>
  )
}