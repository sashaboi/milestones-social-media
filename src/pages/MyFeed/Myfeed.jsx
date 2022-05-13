import React from 'react';
import { PostCard } from '../../components/PostCard/PostCard';
import { UsePost } from '../../context/Post-context';
import './myfeed.css';
export const Myfeed = () => {
  const { state } = UsePost();

  return (
    <div className="feed-parent">
      {state.map(obj => (
        <PostCard key={obj._id} post={obj} />
      ))}
    </div>
  );
};
