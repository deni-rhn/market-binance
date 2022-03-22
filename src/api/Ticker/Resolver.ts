import { IFetchData } from '@interfaces/IFetchData';
import CallAPI from '@utils/CallAPI';
import GetTicker from './Get';

export const FetchTicker = async () => {
  const payload: IFetchData = GetTicker.All();

  try {
    const response = await CallAPI({ ...payload });
    return response.data;
  } catch (error: any) {
    const err = { ...error };
    return err;
  }
};
