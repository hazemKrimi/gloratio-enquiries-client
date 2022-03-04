import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';

import {
  addRequest,
  editRequest,
  getAllUsersRequest,
  removeRequest,
} from './api';

import { User } from '../session/types';
import { UserAddInput, UserAddResponse, UserEditInput } from './types';

export interface UserState {
  users: Array<User>;
  loading: boolean;
  error: string | undefined;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: undefined,
};

export const getAllUsers = createAsyncThunk(
  'users/getAllUsers',
  async (_, { rejectWithValue, getState }) => {
    try {
      const currentUser = (getState() as RootState).session.user as User;
      const response = await getAllUsersRequest();
      return (response as Array<User>).filter((u) => u._id !== currentUser._id);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const add = createAsyncThunk(
  'users/add',
  async (values: UserAddInput, { rejectWithValue, getState }) => {
    try {
      const token = (getState() as RootState).session.token as string;
      const response = await addRequest({ ...values }, token);
      return response as UserAddResponse;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const edit = createAsyncThunk(
  'users/edit',
  async (values: UserEditInput, { rejectWithValue, getState }) => {
    try {
      const token = (getState() as RootState).session.token as string;
      const response = await editRequest(values, token);
      return response as User;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const remove = createAsyncThunk(
  'users/remove',
  async (id: string, { rejectWithValue, getState }) => {
    try {
      const token = (getState() as RootState).session.token as string;
      const response = await removeRequest(id, token);
      return response as User;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUsers: (state) => {
      state.users = [];
    },
    resetError: (state) => {
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = undefined;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
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
        state.users = [...state.users, action.payload.user];
      })
      .addCase(add.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(edit.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(edit.fulfilled, (state, action) => {
        state.loading = false;
        state.error = undefined;
        state.users = [
          ...state.users.filter((u) => u._id !== action.payload._id),
          action.payload,
        ];
      })
      .addCase(edit.rejected, (state, action) => {
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
        state.users = [
          ...state.users.filter((u) => u._id !== action.payload._id),
        ];
      })
      .addCase(remove.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetUsers, resetError } = userSlice.actions;

export const selectUsers = (state: RootState) => state.user.users;
export const selectLoading = (state: RootState) => state.user.loading;
export const selectError = (state: RootState) => state.user.error;

export default userSlice.reducer;
