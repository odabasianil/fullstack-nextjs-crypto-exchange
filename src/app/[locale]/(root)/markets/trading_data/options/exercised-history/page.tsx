'use client'

import { Pagination } from "@/components/ui/pagination";
import { useState } from "react";

export default function Page() {
  const [page, setPage] = useState(1);
  const dataCount = 40;
  const perPage = 20;
  const pageCount = Math.ceil(dataCount / perPage);

  return (
    <div className="rounded-tl rounded-tr overflow-hidden relative">
      <table className="w-full text-left border-collapse table-auto">
        <colgroup></colgroup>
        <thead>
          <tr className="bg-[rgb(245,245,245)] dark:bg-[rgb(43,49,57)] text-gray-300 dark:text-gray text-xs">
            <th className="py-3 px-4 whitespace-nowrap">Expiration Date</th>
            <th className="py-3 px-4 whitespace-nowrap">Underlying</th>
            <th className="py-3 px-4 whitespace-nowrap">Settlement Price</th>
          </tr>
        </thead>

        <tbody>
          {
            new Array(perPage).fill(null).map((item, index) => (
              <tr className="hover:bg-[rgb(245,245,245)] dark:hover:bg-[rgb(43,49,57)] border-b border-white-400 dark:border-gray-300">
                <td className="py-[18px] px-4 whitespace-nowrap text-sm">2024-08-14	</td>
                <td className="py-[18px] px-4 whitespace-nowrap text-sm">BTCUSDT</td>
                <td className="py-[18px] px-4 whitespace-nowrap text-sm">60,852.40268573</td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <div className="mt-6 flex justify-end w-full">
        <Pagination page={page} setPage={setPage} pageCount={pageCount} />
      </div>
    </div>
  )
}