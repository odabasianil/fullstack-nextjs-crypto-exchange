import { AccountSpotOrder } from "@/views/account/spot-order";

export default function Page() {
  return (
    <div className="w-full mx-auto !max-w-full lg:px-8">
      <AccountSpotOrder table={'openorder'} />
    </div>
  )
}