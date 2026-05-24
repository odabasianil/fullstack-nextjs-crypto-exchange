import { PageProps } from "@/types/page-props";
import { PaymentView } from "@/views/account/payment";


export default function Page({ params }: PageProps) {
  const type = params.type as string;

  return (
    <>
     <div className="p-4 md:p-0">
        <PaymentView type={type} />
     </div>
    </>
  )

}
