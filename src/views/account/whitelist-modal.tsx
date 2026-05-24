'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal"
import { RadioButton } from "@/components/ui/radio";
import Select from "@/components/ui/select";
// import { getCurrencies } from "@/core/services/user/currency.service";
// import { whiteListService } from "@/core/services/user/whitelist.service";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

const exchangeOptions = [
  { label: "Binance", value: "Binance" },
  { label: "Coinbase", value: "Coinbase" },
  { label: "HTX", value: "HTX" },
  { label: "Bitfinex", value: "Bitfinex" },
  { label: "OKX", value: "OKX" },
  { label: "Bithumb", value: "Bithumb" },
  { label: "Kraken", value: "Kraken" },
  { label: "KuCoin", value: "KuCoin" },
  { label: "Gemini", value: "Gemini" },
  { label: "Bitget", value: "Bitget" },
  { label: "Bybit", value: "Bybit" },
  { label: "Upbit", value: "Upbit" },
  { label: "Gate.io", value: "Gate.io" },
  { label: "Other", value: "Other" },
]



export const WhitelistModal = ({
  open,
  setOpen,
  onSubmit,
  onClose
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit?: () => void;
  onClose?: () => void;
}) => {
  const [address, setAddress] = useState('')
  const [addressLabel, setAddressLabel] = useState('')
  const [currency, setCurrency] = useState<any>(null);
  const [network, setNetwork] = useState<any>(null);
  const [tag, setTag] = useState<any>(null);
  const [networkSource, setNetworkSource] = useState<any>('');
  const [networkSourceText, setNetworkSourceText] = useState<any>('');
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();
  const [checkedOrigin, setCheckedOrigin] = useState(true);
  const [currencies, setCurrencies] = useState<any>([]);
  const { t } = useTranslation();
  const [selectedType, setSelectedType] = useState(t('withdraw.exchange_address'));
  const [isLoading, setIsLoading] = useState(false);

  const walletOptions = [
    { label: "Binance Web3 Wallet", value: "Binance Web3 Wallet" },
    { label: "Trust Wallet", value: "Trust Wallet" },
    { label: "MetaMask", value: "MetaMask" },
    { label: "Rabby Wallet", value: "Rabby Wallet" },
    { label: "Phantom", value: "Phantom" },
    { label: "OKX Web 3 Wallet", value: "OKX Web 3 Wallet" },
    { label: "Coinbase Wallet", value: "Coinbase Wallet" },
    { label: "Bitget Wallet", value: "Bitget Wallet" },
    { label: t('withdraw.other'), value: "Other" }
  ]

  const networkSourceOptions = [
    {
      label: t('withdraw.exchange_address'),
      value: 1
    },
    {
      label: t('withdraw.wallet_address'),
      value: 2
    },
    {
      label: t('withdraw.others'),
      value: 3
    }
  ];

  const isVisibleTag = useMemo(() => {
    const selectedBlockchain = currencies?.find((coin: any) => coin.symbol === currency?.value)?.blockchainList?.find((blockchain: any) => blockchain.name === network?.value);

    return selectedBlockchain?.tagRequired;
  }, [network, currency]);

  const selectedBlockchainId = useMemo(() => {
    const selectedBlockchain = currencies?.find((coin: any) => coin.symbol === currency?.value)?.blockchainList?.find((blockchain: any) => blockchain.name === network?.value);

    return selectedBlockchain?.blockchainId;
  }, [network, currency]);

  const currencyOptions = useMemo(() => {
    const options = currencies?.map((currency: any) => ({
      label: currency.symbol,
      value: currency.symbol
    }))

    setCurrency(options?.[0]);
    return options;
  }, [currencies]);

  const networkOptions = useMemo(() => {
    const blockchainList = currencies?.find((coin: any) => coin.symbol === currency?.value)?.blockchainList;
    const options: any = [];

    blockchainList?.map((blockchain: any) => {
      options.push({
        label: blockchain.name,
        value: blockchain.name
      })
    })

    setNetwork(options?.[0]);
    return options
  }, [currency, currencies]);

  const resetStates = () => {
    setOpen(false);
    setAddress('');
    setCurrency(null);
    setNetwork(null);
    setNetworkSource(networkSourceOptions[0]);
  }

  const handleCreate = () => {
    if (!network.value || !currency.value || !address) {
      setError('Please fill all fields');
      return;
    }

    const params: any = {
      label: addressLabel,
      symbol: currency.value,
      address,
      blockchainId: selectedBlockchainId,
    }

    if (checkedOrigin) {
      const networkSourceVal = selectedType === t('withdraw.others') || networkSource?.value === 'Other' ? networkSourceText : networkSource?.value;
      params.networkSourceType = selectedType === t('withdraw.exchange_address') ? 1 : selectedType === t('withdraw.wallet_address') ? 2 : 3;
      params.networkSource = networkSourceVal;
    }

    if (isVisibleTag) {
      params.tag = tag;
    }

    // whiteListService.addWhiteList(params).then((res) => {
    //   if (res.success) {
    //     resetStates();
    //     toast?.open('Address added successfully', 'check-circle', '', 'text-success');
    //     onSubmit && onSubmit();
    //   } else {
    //     toast?.open(res?.messageList?.[0]?.message, 'circle-close', '', 'text-error');
    //   }
    // }).catch((err) => {
    //   toast?.open(err?.response?.data?.messageList?.[0]?.message, 'circle-close', '', 'text-error');
    //   console.error(err);
    // }).finally(() => {
    //   setTimeout(() => {
    //     setIsLoading(false);
    //   }, 1000);
    // });
  }


  const handleSubmit = () => {
    handleCreate();
  }

  useEffect(() => {
    // getCurrencies().then((res) => {
    //   if (res.success) {
    //     setCurrencies(res.data);
    //   }
    // }).catch((err) => {
    //   console.error(err);
    // });
  }, [])

  return (
    <>
      <Modal
        open={open}
        setOpen={setOpen}
        title={t('withdraw.add_withdrawal_address')}
        className="w-full md:w-[500px] rounded-b-none md:rounded-2xl max-h-[80vh] overflow-y-auto md:max-h-none"
        showCloseButton
        isMobileOpen
        // onClose={() => {
        //   resetStates();
        //   onClose && onClose();
        // }}
      >
        <div className="mt-4">
          <div className="text-sm">{t('withdraw.address_label')}</div>
          <Input
            value={addressLabel}
            onChange={(e: any) => setAddressLabel(e.target.value)}
            placeholder={t('withdraw.enter_address_label')}
            className="w-full mt-1 h-10 text-sm pl-2.5 dark:border-gray-200 rounded-md"
          />
        </div>
        {currencyOptions?.length > 0 &&
          <div className="mt-4">
            <div className="text-sm">{t('withdraw.currency')}</div>
            <div className="relative">
              <Select
                options={currencyOptions}
                value={currency}
                setValue={setCurrency}
                defaultValue={currency?.[0]?.value}
                wrapperClassName="mt-1 w-full dark:border-gray-200 rounded-md"
                className="w-full h-10"
                valueClass="pl-8 text-black-100 dark:text-white-300"
              />
              {currency?.value && <Image
                src={`/images/coins/${currency?.value?.toLowerCase()}.png`}
                alt={currency}
                width={20}
                height={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
              />}
            </div>
          </div>
        }
        <div className="mt-4">
          <div className="text-sm">{t('withdraw.address')}</div>
          <Input
            value={address}
            onChange={(e: any) => {
              setAddress(e.target.value)
              setError(null);
            }}
            placeholder={t('withdraw.enter_address')}
            className="w-full mt-1 h-10 text-sm pl-2.5 dark:border-gray-200 rounded-md"
          />
        </div>
        {networkOptions?.length > 0 &&
          <div className="mt-4">
            <div className="text-sm">{t('withdraw.network')}</div>
            <div className="relative">
              <Select
                options={networkOptions}
                value={network}
                setValue={setNetwork}
                defaultValue={networkOptions?.[0]?.value}
                wrapperClassName="mt-1 w-full dark:border-gray-200 rounded-md"
                className="w-full h-10"
                valueClass="pl-1 text-black-100 dark:text-white-300"
              />
            </div>
            {
              isVisibleTag && (
                <div className="mt-4">
                  <div className="text-sm">Tag</div>
                  <Input
                    value={tag}
                    onChange={(e: any) => setTag(e.target.value)}
                    maxLength={20}
                    className="w-full mt-1 h-10 text-sm pl-2.5 dark:border-gray-200 rounded-md"
                  />
                </div>
              )
            }
            <div>
              {
                checkedOrigin && (
                  <div className="mt-2">
                    <div className="text-sm">{t('withdraw.type')}</div>
                    <div className="flex flex-col gap-3 mt-4">
                      {networkSourceOptions?.map((item) => (
                        <RadioButton
                          key={item.value}
                          label={item.label}
                          name="gender"
                          checked={selectedType === item.label}
                          value={item.label}
                          labelClassName="text-sm font-normal"
                          onChange={(e) => {
                            setSelectedType(e)
                            setNetworkSourceText('');
                          }}
                        />
                      ))}
                    </div>
                    <div className="mt-4">
                      <div className="text-sm">{selectedType === t('withdraw.others') ? t('withdraw.name') : selectedType}</div>
                      <div className="">
                        {selectedType === t('withdraw.exchange_address') && <Select
                          options={exchangeOptions}
                          value={networkSource}
                          setValue={setNetworkSource}
                          defaultValue={exchangeOptions?.[0]?.value}
                          wrapperClassName="mt-1 w-full dark:border-gray-200 rounded-md"
                          className="w-full h-10"
                          valueClass="pl-1 text-black-100 dark:text-white-300"
                        />}
                        {selectedType === t('withdraw.wallet_address') && <Select
                          options={walletOptions}
                          value={networkSource}
                          setValue={setNetworkSource}
                          defaultValue={walletOptions?.[0]?.value}
                          wrapperClassName="mt-1 w-full dark:border-gray-200 rounded-md"
                          className="w-full h-10"
                          valueClass="pl-1 text-black-100 dark:text-white-300"
                        />}
                        {(selectedType === t('withdraw.others') || networkSource.value === 'Other') && <Input
                          value={networkSourceText}
                          onChange={(e: any) => setNetworkSourceText(e.target.value)}
                          placeholder={t('withdraw.name')}
                          className="w-full mt-1 h-10 text-sm pl-2.5 dark:border-gray-200 rounded-md"
                        />}
                      </div>
                    </div>
                  </div>
                )
              }
            </div>
          </div>
        }
        <Button
          className="border-none font-semibold h-10 w-full mt-6"
          onClick={handleSubmit}
          isLoading={isLoading}
          disabled={!address || !currency || !network}
        >
          {t('withdraw.confirm')}
        </Button>
      </Modal>
    </>
  )
}