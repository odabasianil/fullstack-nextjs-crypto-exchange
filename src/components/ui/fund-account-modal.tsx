import { useRouter } from "next/navigation";
import { Modal } from "./modal";
import Image from "next/image";
import { Button } from "./button";

interface FundAccountModalInterface {
  coin1?: string;
  coin2?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const FundAccountModal = (props: FundAccountModalInterface) => {
  const { coin1, coin2, open, setOpen } = props;
  const router = useRouter();
  const options = [
    {
      image: '/images/transfer.svg',
      title: 'Internal Transfer',
      description: 'Transfer from your internal account',
      buttonText: 'Transfer',
      onClick: () => { 
        router.push('/crypto/buy/EUR/BTC?channel=calculator&from=ocbs');
        setOpen(false);
      }
    },
    {
      image: '/images/cash.svg',
      title: 'Buy with cash',
      description: 'If you want to buy crypto currency directly with cash, this will be the best way for you.',
      buttonText: 'Buy',
      onClick: () => {
        router.push('/crypto/buy/EUR/BTC?channel=calculator&from=ocbs');
        setOpen(false);
      }
    },
    {
      image: '/images/binance-coin.svg',
      title: 'Send coin to FAZ 3',
      description: 'If you already hold some crypto currency, you can choose to transfer them to FAZ 3 via blockchain.',
      buttonText: 'Deposit',
      onClick: () => {
        router.push('/me/wallet/account/main');
        setOpen(false);
      }
    }
  ]

  return (
    <>
      <Modal
        open={open}
        setOpen={setOpen}
        title="Fund Your Account"
        showCloseButton
        className="md:w-[656px] w-full pt-5 rounded-md min-h-[423px] dark:!bg-[rgb(24,26,32)]"
      >
        <div className="mt-5 text-sm text-gray-300 dark:text-gray">
          Select your preferred method to fund your account.
        </div>
        {
          options?.map((option) => (
            <div className="mt-8 flex items-center h-16 justify-between">
              <Image src={option.image} width={64} height={64} alt={option.title} />
              <div className="flex-1 px-8">
                <div className="text-sm font-semibold">{option.title}</div>
                <div className="text-gray-300 dark:text-gray text-xs mt-2">{option.description}</div>
              </div>
              <Button
                onClick={option.onClick}
                className="h-10 w-[120px] text-sm font-semibold"
              >
                {option.buttonText}
              </Button>
            </div>
          ))}
      </Modal>
    </>
  )
}