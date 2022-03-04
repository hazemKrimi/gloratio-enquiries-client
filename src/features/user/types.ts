import { User } from '../session/types';

export type UserAddResponse = {
  user: User;
  token: string;
};

export type UserAddInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  zip: number;
  role: 'user' | 'customer' | 'admin';
};

export type UserEditInput = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  zip: number;
  role: 'user' | 'customer' | 'admin';
};
