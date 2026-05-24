import { Ticker } from "./ticker.model";

export interface OrderBookInit {
    orderBook: OrderBook;
    openOrders: Order[];
    userOrderHistory: any[];
    lastTrades: LastTradeItem[];
    ticker: Ticker;
}

export interface Order {
    orderId: number;
    symbol: string;
    side: number;
    type: number;
    price: number;
    quantity: number;
    executedQuantity: number;
    cummulativeQuantity: number;
    status: number;
    created: string;
    updated: string;
    canceled: string | null;
}

export interface OrderBookItem {
    price: number;
    quantity: number;
}

export interface LastTradeItem {
    id: number;
    price: number;
    quantity: number;
    quoteQuantity: number;
    isBuyerMaker: boolean;
    isBestMatch: boolean;
    time: string;
}

interface OrderBook {
    asks: OrderBookItem[];
    bids: OrderBookItem[];
}