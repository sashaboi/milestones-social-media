import React from 'react';
import './postcard.css';

import { FaRegComment, FaRegHeart } from 'react-icons/fa';
import { UsePost } from '../../context/Post-context';
import { UseUser } from '../../context/User-context';
import axios from 'axios';

export const PostCard = ({ post }) => {
  const { userObj } = UseUser();
  const { dispatch } = UsePost();
  const LikePostHandler = () => {
    const hasliked = post.likes.likedBy.some(obj => obj._id === userObj._id);
    const token = localStorage.getItem('token');
    const header = { headers: { authorization: token } };
    if (hasliked) {
      console.log('dislike');
      axios.post(`api/posts/dislike/${post._id}`, {}, header).then(
        response => {
          console.log('dislike response', response.data.posts);
          dispatch({ type: 'LOAD_POSTS', payload: response.data.posts });
        },
        error => {
          console.log(error.response.data.message);
        }
      );
    } else {
      console.log('like');
      axios.post(`api/posts/like/${post._id}`, {}, header).then(
        response => {
          dispatch({ type: 'LOAD_POSTS', payload: response.data.posts });
        },
        error => {
          console.log(error.response.data.message);
        }
      );
    }
  };

  return (
    <div className="post-card-parent">
      <div className="post-top-content">
        <div className="profile-data">
          <img src="" alt="profile pic" />
          <div className="username-holder">{post.username}</div>
        </div>
        <div className="post-content">{post.content}</div>
      </div>
      <div className="post-bottom-content">
        <div
          onClick={() => LikePostHandler()}
          className="post-like-button post-btn"
        >
          <FaRegHeart />
          {post.likes.likeCount}
        </div>
        <div className="post-comment-button post-btn">
          <FaRegComment />
          {post.comments.length}
        </div>
      </div>
    </div>
  );
};
