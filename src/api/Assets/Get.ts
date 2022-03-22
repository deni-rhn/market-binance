import { IFetchData } from '@interfaces/IFetchData';

const baseUrl =
  import.meta.env.VITE_API_URL +
    `/bapi/asset/${import.meta.env.VITE_API_VERSION_V2}` || '';

class GetAssets {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  public All = (): IFetchData => ({
    method: 'GET',
    uri: `${this.url}/public/asset/asset/get-all-asset`,
  });
}

export default new GetAssets(baseUrl);
