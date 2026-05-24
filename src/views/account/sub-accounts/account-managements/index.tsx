'use client'

import { useEffect, useMemo, useRef, useState } from "react";
import { Filter } from "./filter";
import { MobileFilter } from "./mobile-filter";
import { subUserService } from "@/core/services/user/subuser.service";
import { useToast } from "@/hooks/use-toast";
import { Verify2FA } from "@/utils/verify-2fa";
import { Verify2FAModal } from "../../security/verify2fa-modal";
import { Modal } from "@/components/ui/modal";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { SubUserItem } from "./item";

const statusTabs = [
  {
    label: 'All Statuses',
    value: 'all'
  },
  {
    label: 'Active',
    value: 'active'
  },
  {
    label: 'Frozen',
    value: 'frozen'
  }
]

export const AccountManagementView = () => {
  const [status, setStatus] = useState(statusTabs[0]);
  const [subUsers, setSubUsers] = useState<any[]>([]);
  const [openVerify2FAModal, setOpenVerify2FAModal] = useState(false);
  const [verify2FAModalData, setVerify2FAModalData] = useState<any>();
  const [warningModal, setWarningModal] = useState(false);
  const toast = useToast();
  const [submitId, setSubmitId] = useState({ id: "", method: "" });
  const [popUpId, setPopUpId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredData, setFilteredData] = useState<any>([]);

  const getAllSubUser = () => {
    subUserService.getAllSubUser().then((res: any) => {
      if (res?.success) {
        setSubUsers(res.data);
        setFilteredData(res.data);
      } else {
        console.log(res)
        toast?.open(res?.MessageList?.[0]?.Message, 'circle-close', '', 'text-error');
      }
    }).catch((err) => {
      console.log(err)
      toast?.open(err?.response?.data?.MessageList?.[0]?.Message, 'circle-close', '', 'text-error');
    })
  }
  useEffect(() => {
    getAllSubUser();
  }, [])

  const handleSearch = (isReset = false) => {
    if (isReset) {
      setStatus(statusTabs[0]);
      setFilteredData(subUsers);
      return;
    }

    if (status.value === 'all') {
      setFilteredData(subUsers);
    } else {
      const filter = subUsers.filter((subUser) => subUser?.statusText?.toLowerCase() === status?.value);
      setFilteredData(filter);
    }
  }

  const handle2FAVerification = (require2FAData: any, subUserEmail: string) => {
    Verify2FA("2FA Verification", "Verify", require2FAData, setOpenVerify2FAModal, setVerify2FAModalData).subscribe({
      next: (verifyResponse: any) => {
        if (verifyResponse.success) {
          // Handle success of 2FA
          handleDelete(subUserEmail, verifyResponse?.data?.require2FA?.actionID)
          setOpenVerify2FAModal(false);
        }
      },
      error: (err) => {
        console.error('2FA verification error:', err);
        toast?.open('2FA verification failed', 'circle-close', '', 'text-error');
      }
    });
  };

  const handleDelete = (subUserId: string, actionId?: null | number, isNotContinue?: boolean) => {

    if (isNotContinue) {
      setWarningModal(true);
      setSubmitId({ id: subUserId, method: 'delete' });
      return;
    }

    setIsLoading(true);
    subUserService.deleteSubUser(subUserId, actionId)
      .then((res) => {
        if (res.success) {
          const require2FAData = res.data;;
          if (require2FAData?.required2FA && !actionId) {
            handle2FAVerification(require2FAData, subUserId);
          } else {
            setOpenVerify2FAModal(false);
            subUserService.getAllSubUser().then((res: any) => {
              if (res?.success) {
                toast?.open('Sub account has been deleted', 'check-circle', '', 'text-success');
                setSubUsers(res.data);
                setWarningModal(false);
              }
            });
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
  }

  const handleFreeze = (subUserId: string, isNotContinue?: boolean) => {
    if (isNotContinue) {
      setWarningModal(true);
      setSubmitId({ id: subUserId, method: 'freeze' });
      return;
    }

    setIsLoading(true);
    subUserService.freezeSubUser(subUserId)
      .then((res) => {
        if (res.success) {
          toast?.open('Sub account has been frozen', 'check-circle', '', 'text-success');
          getAllSubUser();
          setWarningModal(false);

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
  }

  const handleUnfreeze = (subUserId: string, isNotContinue?: boolean) => {
    if (isNotContinue) {
      setWarningModal(true);
      setSubmitId({ id: subUserId, method: 'unfreeze' });
      return;
    }

    setIsLoading(true);
    subUserService.unfreezeSubUser(subUserId)
      .then((res) => {
        if (res.success) {
          toast?.open('Sub account has been active', 'check-circle', '', 'text-success');
          getAllSubUser();
          setWarningModal(false);

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
  }

  return (
    <>
      <div className="px-4 md:px-8 py-6 bg-api-linear">
        <div className="text-sm text-gray-300 dark:text-gray">Sub Account</div>
        <div className="text-xl md:text-[32px] md:leading-10 font-bold">Account Management</div>
      </div>
      <Filter
        statusTabs={statusTabs}
        status={status}
        setStatus={setStatus}
        count={subUsers?.length ?? 0}
        onSubmit={getAllSubUser}
        handleSearch={handleSearch}
      />
      <MobileFilter
        statusTabs={statusTabs}
        status={status}
        setStatus={setStatus}
        count={subUsers?.length ?? 0}
        onSubmit={getAllSubUser}
        handleSearch={handleSearch}

      />
      <div className="overflow-x-auto no-scrollbar ">
        <div className="flex items-center justify-between border-y border-white-100 dark:border-secondary">
          <div className="flex items-center ">
            <div className="min-w-[200px] w-[200px] px-4 py-3 text-xs text-gray-300 dark:text-gray whitespace-nowrap">Email</div>
            <div className="min-w-[120px] w-[120px] px-4 py-3 text-xs text-gray-300 dark:text-gray whitespace-nowrap text-center">User ID</div>
            <div className="min-w-[120px] w-[120px] px-4 py-3 text-xs text-gray-300 dark:text-gray whitespace-nowrap text-center">Phone Number</div>
            <div className="min-w-[170px] w-[170px] px-4 py-3 text-xs text-gray-300 dark:text-gray whitespace-nowrap text-center">Date of creation</div>
            <div className="min-w-[160px] w-[160px] px-4 py-3 text-xs text-gray-300 dark:text-gray whitespace-nowrap text-center">Sub Account Type</div>
            <div className="min-w-[90px] w-[90px] px-4 py-3 text-xs text-gray-300 dark:text-gray whitespace-nowrap text-center">Status</div>
          </div>
          <div className="min-w-[120px] w-[120px] px-4 py-3 text-xs text-gray-300 dark:text-gray whitespace-nowrap bg-white dark:bg-background border-l border-white-100 dark:border-secondary">Action</div>
        </div>
        <div className="pb-10 overflow-visible min-h-screen">
          {filteredData?.map((subUser: any, index: number) => (
            <SubUserItem
              subUser={subUser}
              handleFreeze={handleFreeze}
              handleDelete={handleDelete}
              handleUnfreeze={handleUnfreeze}
              popUpId={popUpId}
              setPopUpId={setPopUpId}
            />
          ))}
        </div>
      </div>
      <Verify2FAModal
        open={openVerify2FAModal}
        setOpen={(open) => {
          console.log(open);
          setOpenVerify2FAModal(open);
        }}
        data={verify2FAModalData}
      ></Verify2FAModal>

      <Modal
        open={warningModal}
        setOpen={setWarningModal}
        className="w-full md:w-[380px] flex flex-col items-center text-center rounded-b-none md:rounded-b-xl"
        isMobileOpen={true}
      >
        <div className="flex flex-col items-center dark:text-white-100 text-xl font-semibold">
          <Icon name="warning" size={64} className="mb-2 w-[160px] mt-1.5 !text-success" />
          <div className="max-h-[140px] overflow-y-auto max-h-auto mb-6 text-sm px-1.5 leading-[22px] ">
            Are you sure you want to {submitId?.method} this account? {submitId?.method !== 'unfreeze' && "All open orders will be cancelled, and the API Keys will be deleted. You will not have login access."}
          </div>
          <div className="flex items-center gap-2 w-full">
            <Button appearance="secondary" onClick={() => setWarningModal(false)} className=" w-full text-sm h-10 mt-4">
              Close
            </Button>
            <Button
              isLoading={isLoading}
              onClick={() => {
                submitId?.method === 'freeze' && handleFreeze(submitId?.id);
                submitId?.method === 'delete' && handleDelete(submitId?.id);
                submitId?.method === 'unfreeze' && handleUnfreeze(submitId?.id);
              }}
              className=" w-full text-sm h-10 mt-4">
              Continue
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}