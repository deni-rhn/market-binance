import { ITickers } from '@interfaces/Crypto/ITicker';

export const ConvertTicker = (data: ITickers[]): ITickers[] =>
  data?.map((item: ITickers) => ({
    ...item,
    lastPrice: Number(item.lastPrice).toFixed(3),
    volume: Number(item.volume).toFixed(2),
    quoteVolume: Number(item.quoteVolume).toFixed(2),
  }));
