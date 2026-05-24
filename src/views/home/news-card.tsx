import { Card } from "@/components/ui/card"
import { Icon } from "@/components/ui/icon"
import Link from "next/link"
import { twMerge } from "tailwind-merge"

export const NewsCard = () => {

  const news = [
    {
      link: "/news/1",
      title: "Fed'in Önemli Ekonomik Veriler Ortasında Faiz İndirimi Seçeneklerini Açık Tutması Bekleniyor",
    },
    {
      link: "/news/2",
      title: "ABD'li Sanatçılar, NFT Projesi Düzenlemeleri Nedeniyle SEC'e Dava Açtı",
    },
    {
      link: "/news/3",
      title: "Artan Günlük Gelirin Ortasında Bitcoin Madenci Satışları Düştü"
    },
    {
      link: "/news/4",
      title: "BNB 24 Saatte %3,02 Artışla 590 USDT'yi Aştı"      
    }
  ]

  return (
    <>
      <Card className="w-full flex flex-col gap-3 md:gap-4">
        <div className="pt-2 flex justify-center md:justify-between items-center">
          <div className="flex gap-6 font-medium ">
            Haberler
          </div>
          <Link href="/news" className="hidden md:flex items-center text-gray text-sm pb-2">
            Tüm Haberleri Gör
            <Icon
            name="chevron-left"
            size={16}
            className="!text-gray hover:!text-white-100 transform rotate-180 mt-[3px]"
          />
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          {
            news.map((item, index) => (
              <Link href={item.link} key={index} className=" hover:text-gray-100">
                  {item.title}
              </Link>
            ))
          }
        </div>
        <Link href="/news" className="flex justify-center items-center md:hidden text-gray text-sm">
          Tüm Haberleri Gör
          <Icon
            name="chevron-left"
            size={16}
            className="!text-gray hover:!text-white-100 transform rotate-180 mt-[3px]"
          />
        </Link>
      </Card>
    </>
  )
}