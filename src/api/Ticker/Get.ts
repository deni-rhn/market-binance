import { IFetchData } from '@interfaces/IFetchData';

const baseUrl =
  import.meta.env.VITE_API_URL +
    `/api/${import.meta.env.VITE_API_VERSION_V3}` || '';

class GetTicker {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  public All = (): IFetchData => ({
    method: 'GET',
    uri: `${this.url}/ticker/24hr`,
  });
}

export default new GetTicker(baseUrl);
