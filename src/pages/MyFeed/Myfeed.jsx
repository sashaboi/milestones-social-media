import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PostCard } from '../../components/PostCard/PostCard';
import { BiTrendingUp, BiLike } from 'react-icons/bi';
import { MdOutlineWatchLater } from 'react-icons/md';
import {
  sortbylikes,
  sortbydate,
  sortbycomments,
} from '../../redux-store/postSlice/postSlice';
import './myfeed.css';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

export const Myfeed = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.posts);
  const localPosts = [...state.posts];
  console.log('my feed rerendered');
  let sortedData = [];
  switch (state.sortBy) {
    case 'likes':
      sortedData = localPosts.sort(function (a, b) {
        return b.likes.likeCount - a.likes.likeCount;
      });
      break;
    case 'recent':
      sortedData = localPosts.sort(function (a, b) {
        return dayjs(a.createdAt).isBefore(dayjs(b.createdAt)) ? 1 : -1;
      });
      break;
    case 'comments':
      sortedData = localPosts.sort(function (a, b) {
        return b.comments.length - a.comments.length;
      });
      break;

    default:
      sortedData = localPosts;
  }

  return (
    <div className="feed-parent">
      <div className="categories-container">
        <p>Sort by:</p>
        <button
          onClick={() => {
            dispatch(sortbylikes());
            toast.info('Sorting by likes', {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }}
          className={`category-options ${
            state.sortBy === 'likes' && 'selected'
          }`}
        >
          <BiTrendingUp />
          Trending
        </button>
        <button
          onClick={() => {
            dispatch(sortbydate());
            toast.info('Sorting by Date', {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }}
          className={`category-options ${
            state.sortBy === 'recent' && 'selected'
          }`}
        >
          <MdOutlineWatchLater />
          Recent
        </button>
        <button
          onClick={() => {
            dispatch(sortbycomments());
            toast.info('Sorting by Popular', {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }}
          className={`category-options ${
            state.sortBy === 'comments' && 'selected'
          }`}
        >
          <BiLike />
          Most commented
        </button>
      </div>
      <hr />
      <div className="posts-container">
        {sortedData.map(obj => (
          <PostCard key={obj._id} post={obj} />
        ))}
      </div>
    </div>
  );
};
