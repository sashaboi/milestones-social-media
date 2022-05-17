import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
  status: 'idle',
  error: null,
  users: [],
  loading: true,
  loggedinUser: {},
};

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async rejectWithValue => {
    try {
      const { data } = await axios.get('/api/users');
      console.log(data);
      return data.users;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const followUser = createAsyncThunk(
  'users/followUsers',
  async ({ token, userId }, { rejectWithValue }) => {
    console.log(token, userId);
    try {
      const { data } = await axios.post(
        `/api/users/follow/${userId}`,
        {},

        { headers: { authorization: token } }
      );
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);
export const unFollowUser = createAsyncThunk(
  'users/unfollowUsers',
  async ({ token, userId }, { rejectWithValue }) => {
    console.log(token, userId);
    try {
      const { data } = await axios.post(
        `/api/users/unfollow/${userId}`,
        {},

        { headers: { authorization: token } }
      );
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);
export const allUserSlice = createSlice({
  name: 'allUser',
  initialState,
  reducers: {
    SetloggedInUser: (state, action) => {
      state.loggedinUser = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getUsers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(followUser.pending, state => {
        state.loading = true;
      })
      .addCase(followUser.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedinUser = action.payload;
      })
      .addCase(followUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(unFollowUser.pending, state => {
        state.loading = true;
      })
      .addCase(unFollowUser.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedinUser = action.payload;
      })
      .addCase(unFollowUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { SetloggedInUser } = allUserSlice.actions;

export default allUserSlice.reducer;
