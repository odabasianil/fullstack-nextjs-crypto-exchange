export interface WalletModel {
    symbol: string;
    free: number;
    locked: number;
    estimadedUSD: number;
    change24H: number;
    total: number;
    lastPrice: number;
}