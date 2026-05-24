import { BaseResult } from "@/core/models/auth/responsemodel/baseresult.model";
import { get, post } from "../global.api.webservice";
import { UserBank } from "@/core/models/auth/models/bank.model";

export const userBankService = {
  addBankAccount,
  editBankAccount,
  deleteBankAccount,
  getBankList
};

function addBankAccount(bankName: string, accountNumber: string, symbol?: string) {
  return new Promise<BaseResult<UserBank>>((resolve, reject) => {
    post(`/user/bank/add`, { bankName, accountNumber, symbol })
      .then((res: BaseResult<UserBank>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function editBankAccount(bankID: number, bankName: string, accountNumber: string, symbol?: string, status?: boolean) {
  return new Promise<BaseResult<UserBank>>((resolve, reject) => {
    post(`/user/bank/edit`, { bankID, bankName, accountNumber, symbol, status })
      .then((res: BaseResult<UserBank>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function deleteBankAccount(bankID: number) {
  return new Promise<BaseResult<UserBank>>((resolve, reject) => {
    post(`/user/bank/delete`, { bankID })
      .then((res: BaseResult<UserBank>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function getBankList() {
  return new Promise<BaseResult<UserBank[]>>((resolve, reject) => {
    get(`/user/bank/list`)
      .then((res: BaseResult<UserBank[]>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}