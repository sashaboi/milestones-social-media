import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
  status: 'idle',
  error: null,
  users: [],
  loading: false,
  loggedinUser: {},
};

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async rejectWithValue => {
    try {
      const { data } = await axios.get('/api/users');
      return data.users;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const followUser = createAsyncThunk(
  'users/followUsers',
  async ({ token, userId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `/api/users/follow/${userId}`,
        {},

        { headers: { authorization: token } }
      );
      console.log('logging data from followuser response', data);
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
export const editProfile = createAsyncThunk(
  'posts/editProfile',
  async ({ token, profiledata }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `/api/users/edit`,
        profiledata,

        { headers: { authorization: token } }
      );
      console.log('data from api', data);
      return data.user;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);
export const SetloggedInUser = createAsyncThunk(
  'posts/loginUser',
  async (logindata, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/api/auth/login`, logindata);
      console.log('data from api', data);
      localStorage.setItem('token', data.encodedToken);

      return data.foundUser;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);
export const allUserSlice = createSlice({
  name: 'allUser',
  initialState,
  reducers: {},
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
        state.loggedinUser = action.payload.user;
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
        state.loggedinUser = action.payload.user;
      })
      .addCase(unFollowUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editProfile.pending, state => {
        state.loading = true;
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedinUser = action.payload;
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(SetloggedInUser.pending, state => {
        state.loading = true;
      })
      .addCase(SetloggedInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedinUser = action.payload;
      })
      .addCase(SetloggedInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default allUserSlice.reducer;
