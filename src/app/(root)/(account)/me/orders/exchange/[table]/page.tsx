import { PageProps } from "@/types/page-props";
import { AccountSpotOrder } from "@/views/account/spot-order";


export default function Page({ params }: PageProps) {


  return (
    <>
      <AccountSpotOrder table={params.table} />
    </>
  )

}
