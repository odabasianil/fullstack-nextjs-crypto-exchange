import { BaseResult } from "@/core/models/auth/responsemodel/baseresult.model";
import { get, post } from "../global.api.webservice";
import { API } from "@/core/models/auth/models/api.model";
import { WalletModel } from "@/core/models/auth/models/wallet/wallet.model";

export const apiService = {
  generateApi,
  getAllApi,
  deleteApi,
  getWallet,
};

function generateApi(alias: string, actionId?: number) {
  return new Promise<BaseResult<API>>((resolve, reject) => {
    post(`/user/apikey/generate`, { actionId, alias })
      .then((res: BaseResult<API>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function getWallet(symbol: string) {
  return new Promise<BaseResult<WalletModel[]>>((resolve, reject) => {
    post(`/wallet/get`, { symbol })
      .then((res: BaseResult<WalletModel[]>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function deleteApi(apiKeyId: number) {
  return new Promise<BaseResult<API>>((resolve, reject) => {
    post(`/user/apikey/revoke`, { apiKeyId })
      .then((res: BaseResult<API>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function getAllApi() {
  return new Promise<BaseResult<API[]>>((resolve, reject) => {
    get(`/user/apikey/list`)
      .then((res: BaseResult<API[]>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}