'use client'

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import Select from "@/components/ui/select";
import { User } from "@/core/models/auth/models/user.model";
import { subUserService } from "@/core/services/user/subuser.service";
import { walletService } from "@/core/services/user/wallet.service";
import { RootState } from "@/core/store/store";
import { useToast } from "@/hooks/use-toast";
import { NoResult } from "@/views/crypto/payment/no-result";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

export default function Page() {
  const searchParams = useSearchParams();
  const defaultDirection = searchParams.get('direction') ?? 'in';
  const userId = searchParams.get('userId');
  const email = searchParams.get('email');
  const asset = searchParams.get('asset') ?? 'BTC';
  const user = useSelector((state: RootState) => state.user.user) as User;

  const [subUsers, setSubUsers] = useState<any[]>([]);
  const [selectedFrom, setSelectedFrom] = useState<any>(null);
  const [selectedTo, setSelectedTo] = useState<any>(null);
  const [coins, setCoins] = useState<any[]>([]);
  const [direction, setDirection] = useState(defaultDirection);
  const [amount, setAmount] = useState('');
  const [selectedCoin, setSelectedCoin] = useState<any>(null);
  const [wallet, setWallet] = useState<any>(null);
  const [subUserWallet, setSubUserWallet] = useState<any>(null);
  const [inputError, setInputError] = useState('');
  const [walletList, setWalletList] = useState<any>({});
  const [emailFilter, setEmailFilter] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const fromOptions = useMemo(() => {
    const options = [];
    if (user) {
      if (direction === 'in') {
        options.push({ label: user.email, value: user.userID });
        subUsers?.forEach((subUser) => {
          options.push({ label: subUser.email, value: subUser.userID });
        })
      } else {
        subUsers?.forEach((subUser) => {
          options.push({ label: subUser.email, value: subUser.userID });
        })
      }
    }

    return options;
  }, [subUsers, direction, user]);

  const toOptions = useMemo(() => {
    const options = [];
    if (user) {
      if (direction === 'out') {
        options.push({ label: user.email, value: user.userID });
        subUsers?.forEach((subUser) => {
          options.push({ label: subUser.email, value: subUser.userID });
        })
      } else {
        subUsers?.forEach((subUser) => {
          options.push({ label: subUser.email, value: subUser.userID });
        })
      }
    }

    return options;
  }, [subUsers, direction, user]);

  const setWalletBalances = () => {
    const symbol = selectedCoin?.value ?? asset;
    walletService.getWalletBalance(symbol, 1).then((res) => {
      if (res.success) {
        setWalletList(res.data);
      } else {
        console.log(res);
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  const setWalletValues = () => {
    setAmount('');
    if (selectedCoin && selectedCoin.value) {
      walletService.getWallet(selectedCoin.value).then((res) => {
        if (res?.success) {
          setWallet(res.data);
        } else {
          toast?.open(res?.messageList?.[0]?.message, 'circle-close', '', 'text-error');
        }
      });

      if (selectedFrom && selectedTo) {
        const subUserId = direction === 'in' ? selectedTo.value : selectedFrom.value;
        subUserService.getWallet(subUserId, selectedCoin.value).then((res) => {
          if (res?.success) {
            setSubUserWallet(res.data);
          } else {
            toast?.open(res?.messageList?.[0]?.message, 'circle-close', '', 'text-error');
          }
        });
      }
    }
  }


  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
    setInputError('');

    if (direction === 'in') {
      if (+e.target.value > +wallet?.free) {
        setInputError('Amount is greater than available balance');
        return;
      }
    } else {
      if (+e.target.value > +subUserWallet?.free) {
        setInputError('Amount is greater than available balance');
        return;
      }
    }
  }

  const useMaxAmount = () => {
    if (direction === 'in') {
      setAmount(wallet?.free);
    } else {
      setAmount(subUserWallet?.free);
    }
  }

  const handleSubmit = () => {
    if (!selectedFrom || !selectedTo || !selectedCoin || !amount) {
      setInputError('Please fill all fields');
      return;
    }

    if (inputError) {
      return;
    }

    setIsLoading(true);
    if (direction === 'in') {
      subUserService.transferIn(selectedTo.value, selectedCoin.value, +amount).then((res) => {
        if (res?.success) {
          toast?.open('Transfer in successfully', 'check-circle', '', 'text-success');
          setWalletValues();
          setWalletBalances();
        } else {
          toast?.open(res?.messageList?.[0]?.message, 'circle-close', '', 'text-error');
        }
      }).catch((err) => {
        toast?.open(err?.response?.data?.messageList?.[0]?.message, 'circle-close', '', 'text-error');
      }).finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });
    } else {
      subUserService.transferOut(selectedFrom.value, selectedCoin.value, +amount).then((res) => {
        if (res?.success) {
          toast?.open('Transfer out successfully', 'check-circle', '', 'text-success');
          setWalletValues();
          setWalletBalances();
        } else {
          toast?.open(res?.messageList?.[0]?.message, 'circle-close', '', 'text-error');
        }
      }).catch((err) => {
        toast?.open(err?.response?.data?.messageList?.[0]?.message, 'circle-close', '', 'text-error');
      }).finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });
    }
  }

  const filteredWalletList = useMemo(() => {
    if (!emailFilter) return walletList;
    const filtered = walletList?.subAccountBalanceList?.filter((item: any) => item.email.includes(emailFilter));
    return { ...walletList, subAccountBalanceList: filtered };
  }, [emailFilter, walletList])


  useEffect(() => {
    if (user) {
      subUserService.getAllSubUser().then((res: any) => {
        if (res?.success && res.data) {
          const selected = res.data.find((subUser: any) => subUser.userID == userId) ?? res.data.find((subUser: any) => subUser.email == email);
          if (direction === 'out') {
            setSelectedFrom({ label: selected.email, value: selected.userID })
            setSelectedTo({ label: user.email, value: user.userID })
          } else {
            setSelectedFrom({ label: user.email, value: user.userID })
            setSelectedTo({ label: selected?.email, value: selected?.userID })
          }
          setSubUsers(res.data);
        } else {
          console.log(res)
          toast?.open(res?.messageList?.[0]?.message, 'circle-close', '', 'text-error');
        }
      }).catch((err) => {
        console.log(err)
        toast?.open(err?.response?.data?.messageList?.[0]?.message, 'circle-close', '', 'text-error');
      })

      if (userId && asset) {
        subUserService.listWallet(userId).then((res: any) => {
          if (res?.success) {
            setCoins(res.data)
          } else {
            console.log(res)
            toast?.open(res?.messageList?.[0]?.message, 'circle-close', '', 'text-error');
          }
        });
      }
    }
  }, [user, userId, asset, email])

  useEffect(() => {
    setWalletValues();
  }, [selectedFrom, selectedTo, selectedCoin])

  useEffect(() => {
    if (user) {
      if (direction === 'out') {
        setSelectedFrom(selectedTo)
        setSelectedTo({ label: user.email, value: user.userID })
      } else {
        setSelectedTo(selectedFrom)
        setSelectedFrom({ label: user.email, value: user.userID })
      }
    }
  }, [direction])

  useEffect(() => {
    setWalletBalances();
  }, [selectedCoin])

  return (
    <div className="w-full mx-auto !max-w-full ">
      <div className="my-4 md:my-0 pl-8 flex items-center gap-4">
        <Link className="text-gray-300 dark:text-gray text-sm" href="/me/sub-account/asset-management">
          Asset Management
        </Link>
        <Icon name="chevron-left" size={16} className="text-gray-300 dark:text-gray" />
        <div className="text-sm">Transfer</div>
      </div>


      <div className="flex flex-col md:flex-row md:justify-between gap-y-6 p-4 lg:p-8 ">
        <div className="w-full md:w-[40%]">
          <div className="text-[32px] font-bold mb-4">Transfer</div>
          <div className="flex items-center gap-4 w-full">
            <div className="w-8 hidden md:flex flex-col items-center justify-center mb-8">
              <div className="border w-[5px] h-[5px] rounded-full border-green " />
              <div className="h-[65px] w-0 border-l border-dashed border-black dark:border-white flex-[0_0_auto]"></div>
              <div
                onClick={() => setDirection(direction === 'in' ? 'out' : 'in')}
                className="cursor-pointer bg-white-100 dark:bg-secondary rounded-full h-8 w-8 flex items-center justify-center"
              >
                <Icon name="share" size={16} className="text-black-100 dark:text-white-100" />
              </div>
              <div className="h-[65px] w-0 border-l border-dashed border-black dark:border-white flex-[0_0_auto]"></div>
              <div className="border w-[5px] h-[5px] rounded-full border-error " />
            </div>
            <div className="w-full">
              <div className="text-sm mb-1">Transfer From</div>
              {subUsers?.length > 0 &&
                <Select
                  options={fromOptions}
                  defaultValue={selectedFrom?.value}
                  value={selectedFrom}
                  disabled={direction === 'in'}
                  setValue={setSelectedFrom}
                  className="w-full h-10 md:h-12 rounded-md bg-white-100 dark:bg-secondary mb-4"
                  valueClass="text-black-100 dark:text-white-100"
                />
              }
              <Select
                options={[
                  { label: 'Spot', value: 'Spot' },
                ]}
                value={{ label: 'Spot', value: 'Spot' }}
                className="w-full h-10 md:h-12 rounded-md bg-white-100 dark:bg-secondary mb-4 md:mb-10"
                valueClass="text-black-100 dark:text-white-100"
              />

              <div className="flex md:hidden items-center justify-center">
                <div
                  onClick={() => setDirection(direction === 'in' ? 'out' : 'in')}
                  className="flex  cursor-pointer bg-white-100 dark:bg-secondary rounded-full h-8 w-8  items-center justify-center"
                >
                  <Icon name="share" size={16} className="text-black-100 dark:text-white-100" />
                </div>
              </div>
              <div className="text-sm mb-1">Transfer To</div>
              {subUsers?.length > 0 &&
                <Select
                  options={toOptions}
                  defaultValue={selectedTo?.value}
                  value={selectedTo}
                  setValue={setSelectedTo}
                  disabled={direction === 'out'}
                  className="w-full h-10 md:h-12 rounded-md bg-white-100 dark:bg-secondary mb-4"
                  valueClass="text-black-100 dark:text-white-100"
                />
              }
              <Select
                options={[
                  { label: 'Spot', value: 'Spot' },
                ]}
                value={{ label: 'Spot', value: 'Spot' }}
                className="w-full h-10 md:h-12 rounded-md bg-white-100 dark:bg-secondary mb-10"
                valueClass="text-black-100 dark:text-white-100"
              />
            </div>
          </div>
          <div>
            {coins?.length > 0 &&
              <>
                <div className="text-sm mb-1">Coin</div>
                <Select
                  options={[
                    ...coins?.map((coin) => ({ label: coin.symbol, value: coin.symbol }))
                  ]}
                  value={selectedCoin}
                  setValue={setSelectedCoin}
                  defaultValue={coins?.[0]?.symbol}
                  className="w-full h-10 md:h-12 rounded-md bg-white-100 dark:bg-secondary mb-4"
                  valueClass="text-black-100 dark:text-white-100"
                />
              </>
            }
            <div>
              <div className="text-sm mb-1">Amount</div>
              <Input
                value={amount}
                onChange={handleChangeAmount}
                className="w-full h-10 md:h-12 rounded-md"
                error={inputError}
              />
              <div className="flex gap-3 mt-1 mb-4">
                <div className="text-xs text-gray-300 dark:text-gray">Available: {direction === 'in' ? wallet?.free : subUserWallet?.free} {selectedCoin?.label}</div>
                <div onClick={useMaxAmount} className="text-xs text-primary-100 cursor-pointer underline">Use max amount</div>
              </div>
            </div>
          </div>
          <div className="flex w-full justify-end">
            <Button
              className="h-10 w-full md:w-[164px] text-sm"
              disabled={amount?.length < 1 || inputError}
              isLoading={isLoading}
              onClick={handleSubmit}
            >
              Confirm
            </Button>
          </div>
        </div>

        <div className="w-full md:w-[55%]">
          <div className="mb-4 text-lg font-semibold leading-10">Balance Compraision</div>
          <div className="flex gap-4 w-full">
            <div className="w-1/2">
              <div className="mb-1 text-sm">Email</div>
              <Input
                value={emailFilter}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmailFilter(e.target.value)}
                className="w-full h-10 pl-12 rounded-md bg-white-100 dark:bg-secondary border-none"
                label={<Icon name="search" size={16} className="text-gray-300 dark:text-gray" />}
                labelClassName="left-4"
              />
            </div>
            <div className="w-1/2">
              <div className="mb-1 text-sm">Account</div>
              <Select
                options={[
                  { label: 'Spot', value: 'Spot' }
                ]}
                value={{ label: 'Spot', value: 'Spot' }}
                className="w-full h-10 rounded-md bg-white-100 dark:bg-secondary mb-4"
                valueClass="text-black-100 dark:text-white-100"
              />
            </div>
          </div>
          <div className="mt-4 overflow-auto ">
            <div className="border-y flex w-full py-3 px-4">
              <div className="w-2/3 text-xs text-gray-300 dark:text-gray">Email</div>
              <div className="w-1/3 text-xs text-gray-300 dark:text-gray">Available Balance</div>
            </div>
            <div className="h-[236px] overflow-y-auto border-b border-white-100 dark:border-secondary">
              {
                (!filteredWalletList.subAccountBalanceList && !filteredWalletList?.email) && <NoResult width={72} height={72} imageClass="mt-12" />
              }
              {filteredWalletList?.email && <div className="flex w-full py-3 px-4 border-b border-white-100 dark:border-secondary">
                <div className="w-2/3 text-sm">{filteredWalletList?.email}</div>
                <div className="w-1/3 text-sm">{filteredWalletList?.amount}</div>
              </div>}
              {
                filteredWalletList?.subAccountBalanceList?.length > 0 &&
                filteredWalletList?.subAccountBalanceList?.map((item: any, index: number) => (
                  <div key={index} className="flex w-full py-3 px-4 border-b border-white-100 dark:border-secondary">
                    <div className="w-2/3 text-sm">{item.email}</div>
                    <div className="w-1/3 text-sm">{item.amount}</div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 