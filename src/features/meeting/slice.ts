import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';

import { addRequest, getAllMeetingsRequest } from './api';

import { Meeting, MeetingInput } from './types';

export interface MeetingState {
  meetings: Array<Meeting>;
  loading: boolean;
  error: string | undefined;
}

const initialState: MeetingState = {
  meetings: [],
  loading: false,
  error: undefined,
};

export const getAllMeetings = createAsyncThunk(
  'meetings/getAllMeetings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllMeetingsRequest();
      return response as Array<Meeting>;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const add = createAsyncThunk(
  'meetings/add',
  async (values: MeetingInput, { rejectWithValue, getState }) => {
    try {
      const token = (getState() as RootState).session.token as string;
      const response = await addRequest({ ...values }, token);
      return response as Meeting;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const meetingSlice = createSlice({
  name: 'meeting',
  initialState,
  reducers: {
    resetMeetings: (state) => {
      state.meetings = [];
    },
    resetError: (state) => {
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllMeetings.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getAllMeetings.fulfilled, (state, action) => {
        state.loading = false;
        state.error = undefined;
        state.meetings = action.payload;
      })
      .addCase(getAllMeetings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(add.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(add.fulfilled, (state, action) => {
        state.loading = false;
        state.error = undefined;
        state.meetings = [...state.meetings, action.payload];
      })
      .addCase(add.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetMeetings, resetError } = meetingSlice.actions;

export const selectMeetings = (state: RootState) => state.meeting.meetings;
export const selectLoading = (state: RootState) => state.meeting.loading;
export const selectError = (state: RootState) => state.meeting.error;

export default meetingSlice.reducer;
