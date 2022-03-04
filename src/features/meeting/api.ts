import axios, { AxiosError } from 'axios';

import { MeetingError, MeetingInput } from './types';

export const getAllMeetingsRequest = async () => {
  try {
    return (await axios.get(`${process.env.REACT_APP_SERVER}/meetings`)).data;
  } catch (err) {
    let error: AxiosError<MeetingError> = err as AxiosError;

    throw error?.response?.data.err;
  }
};

export const addRequest = async (values: MeetingInput, token: string) => {
  try {
    return (
      await axios.post(
        `${process.env.REACT_APP_SERVER}/meetings`,
        {
          ...values,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
    ).data;
  } catch (err) {
    let error: AxiosError<MeetingError> = err as AxiosError;

    throw error?.response?.data.err;
  }
};
