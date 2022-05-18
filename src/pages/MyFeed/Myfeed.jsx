import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PostCard } from '../../components/PostCard/PostCard';
import { BiTrendingUp, BiLike } from 'react-icons/bi';
import { MdOutlineWatchLater } from 'react-icons/md';
import { sortbylikes, sortbydate } from '../../redux-store/postSlice/postSlice';
import './myfeed.css';
// import LoadingSpin from 'react-loading-spin';
export const Myfeed = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.posts);
  console.log('my feed rerendered');
  // const userState = useSelector(state => state.allUsers);
  return (
    <div className="feed-parent">
      <div className="categories-container">
        <p>Sort by:</p>
        <button
          onClick={() => dispatch(sortbylikes())}
          className="category-options "
        >
          <BiTrendingUp />
          Trending
        </button>
        <button
          onClick={() => dispatch(sortbydate())}
          className="category-options"
        >
          <MdOutlineWatchLater />
          Recent
        </button>
        <button className="category-options">
          <BiLike />
          Most Liked
        </button>
      </div>
      <hr />
      <div className="posts-container">
        {state.posts.map(obj => (
          <PostCard key={obj._id} post={obj} />
        ))}
      </div>
    </div>
  );
};
