import { useRouter } from "next/navigation";
import { Modal } from "./modal";
import Image from "next/image";
import { Button } from "./button";
import { twJoin } from "tailwind-merge";

interface FundWalletModalInterface {
  coin?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const FundWalletModal = (props: FundWalletModalInterface) => {
  const { coin, open, setOpen } = props;
  const router = useRouter();
  const options = [
    {
      image: '/images/cash.svg',
      title: 'Buy BTC',
      description: 'Buy crypto directly with cash, hassle-free and suggested for new users.',
      buttonText: 'Buy',
      onClick: () => { 
        router.push('/buy-btc');
        setOpen(false);
      },
      buttonClassName: '!bg-primary'
    },
    {
      image: '/images/cash.svg',
      title: 'Deposit BTC',
      description: 'Conveniently deposit crypto from another account to your FAZ 3 account.',
      buttonText: 'Deposit',
      onClick: () => { 
        router.push('/internal-transfer');
        setOpen(false);
      },
      buttonClassName: 'bg-white-100 dark:!bg-gray-300 text-black-200 dark:text-white-100'
    },
    {
      image: '/images/cash.svg',
      title: 'Receive BTC',
      description: 'Receive crypto via FAZ 3 Pay ID or QR code from other FAZ 3 users instantly and with 0 fee.',
      buttonText: 'Receive',
      onClick: () => { 
        router.push('/internal-transfer');
        setOpen(false);
      },
      buttonClassName: 'bg-white-100 dark:!bg-gray-300 text-black-200 dark:text-white-100'
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
          FAZ 3 supports multiple options to fund your account. Find a method that suits you the best.
        </div>
        {
          options?.map((option) => (
            <div className="mt-8 flex items-center h-16 justify-between">
              <Image src={option.image} width={64} height={64} alt={option.title} className="p-2 rounded-full bg-white-200 dark:bg-secondary" />
              <div className="flex-1 pl-4 pr-8">
                <div className="text-sm font-semibold">{option.title}</div>
                <div className="text-gray-300 dark:text-gray text-xs mt-2">{option.description}</div>
              </div>
              <Button
                onClick={option.onClick}
                className={twJoin("h-10 w-[120px] text-sm font-semibold !border-none", option.buttonClassName)}
              >
                {option.buttonText}
              </Button>
            </div>
          ))}
      </Modal>
    </>
  )
}