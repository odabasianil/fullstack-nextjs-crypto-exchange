import { BaseResult } from "@/core/models/auth/responsemodel/baseresult.model";
import { get, post } from "../global.api.webservice";
import { LoginResult } from "@/core/models/auth/responsemodel/loginresponse.model";
import { Require2FA } from "@/core/models/auth/responsemodel/required2FA.model";

export const userSecurityService = {
  GetGoogleAuthenticator,
  EnableGoogleAuthenticator,
  ResetGoogleAuthenticator,
  GetSecuritySettings,
  SetSecuritySettings,
  GetAntiPhishingCode,
  SetAntiPhishingCode,
  ChangePassword
};
function GetAntiPhishingCode() {
  return new Promise<BaseResult<string>>((resolve, reject) => {
    get(`/user/securitySetting/GetAntiPhishingCode`)
      .then((res: BaseResult<string>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}


function SetAntiPhishingCode(code: string) {
  return new Promise<BaseResult<LoginResult>>((resolve, reject) => {
    post(`/user/securitySetting/SetAntiPhishingCode`, { AntiPhishingCode: code })
      .then((res: BaseResult<LoginResult>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function ChangePassword(NewPassword: string, actionID?: number,) {
  return new Promise<BaseResult<Require2FA>>((resolve, reject) => {
    post(`/user/password/ChangePassword`, { NewPassword: NewPassword, actionID: actionID })
      .then((res: BaseResult<Require2FA>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}


function GetSecuritySettings() {
  return new Promise<BaseResult<UserSecuritySettings>>((resolve, reject) => {
    get(`/user/securitySetting/get`)
      .then((res: BaseResult<UserSecuritySettings>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function SetSecuritySettings(request: UserSecuritySettings) {
  return new Promise<BaseResult<LoginResult>>((resolve, reject) => {
    post(`/user/securitySetting/Update`, request)
      .then((res: BaseResult<LoginResult>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function GetGoogleAuthenticator() {
  return new Promise<BaseResult<GoogleAuthenticatorResponse>>(
    (resolve, reject) => {
      get(`/user/securitySetting/GetGoogleAuthenticator`)
        .then((res: BaseResult<GoogleAuthenticatorResponse>) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    }
  );
}

function EnableGoogleAuthenticator(token: string) {
  return new Promise<BaseResult<GoogleAuthenticatorResponse>>(
    (resolve, reject) => {
      post(`/user/securitySetting/EnableGoogleAuthenticator`, { token })
        .then((res: BaseResult<GoogleAuthenticatorResponse>) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    }
  );
}

function ResetGoogleAuthenticator() {
  return new Promise<BaseResult<GoogleAuthenticatorResponse>>(
    (resolve, reject) => {
      post(`/user/securitySetting/ResetGoogleAuthenticator`, {})
        .then((res: BaseResult<GoogleAuthenticatorResponse>) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    }
  );
}

export interface GoogleAuthenticatorResponse {
  authenticatorSecretCode: string;
  setupCode: {
    account: string;
    manualEntryKey: string;
    qrCodeSetupImageUrl: string;
  };
}
export interface twoFAStatus {
  email: boolean;
  sms: boolean;
  googleAuthenticator: boolean;
}

export interface UserSecuritySettings {
  actionID?: number;
  login2FA: twoFAStatus;
  security2FA: twoFAStatus;
  transaction2FA: twoFAStatus;
}
