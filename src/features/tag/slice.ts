import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';

import { addRequest, getAllTagsRequest, removeRequest } from './api';

import { Tag } from './types';

export interface TagState {
  tags: Array<Tag>;
  loading: boolean;
  error: string | undefined;
}

const initialState: TagState = {
  tags: [],
  loading: false,
  error: undefined,
};

export const getAllTags = createAsyncThunk(
  'tags/getAllTags',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllTagsRequest();
      return response as Array<Tag>;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const add = createAsyncThunk(
  'tags/add',
  async (name: string, { rejectWithValue, getState }) => {
    try {
      const token = (getState() as RootState).session.token as string;
      const response = await addRequest(name, token);
      return response as Tag;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const remove = createAsyncThunk(
  'tags/remove',
  async (id: string, { rejectWithValue, getState }) => {
    try {
      const token = (getState() as RootState).session.token as string;
      const response = await removeRequest(id, token);
      return response as Tag;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const tagSlice = createSlice({
  name: 'tag',
  initialState,
  reducers: {
    resetTags: (state) => {
      state.tags = [];
    },
    resetError: (state) => {
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTags.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getAllTags.fulfilled, (state, action) => {
        state.loading = false;
        state.error = undefined;
        state.tags = action.payload;
      })
      .addCase(getAllTags.rejected, (state, action) => {
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
        state.tags = [...state.tags, action.payload];
      })
      .addCase(add.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(remove.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(remove.fulfilled, (state, action) => {
        state.loading = false;
        state.error = undefined;
        state.tags = [
          ...state.tags.filter((t) => t._id !== action.payload._id),
        ];
      })
      .addCase(remove.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetTags, resetError } = tagSlice.actions;

export const selectTags = (state: RootState) => state.tag.tags;
export const selectLoading = (state: RootState) => state.tag.loading;
export const selectError = (state: RootState) => state.tag.error;

export default tagSlice.reducer;
