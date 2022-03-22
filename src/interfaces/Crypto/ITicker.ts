export interface ITickers {
  symbol: string;
  priceChange: string;
  priceChangePercent: string;
  weightedAvgPrice: string;
  prevClosePrice: string;
  lastPrice: string | number;
  lastQty: string;
  bidPrice: string;
  bidQty: string;
  askPrice: string;
  askQty: string;
  openPrice: string;
  highPrice: string;
  lowPrice: string;
  volume: string | number;
  quoteVolume: string | number;
  openTime: number;
  closeTime: number;
  firstId: number;
  lastId: number;
  count: number;
}
