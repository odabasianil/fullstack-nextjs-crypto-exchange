import { News, NewsItem } from "@/core/models/auth/models/news.model";
import { BaseResult } from "../../../models/auth/responsemodel/baseresult.model";
import { get, post } from "../../global.api.webservice";

export const newsService = {
  getNewsList,
  getNews,
};

function getNewsList(data?: any) {
  return new Promise<BaseResult<News>>((resolve, reject) => {
    post(`/cms/news/list`, data)
      .then((res: BaseResult<News>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function getNews({ id, url }: { id: number, url: string }) {
  return new Promise<BaseResult<NewsItem>>((resolve, reject) => {
    post(`/cms/news/get`, { id, url })
      .then((res: BaseResult<NewsItem>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}