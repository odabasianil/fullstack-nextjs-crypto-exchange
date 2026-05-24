import { BaseResult } from "@/core/models/auth/responsemodel/baseresult.model";
import {  post } from "../global.api.webservice";
import { Activity, ActivityBody } from "@/core/models/auth/models/activity.model";

export const activityService = {
  loginActivites,
  accountActivities
};

function loginActivites(data: ActivityBody) {
  return new Promise<BaseResult<Activity>>((resolve, reject) => {
    post(`/user/activity/loginActivities`, data)
      .then((res: BaseResult<Activity>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function accountActivities(data: ActivityBody) {
  return new Promise<BaseResult<Activity>>((resolve, reject) => {
    post(`/user/activity/accountActivities`, data)
      .then((res: BaseResult<Activity>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}