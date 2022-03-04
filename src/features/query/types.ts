import { User } from '../session/types';
import { Tag } from '../tag/types';

export type Reply = {
  _id: string;
  content: string;
  by: User;
};

export type Query = {
  _id: string;
  customerId: string;
  customer: User;
  title: string;
  subject: string;
  content: string;
  replies: Array<Reply>;
  tags: Array<Tag>;
};

export type QueryInput = {
  title: string;
  subject: string;
  content: string;
};

export type ReplyInput = {
  queryId: string;
  content: string;
};

export type TagInput = {
  queryId: string;
  tags: Array<string>;
};

export type QueryError = {
  err: string;
};
