import React from 'react';
import { useUser } from '../../context/User-context';
import { PostCard } from '../../components/PostCard/PostCard';

export const BookmarkedFeed = () => {
  const { userObj } = useUser();
  return (
    <div className="feed-parent">
      {userObj.bookmarks.map(obj => (
        <PostCard key={obj._id} post={obj} />
      ))}
    </div>
  );
};
