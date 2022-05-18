import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { PostCard } from '../../components/PostCard/PostCard';
export const UserFeed = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (token === null) {
      navigate('/auth/login');
    }
  }, [token]);
  const fullstore = useSelector(state => state);

  const UserPostState = fullstore.posts.posts.filter(
    obj => obj.username === fullstore.allUsers.loggedinUser.username
  );

  return (
    <div className="feed-parent">
      {UserPostState.map(obj => (
        <PostCard key={obj._id} post={obj} />
      ))}
    </div>
  );
};
