import { BaseResult } from "@/core/models/auth/responsemodel/baseresult.model";
import { get, post } from "../../spottrade.api.webservice";
import { API } from "@/core/models/auth/models/api.model";
import { Order, OrderBookInit } from "@/core/models/auth/models/orderbook/spot/init.model";

export const spotApiService = {
  createOrder,
  orderBookInit,
  cancelOpenOrder,
  orderHistory
};

function cancelOpenOrder(orderId: number, symbol: string) {
  return new Promise<BaseResult<boolean>>((resolve, reject) => {
    post(`/Order/CancelOpenOrder`, { orderId, symbol })
      .then((res: BaseResult<boolean>) => {
        console.log('cancel order', res);
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function createOrder(symbol: string, side: number, type: number, quantity: number, price: number) {
  return new Promise<BaseResult<Order>>((resolve, reject) => {
    post(`/Order/create`, { symbol, side, type: type, quantity, price })
      .then((res: BaseResult<Order>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function orderBookInit(symbol: string) {
  return new Promise<BaseResult<OrderBookInit>>((resolve, reject) => {
    post(`/orderbook/init`, { symbol })
      .then((res: BaseResult<OrderBookInit>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function orderHistory(filter: any) {
  return new Promise<BaseResult<any>>((resolve, reject) => {
    post(`/Order/OrderHistory`, { filter })
      .then((res: BaseResult<any>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}