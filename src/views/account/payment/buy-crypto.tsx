import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import { NoResult } from "@/views/crypto/payment/no-result"

export const CryptoPayment = () => {

  return (
    <>
      <div className="flex items-center">
        <div className="text-sm  max-w-[748px]">
          Manage the payment method of your credit and debit card on the buy crypto page
        </div>
      </div>

      <NoResult 
        text="You don't have any cards"
        imageClass="mb-0 mt-[3.5rem]"
      />
    </>
  )
}