import { BaseResult } from "@/core/models/auth/responsemodel/baseresult.model";
import { get, post } from "../global.api.webservice";
import { SubUser } from "@/core/models/auth/models/subuser.model";

export const subUserService = {
  createSubUser,
  getAllSubUser,
  deleteSubUser,
  freezeSubUser,
  unfreezeSubUser,
  getWallet,
  listWallet,
  transferIn,
  transferOut,
  changePassword
};

function createSubUser(email: string, password: string, actionId?: number) {
  return new Promise<BaseResult<SubUser>>((resolve, reject) => {
    post(`/user/subuser/create`, { email, password, actionId })
      .then((res: BaseResult<SubUser>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function deleteSubUser(subUserId: string, actionId?: number | null) {
  return new Promise<BaseResult<SubUser>>((resolve, reject) => {
    post(`/user/subuser/delete`, { subUserId, actionId })
      .then((res: BaseResult<SubUser>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function getAllSubUser() {
  return new Promise<BaseResult<SubUser[]>>((resolve, reject) => {
    get(`/user/subuser/list`)
      .then((res: BaseResult<SubUser[]>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function freezeSubUser(subUserId: string) {
  return new Promise<BaseResult<SubUser>>((resolve, reject) => {
    post(`/user/subuser/freeze`, { subUserId })
      .then((res: BaseResult<SubUser>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}


function unfreezeSubUser(subUserId: string) {
  return new Promise<BaseResult<SubUser>>((resolve, reject) => {
    post(`/user/subuser/unfreeze`, { subUserId })
      .then((res: BaseResult<SubUser>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function getWallet(subUserId: string | number, symbol: string) {
  return new Promise<BaseResult<any>>((resolve, reject) => {
    post(`/subuser/wallet/Get`, { subUserId, symbol })
      .then((res: BaseResult<any>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function listWallet(subUserId: string) {
  return new Promise<BaseResult<any>>((resolve, reject) => {
    post(`/subuser/wallet/List`, { subUserId })
      .then((res: BaseResult<any>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function transferIn(subUserId: string, symbol: string, amount: number) {
  return new Promise<BaseResult<any>>((resolve, reject) => {
    post(`/subuser/wallet/TransaferIn`, { subUserId, symbol, amount })
      .then((res: BaseResult<any>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}


function transferOut(subUserId: string, symbol: string, amount: number) {
  return new Promise<BaseResult<any>>((resolve, reject) => {
    post(`/subuser/wallet/TransaferOut`, { subUserId, symbol, amount })
      .then((res: BaseResult<any>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function changePassword(userId: number, newPassword: string, actionId?: number) {
  return new Promise<BaseResult<any>>((resolve, reject) => {
    post(`/user/subuser/changePassword`, { userId, newPassword, actionId })
      .then((res: BaseResult<any>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}