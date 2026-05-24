import { BaseResult } from '@/core/models/auth/responsemodel/baseresult.model';
import { get, post } from '../webservice';

export const userSecurityService = {
    GetGoogleAuthenticator,
    EnableGoogleAuthenticator
};

export interface GoogleAuthenticatorResponse {
    authenticatorSecretCode: string,
    setupCode: {
      account: string,
      manualEntryKey: string,
      qrCodeSetupImageUrl: string
    }
  }

function GetGoogleAuthenticator() {
    return new Promise<BaseResult<GoogleAuthenticatorResponse>>((resolve, reject) => {
        get(`/userSecuritySetting/GetGoogleAuthenticator`)
          .then((res: BaseResult<GoogleAuthenticatorResponse>) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
}

function EnableGoogleAuthenticator(token: string) {
  return new Promise<BaseResult<GoogleAuthenticatorResponse>>((resolve, reject) => {
      post(`/userSecuritySetting/EnableGoogleAuthenticator`, {token})
        .then((res: BaseResult<GoogleAuthenticatorResponse>) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
}