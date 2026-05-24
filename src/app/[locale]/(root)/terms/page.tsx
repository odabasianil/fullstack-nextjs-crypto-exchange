'use client';

import { Term } from "@/core/models/auth/models/term.model";
import { termService } from "@/core/services/user/term.service";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [terms, setTerms] = useState<Term[]>([]);

  useEffect(() => {
    termService.termList().then((res) => {
      if (res.success) {
        setTerms(res.data);
      }
    });
  }, [])

  return (
    <div className="min-h-[70vh] container py-10 mx-auto max-w-[1152px] w-full text-black-100 dark:text-white-100 font-sans">
      <div className="text-2xl md:text-[2rem] md:leading-10 font-bold">Terms</div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 group">
        {
          terms?.map((term) => (
            <Link href={`/terms/${term.tenantId}`} className="flex items-center gap-3">
              <div className="h-2 w-2 mt-0.5 bg-primary-100 rotate-45" />
              <div className="text-base group-hover:text-primary-100 whitespace-nowrap">{term.name} &gt;</div>
            </Link>
          ))
        }
      </div>
    </div>
  );
}
