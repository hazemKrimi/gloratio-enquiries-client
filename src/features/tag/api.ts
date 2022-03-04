import axios, { AxiosError } from 'axios';

import { TagError } from './types';

export const getAllTagsRequest = async () => {
  try {
    return (await axios.get(`${process.env.REACT_APP_SERVER}/tags`)).data;
  } catch (err) {
    let error: AxiosError<TagError> = err as AxiosError;

    throw error?.response?.data.err;
  }
};

export const addRequest = async (name: string, token: string) => {
  try {
    return (
      await axios.post(
        `${process.env.REACT_APP_SERVER}/tags`,
        {
          name,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
    ).data;
  } catch (err) {
    let error: AxiosError<TagError> = err as AxiosError;

    throw error?.response?.data.err;
  }
};

export const removeRequest = async (id: string, token: string) => {
  try {
    return (
      await axios.delete(`${process.env.REACT_APP_SERVER}/tags/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
    ).data;
  } catch (err) {
    let error: AxiosError<TagError> = err as AxiosError;

    throw error?.response?.data.err;
  }
};
