'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal"
import Select from "@/components/ui/select";
import { userBankService } from "@/core/services/user/bank.service";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

export const BankModal = ({
  open,
  setOpen,
  symbol,
  onSubmit,
  bankId,
  onClose
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  symbol: string,
  onSubmit: () => void;
  bankId?: number | null;
  onClose?: () => void;
}) => {
  const [bankName, setBankName] = useState('')
  const [accountNumber, setAccountNumber] = useState('');
  const [bankList, setBankList] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleCreate = () => {
    const bank = bankList.find((bank) => bank.accountNumber === accountNumber);

    if (bank) {
      setError('Bank already exists');
      return;
    }

    setIsLoading(true);
    userBankService.addBankAccount(bankName, accountNumber, symbol).then((res) => {
      if (res.success) {
        setOpen(false);
        setBankName('');
        setAccountNumber('');
        onSubmit && onSubmit();
      } else {
        toast?.open(res?.messageList?.[0]?.message, 'circle-close', '', 'text-error');
      }
    }).catch((err) => {
      console.error(err);
    }).finally(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    });
  }

  const handleEdit = () => {

    if (bankId) {

      userBankService.editBankAccount(bankId, bankName, accountNumber, symbol).then((res) => {
        if (res.success) {
          setOpen(false);
          setBankName('');
          setAccountNumber('');
          onSubmit && onSubmit();
        } else {
          toast?.open(res?.messageList?.[0]?.message, 'circle-close', '', 'text-error');
        }
      }).catch((err) => {
        console.error(err);
      }).finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });
    }
  }



  const handleSubmit = () => {
    if (!bankId) {
      handleCreate();
    } else {
      handleEdit();
    }
  }

  useEffect(() => {
    if (bankId) {
      const bank = bankList?.find((bank) => bank.userBankId === bankId);
      if (bank) {
        setBankName(bank.bankName);
        setAccountNumber(bank.accountNumber);
      }
    } else {
      setBankName('');
      setAccountNumber('');
    }
  }, [bankId])

  useEffect(() => {
    userBankService.getBankList().then((res) => {
      setBankList(res.data);
    }).catch((err) => {
      console.error(err);
    });
  }, [open])

  return (
    <>
      <Modal
        open={open}
        setOpen={setOpen}
        title={bankId ? "Edit Account Information" : "Add Account Information"}
        className="w-full md:w-[500px]"
        showCloseButton
        isMobileOpen
        onClose={onClose}
      >
        <div className="text-sm text-gray-200 dark:text-white-300">Please provide your bank account details below to proceed with the transaction.</div>
        <div className="mt-4">
          <div className="text-sm">Bank Name</div>
          <Input
            value={bankName}
            onChange={(e: any) => {
              setBankName(e.target.value)
              setError(null);
            }}
            placeholder="Enter Bank Name"
            className="w-full mt-1 h-10 text-sm pl-2.5 dark:border-gray-200 rounded-md"
          />
          {/* <Select
            options={[
              { label: 'Select Bank', value: null },
              { label: 'Bank 1', value: 1 },
              { label: 'Bank 2', value: 2 },
              { label: 'Bank 3', value: 3 },
              { label: 'Bank 4', value: 4 },
            ]}
            value={bankName}
            setValue={setBankName}
            wrapperClassName="mt-1 w-full dark:border-gray-200 rounded-md"
            className="w-full h-10"
            valueClass="pl-1 text-black-100 dark:text-white-300"
          /> */}
        </div>
        <div className="mt-4">
          <div className="text-sm">Account Number</div>
          <Input
            value={accountNumber}
            onChange={(e: any) => setAccountNumber(e.target.value)}
            placeholder="Enter Account Number"
            className="w-full mt-1 h-10 text-sm pl-2.5 dark:border-gray-200 rounded-md"
            error={error}
          />
        </div>
        <Button
          className="border-none font-semibold h-10 w-full mt-6"
          onClick={handleSubmit}
          isLoading={isLoading}
          disabled={!bankName || !accountNumber}
        >
          Confirm
        </Button>
      </Modal>
    </>
  )
}