export interface IFetchData {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS';
  uri: string;
  params?: any;
  body?: any;
  callback?: any;
  additionalHeader?: any;
  baseUrl?: string;
  acceptLanguage?: string;
  cancel?: Function;
}
