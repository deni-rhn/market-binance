import { FetchAllAssets } from '@api/Assets/Resolver';
import { FetchTicker } from '@api/Ticker/Resolver';
import { IAssets } from '@interfaces/Crypto/IAssets';
import { ITickers } from '@interfaces/Crypto/ITicker';
import { useQuery } from 'react-query';
import { ConvertTicker } from '../Helpers/ConvertTicket';
import { TopAssets } from '../Helpers/Model';

export const UseQueryAssets = () => {
  const { isLoading, data, refetch } = useQuery(
    'query-all-assets',
    async () => {
      return await FetchAllAssets();
    },
    {
      enabled: false,
    },
  );

  let dataSource: IAssets[] = [];
  if (data) {
    const prioData: IAssets[] = data.filter((item: IAssets) =>
      TopAssets.includes(item.assetCode),
    );
    const mergeData = [...prioData, ...data];
    dataSource = [
      ...new Map(mergeData.map((item) => [item['assetCode'], item])).values(),
    ];
  }

  return {
    isLoading,
    dataSource,
    getAllAssets: refetch,
  };
};

export const UseQueryTicker = () => {
  const { data, refetch } = useQuery(
    'query-ticker',
    async () => {
      return await FetchTicker();
    },
    {
      enabled: true,
      refetchInterval: 2000,
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: false,
    },
  );

  let tickerData: ITickers[] = [];
  if (data) {
    tickerData = ConvertTicker(data);
  }

  return {
    tickerData,
    getTicketData: refetch,
  };
};
