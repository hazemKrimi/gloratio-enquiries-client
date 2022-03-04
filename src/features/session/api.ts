import axios, { AxiosError } from 'axios';

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
