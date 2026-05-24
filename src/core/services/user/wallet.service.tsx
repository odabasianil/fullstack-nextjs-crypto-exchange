import { BaseResult } from "@/core/models/auth/responsemodel/baseresult.model";
import { get, post } from "../global.api.webservice";
import { WalletModel } from "@/core/models/auth/models/wallet/wallet.model";

export const walletService = {
  getWallet,
  getWalletList,
  getWalletBalance
};


function getWallet(symbol: string) {
  return new Promise<BaseResult<WalletModel>>((resolve, reject) => {
    post(`/wallet/get`, { symbol })
      .then((res: BaseResult<WalletModel>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function getWalletList() {
  return new Promise<BaseResult<WalletModel[]>>((resolve, reject) => {
    get(`/wallet/list`)
      .then((res: BaseResult<WalletModel[]>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function getWalletBalance(symbol: string, walletType: number) {
  return new Promise<BaseResult<any>>((resolve, reject) => {
    post(`/wallet/balance`, { symbol, walletType })
      .then((res: BaseResult<any>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}