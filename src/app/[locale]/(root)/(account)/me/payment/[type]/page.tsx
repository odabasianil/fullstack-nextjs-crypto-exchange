import { PageProps } from "@/types/page-props";
import { PaymentView } from "@/views/account/payment";


export default function Page({ params }: PageProps) {
  const type = params.type as string;

  return (
    <>
     <div className="p-4 w-full mx-auto !max-w-full md:py-0 lg:px-8">
        <PaymentView type={type} />
     </div>
    </>
  )

}
