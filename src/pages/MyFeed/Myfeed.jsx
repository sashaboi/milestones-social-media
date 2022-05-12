import React from 'react';
import { PostCard } from '../../components/PostCard/PostCard';
import './myfeed.css';
export const Myfeed = () => {
  return (
    <div className="feed-parent">
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
    </div>
  );
};
