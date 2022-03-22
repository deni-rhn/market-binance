import axios, { Canceler } from 'axios';
import { IFetchData } from '@interfaces/IFetchData';

export interface IDefaultHeaders {
  Accept: string;
  'Content-Type'?: string;
  Authorization?: string;
  'Accept-Language'?: string;
}

export const getAxiosConfig = ({
  method,
  uri,
  params,
  additionalHeader,
}: IFetchData) => {
  const defaultHeaders: IDefaultHeaders = {
    Accept: '*/*',
    'Accept-Language': 'en',
  };
  const url = uri;
  const headers = { ...defaultHeaders, ...additionalHeader };
  const dataOrParams = ['GET'].includes(method.toUpperCase())
    ? 'params'
    : 'data';
  const defaultConfig = { method, headers, url };
  const config = { ...defaultConfig, [dataOrParams]: params };
  return config;
};

export const CallAPI = ({
  method,
  uri,
  params,
  additionalHeader,
  cancel,
}: IFetchData) => {
  const CancelToken = axios.CancelToken;
  const config = getAxiosConfig({ method, uri, params, additionalHeader });
  return axios({
    ...config,
    cancelToken: new CancelToken(function executor(c: Canceler) {
      if (typeof cancel == 'function') {
        cancel(c);
      }
    }),
  });
};

export default CallAPI;
