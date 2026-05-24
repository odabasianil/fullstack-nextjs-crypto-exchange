import { BaseResult } from "@/core/models/auth/responsemodel/baseresult.model";
import { FavoriteAdd, FavoriteDelete, FavoriteItem } from "@/core/models/auth/models/favorite.model";
import { get, post } from "../global.api.webservice";

export const favoriteService = {
  favoriteList,
  addFavorite,
  deleteFavorite
};

function favoriteList() {
  return new Promise<BaseResult<FavoriteItem[]>>((resolve, reject) => {
    get(`/user/favoritepair/list`)
      .then((res: BaseResult<any>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function addFavorite(data: FavoriteAdd) {
  return new Promise<BaseResult<FavoriteItem>>((resolve, reject) => {
    post(`/user/favoritepair/add`, data)
      .then((res: BaseResult<FavoriteItem>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function deleteFavorite(data: FavoriteDelete) {
  return new Promise<BaseResult<any>>((resolve, reject) => {
    post(`/user/favoritepair/delete`, data)
      .then((res: BaseResult<any>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}