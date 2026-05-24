import { Faq } from "../../../models/auth/models/faq.model";
import { BaseResult } from "../../../models/auth/responsemodel/baseresult.model";
import { get, post } from "../../global.api.webservice";

export const faqService = {
  getFaqList,
  getFaq,
};

function getFaqList(data: any) {
  return new Promise<BaseResult<Faq[]>>((resolve, reject) => {
    post(`/cms/faq/list`, data)
      .then((res: BaseResult<Faq[]>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function getFaq(id: number) {
  return new Promise<BaseResult<Faq>>((resolve, reject) => {
    get(`/cms/faq/get/${id}`)
      .then((res: BaseResult<Faq>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}