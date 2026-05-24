import { BaseResult } from "@/core/models/auth/responsemodel/baseresult.model";
import { get, post } from "../global.api.webservice";
import { KYCStart, KYCStatus, KYCSubmitForm, KYCSubmitResponse } from "@/core/models/auth/models/kyc.model";

export const kycService = {
  kycStatus,
  kycStart,
  kycSubmit
};

function kycStatus() {
  return new Promise<BaseResult<KYCStatus>>((resolve, reject) => {
    get(`/kyc/status`)
      .then((res: BaseResult<KYCStatus>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function kycStart() {
  return new Promise<BaseResult<KYCStart>>((resolve, reject) => {
    get(`/kyc/start`)
      .then((res: BaseResult<KYCStart>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function kycSubmit(data: KYCSubmitForm) {
  return new Promise<BaseResult<KYCSubmitResponse>>((resolve, reject) => {
    post(`/kyc/submit`, data)
      .then((res: BaseResult<KYCSubmitResponse>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}