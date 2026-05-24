'use client';

import { termService } from "@/core/services/user/term.service";
import { PageProps } from "@/types/page-props";
import { useEffect, useState } from "react";

export default function Page({
  params,
}: PageProps) {
  const id = params.id;
  const [term, setTerm] = useState<any>(null);

  useEffect(() => {
    termService.termList().then((res) => {
      if (res.success) {
        console.log(res.data, id)
        const active = res?.data?.find((term) => term?.tenantId == id);
        active && setTerm(active);
      }
    });
  }, [])

  console.log(term)
  if (!term) return;

  return (
    <>
      <div className="min-h-[70vh] container pt-20 pb-10 mx-auto max-w-[1152px] w-full text-black-100 dark:text-white-100 font-sans">
        {term?.url && <iframe src={term?.url} className="w-full h-[400px] md:h-[500px]" />}
      </div>
    </>
  )
}