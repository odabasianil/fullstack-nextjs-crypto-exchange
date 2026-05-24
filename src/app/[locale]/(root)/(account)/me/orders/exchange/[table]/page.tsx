import { PageProps } from "@/types/page-props";
import { AccountSpotOrder } from "@/views/account/spot-order";


export default function Page({ params }: PageProps) {


  return (
    <div className="w-full mx-auto !max-w-full lg:px-8">
      <AccountSpotOrder table={params.table} />
    </div>
  )

}
