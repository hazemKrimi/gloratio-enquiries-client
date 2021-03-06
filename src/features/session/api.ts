import axios, { AxiosError } from 'axios';
import { UserEditInput } from '../user/types';

import { UserError, UserSignupInput } from './types';

export const loginRequest = async (email: string, password: string) => {
  try {
    return (
      await axios.post(`${process.env.REACT_APP_SERVER}/users/login`, {
        email,
        password,
      })
    ).data;
  } catch (err) {
    let error: AxiosError<UserError> = err as AxiosError;

    throw error?.response?.data.err;
  }
};

export const signupRequest = async (values: UserSignupInput) => {
  try {
    return (
      await axios.post(`${process.env.REACT_APP_SERVER}/users/signup`, {
        ...values,
      })
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
