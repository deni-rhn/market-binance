import { IFetchData } from '@interfaces/IFetchData';
import CallAPI from '@utils/CallAPI';
import GetAssets from './Get';

export const FetchAllAssets = async () => {
  const payload: IFetchData = GetAssets.All();

  try {
    const response = await CallAPI({ ...payload });
    return response.data.data;
  } catch (error: any) {
    const err = { ...error };
    return err;
  }
};
