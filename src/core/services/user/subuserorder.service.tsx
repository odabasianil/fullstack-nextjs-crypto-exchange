import { BaseResult } from "@/core/models/auth/responsemodel/baseresult.model";
import { get, post } from "../spottrade.api.webservice";

export const subUserOrderService = {
  getOrderHistory,
  getOrderDetail,
  cancelOpenOrder,
  getOpenOrderList
};

function getOrderHistory(filter: any, userId: number) {
  return new Promise<BaseResult<any>>((resolve, reject) => {
    post(`/subuser/order/orderhistory`, { filter, userId })
      .then((res: BaseResult<any>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function cancelOpenOrder(symbol: string, userId: number, orderId: number) {
  return new Promise<BaseResult<any>>((resolve, reject) => {
    post(`/subuser/order/cancelopenorder`, { symbol, userId, orderId })
      .then((res: BaseResult<any>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function getOrderDetail(symbol: string, userId: number, orderId: number) {
  return new Promise<BaseResult<any>>((resolve, reject) => {
    get(`/subuser/order/orderdetail`, { symbol, userId, orderId })
      .then((res: BaseResult<any>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function getOpenOrderList(symbol: string, userId: number) {
  return new Promise<BaseResult<any>>((resolve, reject) => {
    post(`/subuser/order/openorderlist`, { symbol, userId })
      .then((res: BaseResult<any>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}