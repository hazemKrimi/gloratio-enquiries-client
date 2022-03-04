export type User = {
  _id: string;
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

export type UserLoginInput = {
  email: string;
  password: string;
};

export type UserLoginResponse = {
  user: User;
  token: string;
};

export type UserSignupInput = {
  email: string;
  password: string;
};

export type UserSignupResponse = {
  user: User;
  token: string;
};

export type UserError = {
  err: string;
};
