import { Icon } from "@/components/ui/icon"
import Image from "next/image"
import Link from "next/link"

export const HomeDownload = () => {
  const platforms = [
    {
      text: 'MacOS',
      icon: 'apple-icon',
      href: 'https://apps.apple.com/us/app/coinbase-wallet/id1278383455',
      width: 40,
      height: 40
    },
    {
      text: 'Windows',
      icon: 'windows-icon',
      href: 'https://apps.apple.com/us/app/coinbase-wallet/id1278383455',
      width: 40,
      height: 40
    },
    {
      text: 'Linux',
      icon: 'linux-icon',
      href: 'https://apps.apple.com/us/app/coinbase-wallet/id1278383455',
      width: 40,
      height: 40
    }
  ]

  return (
    <>
      <div className="flex flex-col justify-between h-[610px]">
        <h2 className="text-[40px] font-semibold leading-[3rem] ">Her yerden işlem yapın. Dilediğiniz yerden, dilediğiniz zaman.</h2>
        <div className="flex flex-col gap-10">
          <div className="flex items-center gap-6">
            <div className="border rounded-3xl border-gray p-5">
              <div className="bg-white p-[10px]">
                <Image
                  src="/images/home/download-app.svg"
                  alt="qr"
                  width={152}
                  height={152}
                />
              </div>
            </div>
            <div>
              <p className="text-gray">Uygulamayı İndirmek İçin Tarayın</p>
              <p className="text-xl font-medium">İOS ve Android</p>
            </div>
          </div>
          <div className="flex items-center justify-between w-[436px] gap-[4rem]">
            {
              platforms.map((platform) => (
                <Link href={platform.href} className="cursor-pointer flex flex-col items-center justify-center gap-2 rounded-lg hover:bg-[#f1f2f4] hover:dark:bg-secondary p-2 w-[112px]">
                  <Icon
                    name={platform.icon}
                    size={40}
                  />
                  <p>{platform.text}</p>
                </Link>
              ))
            }
          </div>
          <Link href={'/'} className="h-12 flex items-center gap-2">
            <Icon
              name="download"
              size={20}
              className="cursor-pointer text-gray"
            />
            <p>İndirme Seçenekleri</p>
          </Link>
        </div>
      </div>    
    </>
  )
}