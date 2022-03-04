import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';

import {
  addRequest,
  getAllQueriesRequest,
  getCustomerQueriesRequest,
  replyRequest,
  tagRequest,
} from './api';

import { Query, QueryInput, ReplyInput, TagInput } from './types';

export interface QueryState {
  queries: Array<Query>;
  loading: boolean;
  error: string | undefined;
}

const initialState: QueryState = {
  queries: [],
  loading: false,
  error: undefined,
};

export const getAllQueries = createAsyncThunk(
  'queries/getAllQueries',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllQueriesRequest();
      return response as Array<Query>;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getCustomerQueries = createAsyncThunk(
  'queries/getCustomerQueries',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await getCustomerQueriesRequest(id);
      return response as Array<Query>;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const add = createAsyncThunk(
  'queries/add',
  async (
    { title, subject, content }: QueryInput,
    { rejectWithValue, getState }
  ) => {
    try {
      const token = (getState() as RootState).session.token as string;
      const response = await addRequest(title, subject, content, token);
      return response as Query;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const reply = createAsyncThunk(
  'queries/reply',
  async ({ queryId, content }: ReplyInput, { rejectWithValue, getState }) => {
    try {
      const token = (getState() as RootState).session.token as string;
      const response = await replyRequest(queryId, content, token);
      return response as Query;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const tag = createAsyncThunk(
  'queries/tag',
  async ({ queryId, tags }: TagInput, { rejectWithValue, getState }) => {
    try {
      const token = (getState() as RootState).session.token as string;
      const response = await tagRequest(queryId, tags, token);
      return response as Query;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    resetQueries: (state) => {
      state.queries = [];
    },
    resetError: (state) => {
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllQueries.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getAllQueries.fulfilled, (state, action) => {
        state.loading = false;
        state.error = undefined;
        state.queries = action.payload;
      })
      .addCase(getAllQueries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getCustomerQueries.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getCustomerQueries.fulfilled, (state, action) => {
        state.loading = false;
        state.error = undefined;
        state.queries = action.payload;
      })
      .addCase(getCustomerQueries.rejected, (state, action) => {
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
        state.queries = [...state.queries, action.payload];
      })
      .addCase(add.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(reply.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(reply.fulfilled, (state, action) => {
        state.loading = false;
        state.error = undefined;
        state.queries = [
          ...state.queries.filter((q) => q._id !== action.payload._id),
          action.payload,
        ];
      })
      .addCase(reply.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(tag.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(tag.fulfilled, (state, action) => {
        state.loading = false;
        state.error = undefined;
        state.queries = [
          ...state.queries.filter((q) => q._id !== action.payload._id),
          action.payload,
        ];
      })
      .addCase(tag.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetQueries, resetError } = querySlice.actions;

export const selectQueries = (state: RootState) => state.query.queries;
export const selectLoading = (state: RootState) => state.query.loading;
export const selectError = (state: RootState) => state.query.error;

export default querySlice.reducer;
