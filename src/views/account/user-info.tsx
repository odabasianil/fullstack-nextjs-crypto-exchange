import { HelpText } from "@/components/ui/help-text"
import { Icon } from "@/components/ui/icon"
import { User } from "@/core/models/auth/models/user.model"
import { AppDispatch, RootState, store } from "@/core/store/store"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export const UserInfo = () => {
  const [openInfo, setOpenInfo] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (popupRef.current && !(popupRef.current as any).contains(event.target)) {
        setOpenInfo(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popupRef]);

  
  const user = useSelector((state: RootState) => state.user.user) as User;

  return (
    <div className="mb-10 md:mb-0 w-full min-h-[104px] pt-6 px-4 md:px-0 md:pt-0 pb-4 flex items-center md:items-start justify-between md:justify-start relative">
      <div className="lg:min-w-[288px] flex items-center lg:items-start">
        <Image
          src="/images/user.png"
          width={64}
          height={64}
          alt="user"
          className="w-14 h-14 md:w-16 md:h-16 rounded-lg"
        />
        <div className="pl-4 md:pl-6">
          <div className="mb-2 md:mb-3">{user?.email}</div>
          <div className="flex items-center gap-2">
            <div className="relative group rounded-full bg-white-100 dark:bg-secondary w-6 h-6 flex items-center justify-center">
              <Icon name="user-info" size={16} className="text-gray-300 dark:text-gray group-hover:text-primary-100" />
              <HelpText isTop={false}>You do not currently have a Faz3 Account Bound Token.</HelpText>
            </div>
            <div className="relative group rounded-full bg-white-100 dark:bg-secondary w-6 h-6 flex items-center justify-center">
              <Icon name="twitter" size={16} className="text-gray-300 dark:text-gray group-hover:text-primary-100" />
              <HelpText isTop={false}>Link Twitter</HelpText>
            </div>
          </div>
        </div>
      </div>
      <div className="h-16 w-[1px] mx-10 self-start bg-white-100 dark:bg-secondary hidden md:block" />
      <div className="max-w-[570px] hidden md:flex flex-col md:flex-row md:gap-10">
        <div className="flex flex-col justify-normal min-h-[44px] text-sm min-w-[115px]">
          <div className="text-gray-300 dark:text-gray mb-1">User ID</div>
          <div className="flex items-center">
            <div>{user?.userID}</div>
            <div className="cursor-pointer relative group">
              <Icon name="copy" size={16} className="text-gray-300 dark:text-gray" />
              <HelpText className="w-max">Click to copy</HelpText>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-normal min-h-[44px] text-sm min-w-[110px]">
          <div className="text-gray-300 dark:text-gray mb-1">VIP Level</div>
          <Link target="_blank" href="/en/fee/trading" className="flex items-center group">
            <div>{user?.vipLevel}</div>
            <Icon name="chevron-left" size={16} className="text-gray-300 dark:text-gray rotate-180 group-hover:text-black-100 group-hover:dark:text-white-100 " />
          </Link>
        </div>
        <div className="flex flex-col justify-normal min-h-[44px] text-sm min-w-[60px]">
          <div className="text-gray-300 dark:text-gray mb-1">User Type</div>
          <div>{user?.accountType}</div>
        </div>
      </div>

      <div className="flex md:hidden items-center gap-3">
        <div className="border borde-white-100 dark:border-secondary rounded-md w-6 h-6 flex items-center justify-center">
          <Icon name="edit" size={16} className="text-gray-300 dark:text-gray" />
        </div>
        <div className="border border-white-100 dark:border-secondary rounded-md w-6 h-6 flex items-center justify-center" onClick={() => setOpenInfo(!openInfo)}>
          <Icon name="chevron-left" size={16} className="text-gray-300 dark:text-gray -rotate-90" />
        </div>
        {openInfo && <div ref={popupRef} className="absolute top-24 right-0 bg-white dark:bg-background z-50 w-screen p-4">
          <div className="flex items-center justify-between mb-4 text-sm">
            <div className="text-gray-300 dark:text-gray mb-1">User ID</div>
            <div className="flex items-center">
              <div>967330686</div>
              <div className="cursor-pointer relative group">
                <Icon name="copy" size={16} className="text-gray-300 dark:text-gray" />
                <HelpText className="w-max">Click to copy</HelpText>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mb-4 text-sm">
            <div className="text-gray-300 dark:text-gray">VIP Level</div>
            <Link target="_blank" href="/en/fee/trading" className="flex items-center group">
              <div>Regular User</div>
              <Icon name="chevron-left" size={16} className="text-gray-300 dark:text-gray rotate-180 group-hover:text-black-100 group-hover:dark:text-white-100 " />
            </Link>
          </div>
          <div className="flex items-center justify-between mb-4 text-sm">
            <div className="text-gray-300 dark:text-gray mb-1">User Type</div>
            <div>Personal</div>
          </div>
          <div className="flex items-center justify-between mb-4 text-sm">
            <div className="text-gray-300 dark:text-gray mb-1">Following</div>
            <div>1</div>
          </div>
          <div className="flex items-center justify-between mb-4 text-sm">
            <div className="text-gray-300 dark:text-gray mb-1">Follower</div>
            <Link target="_blank" href="/en/square/profile/square-creator-d4fc42eb075a/followers" className="flex items-center gap-0.5 group">
              0
              <Icon name="chevron-left" size={16} className="text-gray-300 dark:text-gray rotate-180 group-hover:text-black-100 group-hover:dark:text-white-100 " />
            </Link>
          </div>
        </div>}
      </div>
    </div>
  )
}