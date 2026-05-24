import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input"
import { NoResult } from "@/views/crypto/payment/no-result";
import { use, useEffect, useMemo, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { WhitelistModal } from "../../whitelist-modal";
import Image from "next/image";
// import { whiteListService } from "@/core/services/user/whitelist.service";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

export const WithdrawToAddress = (props: any) => {
  const {
    whitelist,
    address,
    setAddress,
    networks,
    selectedNetwork,
    setSelectedNetwork,
    initWhitelist,
    selectedAddress,
    tag,
    setTag
  } = props;
  const [open, setOpen] = useState(false);
  const popupRef = useRef(null);
  const [whitelistPopup, setWhitelistPopup] = useState(false);
  const [openAddWhitelist, setOpenAddWhitelist] = useState(false);
  const toast = useToast();
  const { t } = useTranslation();

  const selectedAddressNetwork = useMemo(() => {
    return networks?.find((network: any) => network.blockchainId == selectedAddress?.blockchainId);
  }, [networks, selectedAddress]);

  const deleteWhiteList = (e: any, whitelistId: number) => {
    e.stopPropagation();
    e.preventDefault();

    // whiteListService.deleteWhiteList({ whitelistId }).then((res) => {
    //   if (res.success) {
    //     initWhitelist();
    //     toast?.open('Whitelist deleted successfully', 'check-circle', '', 'text-success');
    //   } else {
    //     toast?.open(res?.messageList?.[0]?.message, 'circle-close', '', 'text-error');
    //   }
    // })
  }

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

  useEffect(() => {
    if (openAddWhitelist) {
      document.documentElement.style.overflowY = "hidden";
    } else {
      document.documentElement.style.overflowY = "auto";
    }
  }, [openAddWhitelist])

  console.log(selectedNetwork)
  return (
    <>
      <div>
        <div className="relative">
          <Input
            value={address}
            onChange={(e: any) => {
              setAddress(e.target.value)
            }}
            placeholder={t('withdraw.enter_address')}
            required
            error={!address ? t('withdraw.enter_recipient_address') : ''}
            errorClassName="font-thin "
            isClearable
            isPassword
          />
          <div className="absolute right-3 top-3.5 cursor-pointer" onClick={() => setWhitelistPopup(!whitelistPopup)}>
            <Icon name="whitelist" size={20} className="text-gray-300 dark:text-gray" />
          </div>
          {
            whitelistPopup && (
              <div className="z-50 absolute top-12 left-0 py-4 bg-white dark:bg-black-100 border border-white-200 dark:border-black-200 rounded-md w-full max-h-[466px] overflow-y-auto">
                <div className="flex justify-end px-4">
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      setOpenAddWhitelist(true)
                      setWhitelistPopup(false)
                    }}>
                    <Icon name="edit" size={20} className="text-gray-300 dark:text-gray" />
                  </div>
                </div>
                <div className="h-[250px] overflow-y-auto">
                  {
                    whitelist?.length < 1 ? (
                      <div className="flex items-center justify-center">
                        <NoResult
                          text={t('trade.no_result')}
                          imageClass="mt-14"
                          width={80}
                          height={80}
                        />
                      </div>
                    ) : (
                      <div className="py-4">
                        {
                          whitelist?.map((item: any) => (
                            <div
                              onClick={() => {
                                setAddress(item.address)
                                setWhitelistPopup(false)
                              }}
                              className="flex items-end justify-between hover:bg-white-100 dark:hover:bg-secondary px-4 py-3 cursor-pointer"
                            >
                              <div className="flex flex-col items-start">
                                <div className="text-black-100 dark:text-white-100 text-base">{item.label}</div>
                                <div className=" font-normal text-sm mt-1 flex items-center gap-2">
                                  <div className="py-0.5 px-1 rounded-md bg-[#F0b9081A] font-normal text-primary-100">{item.symbol}</div>
                                  {item.address}</div>
                              </div>
                              <div className="cursor-pointer z-10 text-gray-300 dark:text-gray hover:text-black-100 hover:dark:text-white-100" onClick={(e) => deleteWhiteList(e, item.userAddressWhiteListId)}>
                                <Icon name="trash" size={20} className="" />
                              </div>
                            </div>
                          ))
                        }
                      </div>
                    )
                  }
                </div>
              </div>
            )
          }
        </div>
        {selectedAddress?.label && <div className="w-full flex flex-col gap-2 font-normal mt-2">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-300 dark:text-gray">{t('withdraw.label')}</div>
            <div className="text-sm font-semibold">{selectedAddress.label}</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-300 dark:text-gray">{t('withdraw.network')}</div>
            <div className="text-sm font-semibold">{selectedAddressNetwork?.name}</div>
          </div>
          {selectedAddress?.tag && <div className="flex items-center justify-between">
            <div className="text-sm text-gray-300 dark:text-gray">Tag</div>
            <div className="text-sm font-semibold">{selectedAddress?.tag}</div>
          </div>}
        </div>}
        {!selectedAddress?.blockchainId && <div onClick={() => setOpen(!open)} className="cursor-pointer mt-3 relative flex justify-between items-center px-2.5 py-2.5 dark:bg-black-600 md:dark:bg-transparent bg-white-300 md:bg-transparent dark:border-secondary border-white-100 border h-[50px] w-full mb-2.5 rounded-lg hover:border-primary dark:hover:border-primary ">
          {
            !selectedNetwork ? (
              <div className="text-gray dark:text-gray-200 font-semibold">{t('withdraw.select_network')}</div>
            ) : (
              <div className="flex items-center gap-2 pl-2">
                <div className="font-semibold text-black-100 dark:text-white-100">{selectedNetwork?.name}</div>
              </div>
            )
          }
          <Icon
            name="chevron-left"
            className={twMerge("text-gray dark:text-gray-200", open ? '-rotate-90' : 'rotate-90')}
          />
          {open && (
            <div ref={popupRef} className="z-50 absolute top-14 left-0 py-2 bg-white dark:bg-black-100 border border-white-200 dark:border-black-200 rounded-xl w-full max-h-[466px] overflow-y-auto">
              {
                networks?.map((network: any) => (
                  <div onClick={() => setSelectedNetwork(network)} className="cursor-pointer px-4 py-3 hover:bg-white-100 hover:dark:bg-secondary flex justify-between">
                    <div className="ml-2">
                      <div className="text-black-100 dark:text-white-100">{network.name}</div>
                    </div>
                    {/* <div className="flex flex-col items-end">
                      <div className="text-gray-300 dark:text-gray text-sm">{network.arrival}</div>
                      <div className="text-gray-300 dark:text-gray text-sm">~ ₺{network.fee}</div>
                    </div> */}
                  </div>
                ))
              }
            </div>
          )}
        </div>}
        {
          (selectedNetwork?.tagRequired && !selectedAddress?.tag) && (
            <div className="mt-2 relative">
              <Input
                value={tag}
                onChange={(e: any) => {
                  setTag(e.target.value)
                }}
                placeholder="Enter tag"
              />
            </div>
          )
        }
      </div>
      {openAddWhitelist && <WhitelistModal
        open={openAddWhitelist}
        setOpen={setOpenAddWhitelist}
        onSubmit={() => {
          initWhitelist(true)
        }}
      />}
    </>
  )
}