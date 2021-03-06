import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';
import { UserEditInput } from '../user/types';
import { editRequest, loginRequest, removeRequest, signupRequest } from './api';
import {
  User,
  UserLoginInput,
  UserLoginResponse,
  UserSignupInput,
  UserSignupResponse,
} from './types';

export interface SessionState {
  user: User | undefined;
  token: string | undefined;
  loading: boolean;
  error: string | undefined;
}

const initialState: SessionState = {
  user: undefined,
  token: undefined,
  loading: false,
  error: undefined,
};

export const login = createAsyncThunk(
  'session/login',
  async ({ email, password }: UserLoginInput, { rejectWithValue }) => {
    try {
      const response = await loginRequest(email, password);
      return response as UserLoginResponse;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const signup = createAsyncThunk(
  'session/signup',
  async (values: UserSignupInput, { rejectWithValue }) => {
    try {
      const response = await signupRequest({ ...values });
      return response as UserSignupResponse;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const edit = createAsyncThunk(
  'session/edit',
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
  'session/remove',
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

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    resetUser: (state) => {
      state.user = undefined;
      state.token = undefined;
    },
    resetError: (state) => {
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = undefined;
        state.user = action.payload.user as User;
        state.token = action.payload.token as string;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.error = undefined;
        state.user = action.payload.user as User;
        state.token = action.payload.token as string;
      })
      .addCase(signup.rejected, (state, action) => {
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
        state.user = action.payload;
      })
      .addCase(edit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(remove.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(remove.fulfilled, (state) => {
        state.loading = false;
        state.error = undefined;
        state.user = undefined;
        state.token = undefined;
      })
      .addCase(remove.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetUser, resetError } = sessionSlice.actions;

export const selectUser = (state: RootState) => state.session.user;
export const selectToken = (state: RootState) => state.session.token;
export const selectLoading = (state: RootState) => state.session.loading;
export const selectError = (state: RootState) => state.session.error;

export default sessionSlice.reducer;
