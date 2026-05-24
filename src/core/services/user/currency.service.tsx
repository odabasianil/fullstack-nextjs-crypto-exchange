import { BaseResult } from "@/core/models/auth/responsemodel/baseresult.model";
import { post } from "../global.api.webservice";

export function getCurrencies() {
  return new Promise<BaseResult<any>>((resolve, reject) => {
    post(`/currencyblockchain/list`, {})
      .then((res: BaseResult<any>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
