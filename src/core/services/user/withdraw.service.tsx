import { BaseResult } from "@/core/models/auth/responsemodel/baseresult.model";
import { get, post } from "../global.api.webservice";

export const withdrawService = {
  withdrawCryptoList,
  withdrawCryptoInit,
  withdrawFiatInit,
  createWithdrawCrypto,
  deleteWithdraw,
  withdrawFiatList,
  withdrawFiatDetail,
  withdrawCryptoDetail,
  createWithdrawFiat,
  deleteWithdrawFiat,
};

function withdrawCryptoInit() {
  return new Promise<BaseResult<any>>((resolve, reject) => {
    get(`/withdraw/crypto/init`)
      .then((res: BaseResult<any>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function withdrawCryptoList() {
  return new Promise<BaseResult<any>>((resolve, reject) => {
    get(`/withdraw/crypto/list`)
      .then((res: BaseResult<any>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function withdrawCryptoDetail({ withdrawId }: { withdrawId: number }) {
  return new Promise<BaseResult<any>>((resolve, reject) => {
    get(`/withdraw/crypto/detail`, { withdrawId })
      .then((res: BaseResult<any>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function createWithdrawCrypto({ symbol, amount, address, blockchainId, tag, actionId }: any) {
  return new Promise<BaseResult<any>>((resolve, reject) => {
    post(`/withdraw/crypto/create`, { symbol, amount, address, blockchainId, tag, actionId })
      .then((res: BaseResult<any>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function deleteWithdraw({ withdrawCryptoId }: { withdrawCryptoId: number }) {
  return new Promise<BaseResult<any>>((resolve, reject) => {
    post(`/withdraw/crypto/delete`, { withdrawCryptoId })
      .then((res: BaseResult<any>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function withdrawFiatInit() {
  return new Promise<BaseResult<any>>((resolve, reject) => {
    get(`/withdraw/fiat/init`)
      .then((res: BaseResult<any>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function withdrawFiatList() {
  return new Promise<BaseResult<any>>((resolve, reject) => {
    get(`/withdraw/fiat/historylist`)
      .then((res: BaseResult<any>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function withdrawFiatDetail({ WithdrawFiatId }: { WithdrawFiatId: number }) {
  return new Promise<BaseResult<any>>((resolve, reject) => {
    get(`/withdraw/fiat/historydetail`, { WithdrawFiatId })
      .then((res: BaseResult<any>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function createWithdrawFiat({ symbol, amount, userBankId, actionId }: any) {
  return new Promise<BaseResult<any>>((resolve, reject) => {
    post(`/withdraw/fiat/create`, { symbol, amount, userBankId, actionId })
      .then((res: BaseResult<any>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function deleteWithdrawFiat({ withdrawFiatId }: { withdrawFiatId: number }) {
  return new Promise<BaseResult<any>>((resolve, reject) => {
    post(`/withdraw/fiat/delete`, { withdrawFiatId })
      .then((res: BaseResult<any>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}