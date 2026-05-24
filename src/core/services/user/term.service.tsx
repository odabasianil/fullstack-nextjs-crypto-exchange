import { BaseResult } from "@/core/models/auth/responsemodel/baseresult.model";
import { get, post } from "../global.api.webservice";
import { Term } from "@/core/models/auth/models/term.model";

export const termService = {
  termList,
  createTerm
};

function termList() {
  return new Promise<BaseResult<Term[]>>((resolve, reject) => {
    get(`/user/term/list`)
      .then((res: BaseResult<Term[]>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function createTerm(data: {termsId: number}) {
  return new Promise<BaseResult<Term>>((resolve, reject) => {
    post(`/user/term/create`, data)
      .then((res: BaseResult<Term>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
