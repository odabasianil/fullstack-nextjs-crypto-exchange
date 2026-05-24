'use client';

import { newsService } from "@/core/services/cms/news/news.service";
import { PageProps } from "@/types/page-props";
import { customFormatDate } from "@/utils/format-date";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Page({
  params,
}: PageProps) {
  const [url, id] = params.id;
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    newsService.getNews({ url, id }).then((res) => {
      console.log(res)
      setData(res.data);
    }).finally(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    });
  }, []);

  if (!isLoading && !data) {
    return (
      <div className="min-h-[70vh] container py-10 mx-auto max-w-[1152px] w-full text-black-100 dark:text-white-100 font-sans">
        <div className="text-2xl md:text-[2rem] md:leading-10 font-bold">Not Found</div>
      </div>
    )
  }
  if (isLoading) {
    return (
      <div className="min-h-[70vh] container py-10 mx-auto max-w-[1152px] w-full text-black-100 dark:text-white-100 font-sans">
        <div className="w-full h-full flex justify-center items-center">
          <div
            className='w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin'
          />
        </div>
      </div>
    )
  }
  return (
    <>
      <div className="min-h-[70vh] container py-10 mx-auto max-w-[1152px] w-full text-black-100 dark:text-white-100 font-sans">
        <div className="text-2xl md:text-[2rem] md:leading-10 font-bold">{data?.title}</div>
        <div className="text-gray-300 dark:text-gray mt-2">{customFormatDate(data?.created, 'DD/MM/YYYY')}</div>
        <div className="mt-4">
          <Image src={data?.image} alt={data?.title} width={1000} height={400} className="max-w-full max-h-[400px] object-contain" />
        </div>
        <div className="mt-6">
          {data.content}
        </div>
      </div>
    </>
  )
}