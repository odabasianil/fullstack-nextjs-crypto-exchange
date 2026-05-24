export interface Ticker {
    lastPrice: number;
    priceChange: number;
    highPrice: number;
    lowPrice: number;
    volume: number;
    quoteVolume: number;
    openPrice: number;
    prevClosePrice: number;
  }

  export interface MiniTicker {
    l: number, //lastPrice
    c: number, //priceChange
    s: string, //symbol
    v: number, //volume
  }