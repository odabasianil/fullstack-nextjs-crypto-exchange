import { BaseResult } from "@/core/models/auth/responsemodel/baseresult.model";
import { get, post } from "../global.api.webservice";

export const depositService = {
  getDepositAddress,
  depositCryptoInit,
  depositFiatInit,
  createDepositAddress
};

function depositCryptoInit() {
  return new Promise<BaseResult<any>>((resolve, reject) => {
    get(`/deposit/crypto/init`)
      .then((res: BaseResult<any>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function depositFiatInit() {
  return new Promise<BaseResult<any>>((resolve, reject) => {
    get(`/deposit/fiat/init`)
      .then((res: BaseResult<any>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function getDepositAddress(data: any) {
  return new Promise<BaseResult<any>>((resolve, reject) => {
    post(`/deposit/crypto/GetDepositAddress`, data)
      .then((res: BaseResult<any>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function createDepositAddress(data: any) {
  return new Promise<BaseResult<any>>((resolve, reject) => {
    post(`/deposit/crypto/GetOrCreateDepositAddress`, data)
      .then((res: BaseResult<any>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}