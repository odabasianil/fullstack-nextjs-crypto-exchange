import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import { NoResult } from "@/views/crypto/payment/no-result"

export const C2CPayment = () => {

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-gray-300 dark:text-gray max-w-[748px]">
          P2P payment methods: When you sell cryptocurrencies, the payment method added will be displayed to buyer as options to accept payment, please ensure that the account owner’s name is consistent with your verified name on Faz3. You can add up to 20 payment methods.
        </div>
        <div className="mt-6 md:mt-0 flex items-center">
          <Button
            appearance="secondary"
            className="h-10 w-full md:w-[260px] text-sm font-semibold dark:bg-gray-300"
            >
              <Icon name="plus" className="mr-2" size={16} />
              Add a payment method
          </Button>
        </div>
      </div>

      <NoResult 
        text="You have not added any payment methods"
        imageClass="mb-0 mt-[3.5rem]"

      />
    </>
  )
}