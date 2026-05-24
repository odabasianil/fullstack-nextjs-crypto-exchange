import { PageProps } from "@/types/page-props";
import { FuturesOrderView } from "@/views/account/futures-order";

export default function Page({ params }: PageProps) {
  return (
    <div className="!max-w-full lg:px-8 mx-auto w-full">
      <FuturesOrderView table={params.table} />
    </div>
  )
}