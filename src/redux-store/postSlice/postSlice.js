import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import dayjs from 'dayjs';

const initialState = {
  status: 'idle',
  error: null,
  posts: [],
  loading: true,
};
export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async rejectWithValue => {
    try {
      const { data } = await axios.get('/api/posts');
      console.log(data, 'data from post slice api call');
      return data.posts;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const likeVideo = createAsyncThunk(
  'posts/likeVideo',
  async ({ token, postid }, { rejectWithValue }) => {
    console.log('token :', token, 'postid : ', postid);
    try {
      const { data } = await axios.post(
        `api/posts/like/${postid}`,
        {},

        { headers: { authorization: token } }
      );
      console.log(data);
      return data.posts;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);
export const dislikeVideo = createAsyncThunk(
  'posts/dislikeVideo',
  async ({ token, postid }, { rejectWithValue }) => {
    console.log('token :', token, 'postid : ', postid);
    try {
      const { data } = await axios.post(
        `api/posts/dislike/${postid}`,
        {},

        { headers: { authorization: token } }
      );
      console.log(data);
      return data.posts;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);
export const upvoteComment = createAsyncThunk(
  'posts/upvoteComment',
  async ({ token, postid, commentid }, { rejectWithValue }) => {
    console.log('token :', token, 'postid : ', postid);
    try {
      const { data } = await axios.post(
        `/api/comments/upvote/${postid}/${commentid}`,
        {},

        { headers: { authorization: token } }
      );
      console.log(data);
      return data.posts;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);
export const downvoteComment = createAsyncThunk(
  'posts/downvoteComment',
  async ({ token, postid, commentid }, { rejectWithValue }) => {
    console.log('token :', token, 'postid : ', postid);
    try {
      const { data } = await axios.post(
        `/api/comments/downvote/${postid}/${commentid}`,
        {},

        { headers: { authorization: token } }
      );
      console.log(data);
      return data.posts;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);
export const editPost = createAsyncThunk(
  'posts/editPost',
  async ({ token, finalpostdata, postid }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `/api/posts/edit/${postid}`,
        { postData: finalpostdata },

        { headers: { authorization: token } }
      );
      console.log(data);
      return data.posts;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);
export const addPost = createAsyncThunk(
  'posts/addPost',
  async ({ token, postcontent }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `/api/posts`,
        { postData: postcontent },

        { headers: { authorization: token } }
      );
      console.log(data);
      return data.posts;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);
export const addComment = createAsyncThunk(
  'posts/addComment',
  async ({ token, postcontent, postid }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `/api/comments/add/${postid}`,
        { commentData: postcontent },

        { headers: { authorization: token } }
      );
      console.log(data);
      return data.posts;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    sortbylikes: state => {
      console.log('reached reducer');
      state.posts.sort(function (a, b) {
        return b.likes.likeCount - a.likes.likeCount;
      });
    },
    sortbydate: state => {
      console.log('reached date reducer');
      state.posts.sort(function (a, b) {
        return dayjs(a.createdAt).isBefore(dayjs(b.createdAt)) ? 1 : -1;
      });
    },
    sortbycomments: state => {
      state.posts.sort(function (a, b) {
        return b.comments.length - a.comments.length;
      });
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getPosts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(likeVideo.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(likeVideo.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(likeVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(dislikeVideo.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(dislikeVideo.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(dislikeVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(upvoteComment.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(upvoteComment.fulfilled, (state, action) => {
        console.log(action);
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(upvoteComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(downvoteComment.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(downvoteComment.fulfilled, (state, action) => {
        console.log(action);
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(downvoteComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editPost.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editPost.fulfilled, (state, action) => {
        console.log(action);
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(editPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addPost.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        console.log(action);
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(addPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addComment.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        console.log(action);
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { sortbylikes, sortbydate, sortbycomments } = postSlice.actions;

export default postSlice.reducer;
