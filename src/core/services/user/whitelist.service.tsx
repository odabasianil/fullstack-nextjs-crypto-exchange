import { BaseResult } from "@/core/models/auth/responsemodel/baseresult.model";
import { get, post } from "../global.api.webservice";
import { Term } from "@/core/models/auth/models/term.model";

type AddWhiteList = {
  label: string,
  symbol: string,
  blockchainId: number,
  address: string,
  networkSourceType?: number,
  networkSource?: string
  tag?: string,
}
export const whiteListService = {
  getWhitelist,
  addWhiteList,
  deleteWhiteList
};

function getWhitelist() {
  return new Promise<BaseResult<any>>((resolve, reject) => {
    get(`/user/whitelist/list`)
      .then((res: BaseResult<any>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function addWhiteList(data: AddWhiteList) {
  return new Promise<BaseResult<Term>>((resolve, reject) => {
    post(`/user/whitelist/add`, data)
      .then((res: BaseResult<any>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function deleteWhiteList({ whitelistId }: { whitelistId: number }) {
  return new Promise<BaseResult<any>>((resolve, reject) => {
    post(`/user/whitelist/delete`, { whitelistId })
      .then((res: BaseResult<any>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
