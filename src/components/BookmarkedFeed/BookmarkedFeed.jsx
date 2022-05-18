import React from 'react';
// import { useUser } from '../../context/User-context';
import { PostCard } from '../../components/PostCard/PostCard';
import { useSelector } from 'react-redux';
export const BookmarkedFeed = () => {
  const state = useSelector(state => state.allUsers);
  return (
    <div className="feed-parent">
      {state.loggedinUser.bookmarks.map(obj => (
        <PostCard key={obj._id} post={obj} />
      ))}
    </div>
  );
};
