'use client'
import { VolumeChart } from "@/views/markets/trading-data/options/volume-chart";

export default function Page() {

  return (
    <>
      <div className="px-4 md:px-0 w-full flex flex-col gap-[22px]">
        <VolumeChart
          title="Max Pain Price: 59000"
        />
      </div>
    </>
  )
}