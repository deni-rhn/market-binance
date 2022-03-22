import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Heading,
  Flex,
  Image,
  Text,
} from '@chakra-ui/react';
import HomePageFilter from './Partials/Filter';
import { useEffect, useState } from 'react';
import { UseQueryAssets, UseQueryTicker } from './Repositories';
import { IAssets } from '@interfaces/Crypto/IAssets';
import { ITickers } from '@interfaces/Crypto/ITicker';
import Thousand from '@utils/Thousand';
import { ValueAliases } from '@utils/ValueAliases';
import Pagination from 'rc-pagination';
import { IMarketFilterProps } from './Types/Props';

const HomePage: React.FC = () => {
  const [marketList, setMarketList] = useState<IAssets[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isShowPagination, setIsShowPagination] = useState<boolean>(true);
  const { dataSource, getAllAssets } = UseQueryAssets();
  const { tickerData } = UseQueryTicker();

  const initData = () => {
    const defautlData: IAssets[] = dataSource.filter(
      (_it: IAssets, idx: number) => idx < 20,
    );
    setMarketList(defautlData);
  };

  useEffect(() => {
    getAllAssets();
  }, []);

  useEffect(() => {
    dataSource.length > 0 && initData();
  }, [dataSource.length]);

  const renderValue = (code: string, returnKey: string) => {
    switch (returnKey) {
      case 'PRICE':
        if (tickerData) {
          const tickerItem = tickerData.find(
            (item: ITickers) => item.symbol === code + 'USDT',
          );
          const isRed =
            Number(tickerItem?.lastPrice) < Number(tickerItem?.prevClosePrice);
          return (
            <Text color={isRed ? '#CF304A' : '#03A66D'}>
              ${tickerItem?.lastPrice ? Thousand(tickerItem.lastPrice) : '-'}
            </Text>
          );
        }
        break;
      case '24H_CHANGE':
        if (tickerData) {
          const tickerItem = tickerData.find(
            (item: ITickers) => item.symbol === code + 'USDT',
          );
          const isMinus = tickerItem?.priceChangePercent.includes('-');
          return (
            <Text color={isMinus ? '#CF304A' : '#03A66D'}>
              {tickerItem?.priceChangePercent
                ? tickerItem.priceChangePercent
                : '-'}
              %
            </Text>
          );
        }
        break;
      case '24H_VOLUME':
        if (tickerData) {
          const tickerItem = tickerData.find(
            (item: ITickers) => item.symbol === code + 'USDT',
          );
          return tickerItem?.volume ? ValueAliases(tickerItem.volume) : '-';
        }
        break;
    }

    return '-';
  };

  const onChangePage = (current: number) => {
    setPage(current);
    if (current > 1 && dataSource) {
      const idxStart = (current - 1) * 20;
      const idxEnd = current * 20 - 1;
      const filterData = dataSource.filter(
        (_item: IAssets, idx: number) => idx >= idxStart && idx <= idxEnd,
      );
      setMarketList(filterData);
    } else {
      initData();
    }
  };

  const onFilterTags = (tag: string) => {
    if (tag !== 'all') {
      setIsShowPagination(false);
      const filterTags = dataSource.filter((item: IAssets) =>
        item.tags.includes(tag),
      );
      setMarketList(filterTags);
    } else {
      setIsShowPagination(true);
      initData();
    }
  };

  const onSearch = (e: any) => {
    const value = e.target.value;
    if (value) {
      setIsShowPagination(false);
      let searchResult = [];
      const searchData = dataSource.filter((item: IAssets) =>
        item.assetCode.toLowerCase().includes(value),
      );
      if (searchResult.length > 0) {
        searchResult = searchData;
      } else {
        searchResult = dataSource.filter((item: IAssets) =>
          item.assetName.toLowerCase().includes(value),
        );
      }
      setMarketList(searchResult);
    } else {
      setIsShowPagination(true);
      initData();
    }
  };

  const paginationProps = {
    current: page,
    total: dataSource.length,
    defaultPageSize: 20,
    pageSize: 20,
    onChange: onChangePage,
  };

  const filterProps: IMarketFilterProps = {
    onFilterTags,
    onSearch,
  };

  return (
    <Box padding={'0 10%'} mt={4} mb={8}>
      <Heading mb={3}>Coin Markets</Heading>
      <HomePageFilter {...filterProps} />
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Price</Th>
            <Th textAlign="end">24h Change</Th>
            <Th textAlign="end">24h Volume</Th>
          </Tr>
        </Thead>
        <Tbody>
          {marketList.map((asset: IAssets, idx: number) => (
            <Tr key={idx}>
              <Td>
                <Flex>
                  <Image
                    h={'25px'}
                    w={'25px'}
                    src={asset.logoUrl}
                    fallbackSrc={
                      'https://cdn.pixabay.com/photo/2012/04/24/12/29/no-symbol-39767_640.png'
                    }
                    alt={asset.assetName}
                  />
                  <Heading fontSize={'20px'} pl={'10px'} mt={'1px'}>
                    {asset.assetCode}
                  </Heading>
                  <Text
                    fontSize={'12px'}
                    color={'#707A8A'}
                    pl={'10px'}
                    mt={'4px'}
                  >
                    {asset.assetName}
                  </Text>
                </Flex>
              </Td>
              <Td>{renderValue(asset.assetCode, 'PRICE')}</Td>
              <Td textAlign="end">
                {renderValue(asset.assetCode, '24H_CHANGE')}
              </Td>
              <Td textAlign="end">
                {renderValue(asset.assetCode, '24H_VOLUME')}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {isShowPagination && (
        <Box mt={6} textAlign={'end'}>
          <Pagination {...paginationProps} />
        </Box>
      )}
    </Box>
  );
};

export default HomePage;
