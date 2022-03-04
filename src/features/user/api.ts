import axios, { AxiosError } from 'axios';

import { UserError } from '../session/types';
import { UserAddInput, UserEditInput } from './types';

export const getAllUsersRequest = async () => {
  try {
    return (await axios.get(`${process.env.REACT_APP_SERVER}/users`)).data;
  } catch (err) {
    let error: AxiosError<UserError> = err as AxiosError;

    throw error?.response?.data.err;
  }
};

export const addRequest = async (values: UserAddInput, token: string) => {
  try {
    return (
      await axios.post(
        `${process.env.REACT_APP_SERVER}/tags`,
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
    let error: AxiosError<UserError> = err as AxiosError;

    throw error?.response?.data.err;
  }
};

export const editRequest = async (
  { id, ...values }: UserEditInput,
  token: string
) => {
  try {
    return (
      await axios.put(
        `${process.env.REACT_APP_SERVER}/users/${id}`,
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
    let error: AxiosError<UserError> = err as AxiosError;

    throw error?.response?.data.err;
  }
};

export const removeRequest = async (id: string, token: string) => {
  try {
    return (
      await axios.delete(`${process.env.REACT_APP_SERVER}/users/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
    ).data;
  } catch (err) {
    let error: AxiosError<UserError> = err as AxiosError;

    throw error?.response?.data.err;
  }
};
