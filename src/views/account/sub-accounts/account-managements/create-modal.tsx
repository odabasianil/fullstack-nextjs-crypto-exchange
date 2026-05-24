'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Modal } from "@/components/ui/modal"
import Select from "@/components/ui/select"
import { SubUser } from "@/core/models/auth/models/subuser.model"
import { subUserService } from "@/core/services/user/subuser.service"
import { Verify2FA } from "@/utils/verify-2fa"
import { useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"
import { Verify2FAModal } from "../../security/verify2fa-modal"
import { useToast } from "@/hooks/use-toast"
import { Icon } from "@/components/ui/icon"

const types = [
  {
    label: 'Create with email',
    value: 'email'
  },
  // {
  //   label: 'Create with virtual email',
  //   value: 'virtual'
  // },
  // {
  //   label: '3rd-Party Custodian',
  //   value: '3rd-party'
  // }
]

const thirdParty = [
  {
    label: 'Ceffu MirrorX',
    value: 'mirrorx'
  }
]

export const CreateModal = (props: any) => {
  const { open, setOpen, onSubmit } = props;
  const [type, setType] = useState(types[0])
  const [thirdPartyType, setThirdPartyType] = useState(thirdParty[0])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')
  const [virtualEmail, setVirtualEmail] = useState('')
  const [openVerify2FAModal, setOpenVerify2FAModal] = useState(false);
  const [verify2FAModalData, setVerify2FAModalData] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [rules, setRules] = useState([
    { rule: '8 ila 128 karakter', check: false },
    { rule: 'En az 1 rakam', check: false },
    { rule: 'En az 1 büyük harf', check: false },
  ]);

  const toast = useToast();

  const handle2FAVerification = (require2FAData: any) => {
    Verify2FA("2FA Verification", "Verify", require2FAData, setOpenVerify2FAModal, setVerify2FAModalData).subscribe({
      next: (verifyResponse: any) => {
        if (verifyResponse.success) {
          // Handle success of 2FA
          setOpen(false);
          setOpenVerify2FAModal(false);
          onSubmit && onSubmit();
        }
      },
      error: (err) => {
        console.error('2FA verification error:', err);
        toast?.open('2FA verification failed', 'circle-close', '', 'text-error');
      }
    });
  };

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      setError('Password does not match');
      return;
    }

    if (password.length < 1) {
      setError('Lütfen şifrenizi girin')
      return;
    }

    if (password.length < 8 || password.length > 128 || !password.match(/[0-9]/) || !password.match(/[A-Z]/)) {
      setError('Şifre gereksinimleri karşılanmadı.')
      return;
    }

    setIsLoading(true);
    subUserService.createSubUser(email, password)
      .then((res) => {
        if (res.success) {
          const require2FAData = (res.data as SubUser)?.require2FA;
          if (require2FAData?.required2FA) {
            handle2FAVerification(require2FAData);
          } else {
            setOpen(false);
            setOpenVerify2FAModal(false);
            // Optionally call getAllApi();
          }
        } else {
          toast?.open(res?.messageList?.[0]?.message, 'circle-close', '', 'text-error');
        }
      })
      .catch((err) => {
        console.error('Submission error:', err);
        toast?.open(err?.response?.data?.MessageList?.[0]?.Message, 'circle-close', '', 'text-error');
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });
  };

  useEffect(() => {
    if (password.length > 7 && password.length < 128) {
      setRules((rules) => rules.map((item, index) =>
        index === 0 ? { rule: item.rule, check: true } : item
      ));
    } else {
      setRules((rules) => rules.map((item, index) =>
        index === 0 ? { rule: item.rule, check: false } : item
      ));
    }

    if (/[A-Z]/.test(password)) {
      setRules((rules) => rules.map((item, index) =>
        index === 2 ? { rule: item.rule, check: true } : item
      ));
    } else {
      setRules((rules) => rules.map((item, index) =>
        index === 2 ? { rule: item.rule, check: false } : item
      ));
    }

    if (/[0-9]/.test(password)) {
      setRules((rules) => rules.map((item, index) =>
        index === 1 ? { rule: item.rule, check: true } : item
      ));
    } else {
      setRules((rules) => rules.map((item, index) =>
        index === 1 ? { rule: item.rule, check: false } : item
      ));
    }
  }, [password])

  return (
    <>
      <Modal
        open={open}
        setOpen={setOpen}
        title="Create Sub Account"
        className="w-full max-h-screen md:w-[384px] overflow-y-auto !rounded-md md:pt-4 z-[110]"
        showCloseButton
        onClose={() => {
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          setError('');
        }}
        isMobileOpen
      >
        {/* <div className={twMerge(type?.value !== '3rd-party' ? "mb-6" : "mb-3")}>
          <div className="text-sm text-gray-300 dark:text-gray leading-8">Sub Account Type</div>
          <Select
            wrapperClassName="w-full h-10 dark:border-gray-300"
            className="w-full"
            options={types}
            value={type}
            setValue={setType}
            valueClass="text-black-100 dark:text-white-100 text-sm pl-2"
          />
        </div> */}
        {
          type?.value === '3rd-party' &&
          <>
            <div className="mb-4">
              <div className="text-xs text-error">3rd-Party Custodian is the dedicated sub account type to integrate with a 3rd-party off-exchange-settlement (OES) program. OES allows clients to keep their assets under an external custodian account, while trading on the exchange and periodically settling via integrated OES network. Please note that, in order to implement the OES integration, clients need to open their own accounts on the external custodian side and link with a 3rd-Party Custodian sub account.</div>
            </div>
            <div className="mb-4">
              <div className="text-sm text-gray-300 dark:text-gray leading-8">3rd Party</div>
              <Select
                wrapperClassName="w-full h-10 dark:border-gray-300"
                className="w-full"
                options={thirdParty}
                value={thirdPartyType}
                setValue={setThirdPartyType}
                valueClass="text-black-100 dark:text-white-100 text-sm pl-2"
              />
            </div>
          </>
        }
        {type?.value !== 'virtual' ?
          <>
            <div className="mb-4">
              <div className="text-xs text-gray-300 dark:text-gray leading-6">Create with email</div>
              <Input
                type="text"
                className="w-full h-10 dark:border-gray-300 rounded dark:bg-background placeholder:text-sm pl-3 pb-1"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
                placeholder="Please enter your email."
              />
            </div>
            <div className="mb-4">
              <div className="text-xs text-gray-300 dark:text-gray leading-6">Password</div>
              <Input
                type="password"
                className="w-full h-10 dark:border-gray-300 rounded dark:bg-background placeholder:text-sm pl-3 pb-1"
                value={password}
                error={error ? ' ' : ''}
                onChange={(e: any) => {
                  setPassword(e.target.value)
                  setError('')
                }}
                placeholder="Please enter password"
              />
            </div>
            <div className="mb-4">
              <div className="text-xs text-gray-300 dark:text-gray leading-6">Confirm Password</div>
              <Input
                type="password"
                className="w-full h-10 dark:border-gray-300 rounded dark:bg-background placeholder:text-sm pl-3 pb-1"
                value={confirmPassword}
                onChange={(e: any) => {
                  setConfirmPassword(e.target.value)
                  setError('')
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    handleSubmit();
                  }
                }}
                error={error}
                placeholder="Please confirm password again"
              />
            </div>
            <div className="mb-4 text-xs text-gray-300 dark:text-gray"> Note: Please enter a valid email address that is not used by another account.</div>
          </> :
          <>
            <div className="mb-6">
              <div className="text-xs text-gray-300 dark:text-gray leading-6">Create with virtual email</div>
              <Input
                type="text"
                className="w-full h-10 dark:border-gray-300 rounded dark:bg-background placeholder:text-sm pl-3 pb-1"
                value={virtualEmail}
                onChange={(e: any) => setVirtualEmail(e.target.value)}
                placeholder="Please enter your SubAccount name."
              />
            </div>
            <div className="mb-4 text-xs text-gray-300 dark:text-gray">Please input a string. We will create a virtual email using that string for you to register</div>
            <div className="mb-4 text-xs text-gray-300 dark:text-gray">Note: A virtual email cannot be used to log in to a sub account. Please create an API for the sub account using the main account to manage the sub acccount.</div>

          </>
        }
        <div className="mt-4 flex flex-col gap-2">
          {rules.map((item) => <div className="flex items-center gap-2 text-black-300 text-xs md:text-sm font-normal dark:text-gray">
            <Icon
              name="check"
              size={16}
              className={twMerge(
                "text-black-300 dark:text-gray",
                item.check && '!text-success'
              )}
            />
            {item.rule}
          </div>
          )}
        </div>
        <Button
          isLoading={isLoading}
          onClick={handleSubmit}
          className="w-full font-semibold mt-4"
        >Create Sub Account</Button>
      </Modal>
      <Verify2FAModal
        open={openVerify2FAModal}
        setOpen={(open) => {
          console.log(open);
          setOpenVerify2FAModal(open);
        }}
        data={verify2FAModalData}
      ></Verify2FAModal>
    </>
  )
}