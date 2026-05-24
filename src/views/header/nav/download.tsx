import { Button } from "@/components/ui/button"
import Image from "next/image"
import { twMerge } from "tailwind-merge"

export const Download = () => {

  return (
    <>
      <div className={twMerge(
          "z-30 w-max bg-white dark:bg-black-100 transition-all shadow p-4",
          "flex flex-col justify-center items-center",
          "absolute top-10 right-0 opacity-0 invisible",
          "group-hover:visible group-hover:opacity-100"
        )}
      >
        <div className="bg-white p-[10px] rounded-[4px]">
          <Image
            src="/images/home/download-app.svg"
            alt="qr"
            width={136}
            height={136}
          />
        </div>
        <div className="mt-1 text-xs max-w-[130px] text-center text-black-100 dark:text-white-100 ">iOS ve Android Uygulamasını İndirmek için Tarayın</div>
        <Button
          appearance="primary"
          className="px-3 h-8 font-semibold mt-4 text-black-100 text-xs"
        >
          Diğer İndirme Seçenekleri
        </Button>

      </div>
    </>
  )
}