export type Meeting = {
  _id: string;
  date: Date;
  subject: string;
  notes: string;
};

export type MeetingInput = {
  date: Date;
  subject: string;
  notes: string;
};

export type MeetingError = {
  err: string;
};
