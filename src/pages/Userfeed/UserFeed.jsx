import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { PostCard } from '../../components/PostCard/PostCard';
import { UsePost } from '../../context/Post-context';
import { useUser } from '../../context/User-context';
export const UserFeed = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (token === null) {
      navigate('/auth/login');
    }
  }, [token]);
  const { userObj } = useUser();
  const { state } = UsePost();
  const UserPostState = state.filter(obj => obj.username === userObj.username);

  return (
    <div className="feed-parent">
      {UserPostState.map(obj => (
        <PostCard key={obj._id} post={obj} />
      ))}
    </div>
  );
};
