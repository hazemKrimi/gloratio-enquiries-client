import axios, { AxiosError } from 'axios';

import { QueryError } from './types';

export const getAllQueriesRequest = async () => {
  try {
    return (await axios.get(`${process.env.REACT_APP_SERVER}/queries`)).data;
  } catch (err) {
    let error: AxiosError<QueryError> = err as AxiosError;

    throw error?.response?.data.err;
  }
};

export const getCustomerQueriesRequest = async (id: string) => {
  try {
    return (
      await axios.get(`${process.env.REACT_APP_SERVER}/queries/customer/${id}`)
    ).data;
  } catch (err) {
    let error: AxiosError<QueryError> = err as AxiosError;

    throw error?.response?.data.err;
  }
};

export const addRequest = async (
  title: string,
  subject: string,
  content: string,
  token: string
) => {
  try {
    return (
      await axios.post(
        `${process.env.REACT_APP_SERVER}/queries`,
        {
          title,
          subject,
          content,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
    ).data;
  } catch (err) {
    let error: AxiosError<QueryError> = err as AxiosError;

    throw error?.response?.data.err;
  }
};

export const replyRequest = async (
  queryId: string,
  content: string,
  token: string
) => {
  try {
    return (
      await axios.put(
        `${process.env.REACT_APP_SERVER}/queries/${queryId}/reply`,
        {
          content,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
    ).data;
  } catch (err) {
    let error: AxiosError<QueryError> = err as AxiosError;

    throw error?.response?.data.err;
  }
};

export const tagRequest = async (
  queryId: string,
  tags: Array<string>,
  token: string
) => {
  try {
    return (
      await axios.put(
        `${process.env.REACT_APP_SERVER}/queries/${queryId}/tag`,
        {
          tags,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
    ).data;
  } catch (err) {
    let error: AxiosError<QueryError> = err as AxiosError;

    throw error?.response?.data.err;
  }
};
