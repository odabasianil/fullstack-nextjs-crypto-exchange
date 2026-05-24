'use client'

import { useState } from "react"
import { CookieModal } from "../cookie-modal"
import { useTranslation } from "react-i18next"

export const CopyRight = () => {
  const { t } = useTranslation();
  const [openCookie, setOpenCookie] = useState(false)

  return (
    <div className="w-full">
      <div className="h-[1px] w-full bg-gray-100 dark:bg-gray-200"></div>
      <div className="flex justify-center items-center gap-6 mt-4 text-sm text-gray-300 dark:text-gray-100">
        <p>FAZ-3 © 2024</p>
        <div className="hover:text-primary cursor-pointer" onClick={() => setOpenCookie(true)}>
          {t('footer.cookie')}
        </div>
      </div>
      <CookieModal
        open={openCookie}
        setOpen={setOpenCookie}
      />
    </div>
  )
}