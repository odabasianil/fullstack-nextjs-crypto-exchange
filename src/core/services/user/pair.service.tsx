import { BaseResult } from "@/core/models/auth/responsemodel/baseresult.model";
import { get } from "../global.api.webservice";
import { Spot } from "@/core/models/auth/models/pair.model";

export const pairService = {
  getSpotList
};


function getSpotList() {
  return new Promise<BaseResult<Spot[]>>((resolve, reject) => {
    get(`/tenant/pair/list`)
      .then((res: BaseResult<Spot[]>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}