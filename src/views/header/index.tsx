"use client";

import Nav from "./nav/nav";
import MobileNav from "./nav/mobile-nav";
import SecurityNav from "./security-nav";
import { useSelector } from "react-redux";
import { RootState } from "@/core/store/store";
import { userService } from "@/core/services/auth/user.service";

interface HeaderProps {
  isSecurityHeader?: boolean;
  isFuturePage?: boolean;
}

export const Header = ({ isSecurityHeader, isFuturePage=false }: HeaderProps) => {
  
  return isSecurityHeader ? (
    <div className="dark:bg-background dark:text-white-100 text-gray-800 transition-colors duration-100">
      <div className="">
        <SecurityNav/>
      </div>
    </div>
  ) : (
    <div className="z-[60] fixed top-0 w-full bg-white dark:bg-background dark:text-white-100 text-gray-800 transition-colors duration-100">
      <div className="hidden xl:block">
        <Nav isFuturePage={isFuturePage} />
      </div>
      <div className="xl:hidden">
        <MobileNav />
      </div>
    </div>
  );
};
