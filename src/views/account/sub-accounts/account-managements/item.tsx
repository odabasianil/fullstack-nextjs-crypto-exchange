import { customFormatDate } from "@/utils/format-date";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { ChangePasswordModal } from "./change-password";

export const SubUserItem = (props: any) => {
  const {
    subUser,
    handleFreeze,
    handleUnfreeze,
    handleDelete,
    setPopUpId,
    popUpId
  } = props;
  const popupRef = useRef(null);
  const [isChangePassword, setIsChangePassword] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (popupRef.current && !(popupRef.current as any).contains(event.target)) {
        setPopUpId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popupRef]);

  return (
    <>
      <div className="flex items-center justify-between border-y border-white-100 dark:border-secondary">
        <div className="flex items-center ">
          <div className="min-w-[200px] w-[200px] px-4 py-3 text-sm whitespace-nowrap">{subUser?.email}</div>
          <div className="min-w-[120px] w-[120px] px-4 py-3 text-sm whitespace-nowrap text-center">{subUser?.userID ?? '-'}</div>
          <div className="min-w-[120px] w-[120px] px-4 py-3 text-sm whitespace-nowrap text-center">{subUser?.phoneNumber ?? '-'}</div>
          <div className="min-w-[170px] w-[170px] px-4 py-3 text-sm whitespace-nowrap text-center">{customFormatDate(subUser?.createDate, 'DD/MM/YYYY')}</div>
          <div className="min-w-[160px] w-[160px] px-4 py-3 text-sm whitespace-nowrap text-center">{subUser?.accountType ?? '-'}</div>
          <div className={twMerge(
            "min-w-[90px] w-[90px] px-4 py-3 text-sm whitespace-nowrap text-center",
            subUser?.status == 10 ? 'text-success' : 'text-error'
          )}>
            {subUser?.statusText}
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 cursor-pointer min-w-[120px] w-[120px] px-4 py-3 bg-white dark:bg-background border-l border-white-100 dark:border-secondary">
          <div
            onClick={() => subUser?.status == 10 ? handleFreeze(subUser?.userID, true) : handleUnfreeze(subUser?.userID, true)}
            className="text-sm text-primary-100 dark:text-primary-100 whitespace-nowrap "
          >
            {subUser?.status == 10 ? 'Freeze' : 'Unfreeze'}
          </div>
          <div

            className="relative text-sm text-primary-100 dark:text-primary-100 whitespace-nowrap "
          >
            <div onClick={() => setPopUpId(subUser?.userID)}>
              ···
            </div>
            {popUpId === subUser?.userID &&
              <div
                ref={popupRef}
                className={twMerge(
                  "z-50 absolute top-6 right-0 shadow-md bg-white dark:bg-background-700 rounded-sm py-0.5 w-[140px]",
                )}
              >
                <Link
                  href={`/me/sub-account/asset-management/transfer/?direction=in&userId=${subUser?.userID}&email=${subUser?.email}&asset=BTC`}
                  className="flex text-sm font-semibold text-black-100 dark:text-white-100 whitespace-nowrap px-3 py-1.5 hover:bg-white-100 hover:dark:bg-secondary"
                >
                  Transfer In
                </Link>
                <div
                  onClick={() => {
                    setIsChangePassword(true);
                    setPopUpId(null)
                  }}
                  className="flex text-sm font-semibold text-black-100 dark:text-white-100 whitespace-nowrap px-3 py-1.5 hover:bg-white-100 hover:dark:bg-secondary"
                >
                  Change password
                </div>
                <div
                  onClick={() => {
                    setPopUpId(null);
                    handleDelete(subUser?.userID, null, true)
                  }}
                  className="flex text-sm font-semibold text-black-100 dark:text-white-100 whitespace-nowrap px-3 py-1.5 hover:bg-white-100 hover:dark:bg-secondary"
                >
                  Delete
                </div>
              </div>
            }
          </div>
        </div>
      </div>
      <ChangePasswordModal
        open={isChangePassword}
        setOpen={setIsChangePassword}
        userId={subUser?.userID}
        email={subUser?.email}
      />
    </>
  )
} 