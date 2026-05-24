import { Require2FA } from "../responsemodel/required2FA.model"
import { UserProfile } from "./user.model"

export interface RequiredTerms {
  termsID: number,
  tenantID: number,
  name: string,
  version: string,
  url: string,
  createDate: string,
  lastUpdateDate: string,
  lastUpdateUserID: number,
  status: boolean
}

export interface SubUser {
  sessionID: number,
  userID: number,
  email: string,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  isPhoneVerified: boolean,
  isEmailVerified: boolean,
  lastLoginDate: string,
  createDate: string,
  sessionTimeOut: number,
  isGoogleVerified: boolean,
  vipLevel: string,
  accountType: string,
  language: string,
  fiatCurrency: string,
  kycLevel: number,
  require2FA: Require2FA,
  required2FA: Require2FA,
  userRoles: [
    {
      roleId: number,
      name: string
    }
  ],
  profile: UserProfile,
  requiredTerms: RequiredTerms[]
}