import { Icon } from "@/components/ui/icon"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export const SelectCoin = ({ coins, selectedCrypto, isDeposit = false }: { coins: any; selectedCrypto?: any; isDeposit?: boolean }) => {
  const [open, setOpen] = useState(false);

  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (popupRef.current && !(popupRef.current as any).contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popupRef]);

  return (
    <>
      <div onClick={() => setOpen(!open)} className="cursor-pointer relative flex justify-between items-center px-2.5 py-2.5 dark:bg-black-600 md:dark:bg-transparent bg-white-300 md:bg-transparent dark:border-secondary border-white-100 border h-[46px] w-full mb-2.5 rounded-lg hover:border-primary dark:hover:border-primary ">
        {
          !selectedCrypto &&
          <>
            <Icon
              name="search"
              size={14}
              color="#fff"
              className="dark:hidden text-gray"
            />
            <Icon
              name="search"
              size={14}
              color="transparent"
              className="hidden dark:block dark:text-gray"
            />
          </>
        }
        <div className="flex flex-1">
          {
            (selectedCrypto && !open) ? (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <Image
                    src={`/images/coins/${selectedCrypto?.symbol?.toLowerCase()}.png`}
                    alt="coin"
                    width={20}
                    height={20}
                    className="max-h-5"
                  />
                  <div className="font-semibold text-black-100 dark:text-white-100">{selectedCrypto?.symbol}</div>
                </div>
                <Icon
                  name="chevron-left"
                  size={20}
                  color="#fff"
                  className="text-gray-300 dark:text-gray -rotate-90"
                />
              </div>
            ) :
              (<input
                type="text"
                placeholder="Search"
                className="dark:text-white-100 text-black-200 font-medium bg-transparent w-full h-[42px] ml-1.5 outline-none"
              />
              )
          }
        </div>
        {open && (
          <div ref={popupRef} className="z-50 absolute top-12 left-0 pt-4 bg-white dark:bg-black-100 border border-white-200 dark:border-black-200 rounded-xl w-full max-h-[466px] overflow-y-auto">
            {
              coins?.map((coin: any) => (
                <Link href={`/wallet/account/${isDeposit ? 'deposit' : 'withdrawal'}/crypto/${coin.symbol}`} className="cursor-pointer px-4 py-3 hover:bg-white-100 hover:dark:bg-secondary flex justify-between">
                  <div className="flex">
                    <Image
                      src={`/images/coins/${coin?.symbol?.toLowerCase()}.png`}
                      alt="coin"
                      width={20}
                      height={20}
                      className="max-h-5"
                    />
                    <div className="ml-2">
                      <div className="text-gray-300 dark:text-gray text-xs">{coin?.symbol}</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    {coin?.free && <div className="text-gray-300 dark:text-gray text-xs">~ ₺{coin?.free}</div>}
                  </div>
                </Link>
              ))
            }
          </div>
        )}
      </div>
    </>
  )
}