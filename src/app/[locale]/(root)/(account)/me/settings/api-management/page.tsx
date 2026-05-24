'use client'

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Icon } from "@/components/ui/icon";
import { NoResult } from "@/views/crypto/payment/no-result";
import { Modal } from "@/components/ui/modal";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { WarningModal } from "@/views/auth/login-password/warning-modal";
import { PageProps } from "@/types/page-props";
import { apiService } from "@/core/services/user/api.service";
import { API } from "@/core/models/auth/models/api.model";
import { Verify2FAModal, Verify2FAModalData } from "@/views/account/security/verify2fa-modal";

import { Verify2FA } from "@/utils/verify-2fa";
import { useToast } from "@/hooks/use-toast";
import { customFormatDate } from "@/utils/format-date";

const modalProps = {
  className: "md:w-[520px] rounded-t-md rounded-b-none md:rounded-md !p-0",
  titleWrapperClass: "pb-0 pt-5 px-6",
  titleClass: "text-xl",
  isMobileOpen: true,
  showCloseButton: true
}

export default function Page({ params }: PageProps) {
  const type = params.type as string;
  const [checked, setChecked] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [createApiModal, setCreateApiModal] = useState(false);
  const [deleteApiModal, setDeleteApiModal] = useState(false);
  const [apiKeyType, setApiKeyType] = useState({ key: 'system', status: 'not_selected' });
  const [secretValue, setSecretValue] = useState('');
  const [list, setList] = useState<API[]>([]);
  const [openVerify2FAModal, setOpenVerify2FAModal] = useState(false);
  const [verify2FAModalData, setVerify2FAModalData] = useState<Verify2FAModalData>();
  const [successModal, setSuccessModal] = useState(false);
  const [createdKey, setCreatedKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  }

  const handleActivation = () => {
    setChecked(!checked);
  }

  const openCreateApiModal = () => {
    if (list?.length < 1 && !checked) {
      toast?.open('Please check the box to proceed', 'warning', '', 'text-warning', 4000)
      return;
    }
    setCreateApiModal(true);
    setApiKeyType({ key: 'system', status: 'not_selected' });
  }

  const handleSubmit = (actionId?: number) => {
    setIsLoading(true);
    apiService.generateApi(secretValue, actionId)
      .then((res) => {
        if (res.success) {
          if ((res.data as API)?.require2FA?.required2FA) {
            Verify2FA("2FA Verification", "Verify", res.data.require2FA, setOpenVerify2FAModal, setVerify2FAModalData).subscribe({
              next: (verifyResponse: any) => {
                if (verifyResponse.success) {
                  handleSubmit(res.data.require2FA.actionID);
                }
              }
            });

          } else {
            setCreateApiModal(false);
            setOpenVerify2FAModal(false);
            getAllApi();
            if (res.data.apiSecret) {
              setSuccessModal(true);
              setCreatedKey(res.data.apiSecret);
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });
  }

  const removeApi = (apiKeyId: number) => {
    apiService.deleteApi(apiKeyId)
      .then((res) => {
        if (res.success) {
          toast?.open('API Key deleted successfully', 'check-circle', '', 'text-green')
          getAllApi();
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const getAllApi = () => {
    apiService.getAllApi()
      .then((res) => {
        if (res.success) {
          console.log(res)
          setList(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const copyKey = () => {
    navigator.clipboard.writeText(createdKey);
    toast?.open('Copied to Secret Key', 'check-circle', '', 'text-green')

  }

  useEffect(() => {
    getAllApi();
  }, [])

  return (
    <div className="w-full mx-auto !max-w-full lg:px-8">
      <div className="">
        <div className="flex flex-col md:flex-row md:justify-between px-4 md:px-8 bg-white-100 bg-opacity-50 bg-api-linear">
          <div className="text-[32px] leading-10 font-medium pt-10 pb-6">API Management</div>
          <div className="flex items-start gap-4 pb-4 pt-6">
            <Button
              className="h-10 font-semibold text-xs rounded-lg border-none"
              onClick={openCreateApiModal}
            >
              Create API
            </Button>
            {/* <Button
              appearance="secondary"
              className="h-10 font-semibold text-xs rounded-lg"
            >
              Create Tax Report API
            </Button> */}
            {/* <Button
              appearance="secondary"
              className="h-10 font-semibold text-xs rounded-lg"
              onClick={() => setDeleteApiModal(true)}
            >
              Delete all API
            </Button> */}
          </div>
        </div>

        <div className="p-4 pl-8 mt-1">
          <div className="text-sm text-gray-300 dark:text-gray-100">1. Each account can create up to 30 API Keys.</div>
          <div className="text-sm text-gray-300 dark:text-gray-100">2. Do not disclose your API Key, Secret Key (HMAC) or Private Key (Ed25519, RSA) to anyone to avoid asset losses. You should treat your API Key and your Secret Key (HMAC) or Private Key (Ed25519, RSA) like your passwords.</div>
          <div className="text-sm text-gray-300 dark:text-gray-100">3. It is recommended to restrict access to trusted IPs only to increase your account security.</div>
          <div className="text-sm text-gray-300 dark:text-gray-100">4. You will not be able to create an API Key if KYC is not completed.</div>
        </div>
      </div>
      {list?.length < 1 && <div className="p-4 mt-2 md:mx-8 bg-[#FEF6D8] dark:bg-[#3C2601] rounded flex gap-2">
        <div onClick={handleActivation} className={twMerge(
          "cursor-pointer min-w-4 h-4 border rounded-sm border-white-500 dark:border-gray relative",
          checked && '!bg-primary-100 border-none text-black-100'
        )}>
          {checked && <Icon name="check" className="absolute w-full h-full" />}
        </div>
        <div className="text-xs">
          <div className="text-sm font-semibold">By checking this box, all existing API Key(s) on your master account and sub-accounts will be subject to Default Security Controls.</div>
          <div className="cursor-pointer flex items-center text-sm font-semibold text-primary-100" onClick={handleCollapse}>
            Default Security Controls Details
            <Icon name="chevron-left" className={twMerge(isCollapsed ? "rotate-90 ml-1" : "-rotate-90 ml-1")} />
          </div>
          {isCollapsed && (
            <>
              <div>We strongly recommend against enabling API key(s) for additional permissions (other than reading) without defining the appropriate IP access restrictions </div>
              <br /> <br />
              <p>By default, the following security controls ("Default Security Controls") would apply (including but not limited to):</p>
              <br />
              <p>Symmetric HMAC Unrestricted-IP-Access API Key(s) being:</p>
              <p>prevented from enabling trading or transfer permissions; and</p>
              <br />
              <p>periodically or immediately revoked (or certain permissions revoked) if previously enabled with trading or transfer permissions.</p>
              <br />
              <p>Asymmetric Ed25519 and RSA Unrestricted-IP-Access API Key(s) being:</p> <br /> <br />
              <p>Please be reminded that you should not disclose or share your API key(s). Disclosing your API key(s) and other access credentials could lead to your FAZ 3 Account being compromised. You are solely responsible for taking the necessary security measures to protect your FAZ 3 Account, your API key(s), access credentials and personal information.</p>
            </>
          )
          }
        </div>
      </div>}

      <div className="p-6 md:p-8 bg-white-100 bg-opacity-50 dark:bg-opacity-100 dark:bg-black-100 flex flex-col gap-2">
        {list?.length > 0 ?
          (
            list.map((item, index) => (
              <div className="flex items-center justify-between p-4 bg-white dark:bg-background border border-white-100 dark:border-secondary rounded-md">
                <div className="flex items-center gap-4">
                  <div className="text-gray-300 dark:text-gray text-sm">{customFormatDate(item?.createdDate, "DD/MM/YYYY HH:mm:ss")}</div>
                  <div className="font-semibold">{item?.alias}</div>
                </div>
                <div className="flex items-center gap-1">
                  <div onClick={() => removeApi(item.apiKeyId)} className="cursor-pointer text-primary-100 text-sm">Revoke</div>
                </div>
              </div>
            ))
          )
          : <NoResult
            text="Your Account has not created any API Keys yet."
            width={96}
            height={96}
            imageClass="mb-0"
          />}
      </div>

      {
        apiKeyType?.status === 'not_selected' &&
        <Modal
          title="Choose API Key type"
          open={createApiModal}
          setOpen={setCreateApiModal}
          {...modalProps}
        >
          <div className="p-4 md:p-6">
            <div
              onClick={() => setApiKeyType({ key: 'system', status: 'not_selected' })}
              className={twMerge(
                "flex items-start gap-4 p-4 cursor-pointer mb-4 border border-transparent",
                apiKeyType.key === 'system' && '!border-primary'
              )}>
              <Image src="/images/api-key.svg" width="64" height="64" alt="img" />
              <div>
                <div className="mb-2">System generated</div>
                <div className="text-xs">Works using HMAC symmetric encryption. An API Key and Secret Key will be provided to you. Please keep these keys secure and treat it like your password. Do not share the keys with any third parties.</div>
              </div>
            </div>

            {/* <div
                onClick={() => setApiKeyType({key: 'self', status: 'not_selected'})}
                className={twMerge(
                  "flex items-start gap-4 p-4 cursor-pointer mb-6 border border-transparent",
                  apiKeyType.key === 'self' && '!border-primary'
                )}>
                <Image src="/images/api-key.svg" width="64" height="64" alt="img" />
                <div>
                  <div className="mb-2">Self-generated</div>
                  <div className="text-xs">Works using Ed25519 or RSA asymmetric encryption. An API Key will be provided to you and you will have to create your own public-private key pair via software (for example: FAZ 3 Key Generator), and provide the public key to FAZ 3. Please keep the API Key and Private Key secure and treat it like your password. Do not share the API Key or Private Key with any third parties.</div>
                </div>
              </div> */}
            <Button
              className="w-full"
              onClick={() => setApiKeyType({ ...apiKeyType, status: 'selected' })}
            >
              Next
            </Button>
          </div>
        </Modal>
      }
      {
        apiKeyType?.status === 'selected' &&
        <Modal
          title="Create API"
          open={createApiModal}
          setOpen={setCreateApiModal}
          {...modalProps}
          className="w-[360px] rounded-t-2xl rounded-b-none md:rounded-2xl !p-0"
          isMobileOpen={false}
        >
          <div className="p-4 md:p-6">
            <div className="pb-6">
              <div className="text-xs mb-0.5">Label API Key to proceed</div>
              <Input
                value={secretValue}
                onChange={(e: any) => setSecretValue(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-4">
              <Button
                appearance="secondary"
                className="w-full h-10 rounded-lg font-semibold"
                onClick={() => setCreateApiModal(false)}
              >
                Cancel
              </Button>
              <Button
                className="w-full h-10 rounded-lg font-semibold"
                onClick={() => handleSubmit()}
                isLoading={isLoading}
                disabled={secretValue.length < 1}
              >
                Create
              </Button>
            </div>
          </div>
        </Modal>
      }

      <WarningModal
        open={deleteApiModal}
        setOpen={setDeleteApiModal}
        title="Are you sure you want to delete all API keys?"
        titleClass="order-2 mb-4 text-2xl text-center"
        textClass="text-center font-medium"
        icon="warning"
        buttonText="Confirm"
        buttonWrapperClass="flex items-center w-full gap-2"
        isCancelButton
      />
      <Verify2FAModal
        open={openVerify2FAModal}
        setOpen={(open) => {
          setOpenVerify2FAModal(open);
        }}
        data={verify2FAModalData}
      ></Verify2FAModal>
      <Modal
        open={successModal}
        setOpen={setSuccessModal}
        className="w-full md:w-[380px] flex flex-col items-center text-center rounded-b-none md:rounded-b-xl"
        isMobileOpen={true}
      >
        <div className="flex flex-col items-center dark:text-white-100 text-xl font-semibold">
          <div className={twMerge("order-2 mb-4 text-2xl text-center")}>
            API Key has been created successfully
          </div>
          <Icon name="success" size={96} className="mb-5 w-[160px] mt-1.5 order-0 !text-success" />
          <div className="max-h-[140px] overflow-y-auto max-h-auto mb-6 text-sm px-1.5 leading-[22px] order-2">
            You need to store your API key securely. You will not be able to access it again after closing this screen.
          </div>
          <div className="flex items-center justify-between rounded-lg h-10 bg-white-100 dark:bg-secondary w-full order-3">
            <div className="w-[75%] max-w-[75%] px-4 overflow-x-auto text-sm text-left no-scrollbar">{createdKey}</div>
            <div
              onClick={copyKey}
              className="cursor-pointer flex items-center justify-center font-semibold text-sm h-10 rounded-r-lg bg-primary text-black-100 w-[20%]"
            >
              Copy
            </div>
          </div>
          <Button onClick={() => setSuccessModal(false)} className="order-last w-full text-sm h-10 mt-4">
            Close
          </Button>
        </div>
      </Modal>
    </div>
  )

}
