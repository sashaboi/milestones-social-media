import React from 'react';
import './postcard.css';

import { FaRegComment } from 'react-icons/fa';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { UsePost } from '../../context/Post-context';
import { useUser } from '../../context/User-context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../context/Modal-context';

export const PostCard = ({ post }) => {
  const { setShowModal } = useModal();
  const navigate = useNavigate();
  const { userObj, setUserObj } = useUser();
  if (userObj === undefined) {
    navigate('/auth/login');
  }
  const { dispatch, setLocalComments } = UsePost();
  const hasliked = post.likes.likedBy.some(obj => obj._id === userObj._id);
  const token = localStorage.getItem('token');
  if (token === null) {
    navigate('/auth/login');
  }
  const header = { headers: { authorization: token } };
  const LikePostHandler = () => {
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

  const CommentClickHandler = post => {
    setLocalComments(post);
    console.log('this is the post we want to show the comments of:', post);

    setShowModal(true);
  };
  const addToBookmarkHandler = () => {
    axios.post(`/api/users/bookmark/${post._id}`, {}, header).then(
      response => {
        console.log(response);

        const newUserObj = { ...userObj };
        newUserObj.bookmarks = response.data.bookmarks;
        setUserObj(newUserObj);
      },
      error => {
        console.log(error);
      }
    );
  };
  const removeFromBookmarkHandler = () => {
    axios.post(`/api/users/remove-bookmark/${post._id}`, {}, header).then(
      response => {
        console.log(response);

        const newUserObj = { ...userObj };
        newUserObj.bookmarks = response.data.bookmarks;
        setUserObj(newUserObj);
      },
      error => {
        console.log(error);
      }
    );
  };
  return (
    <div className="post-card-parent">
      <div className="post-top-content">
        <div className="profile-data">
          <img src="" alt="profile pic" />
          <div className="username-holder">{post.username}</div>
        </div>
        <div className="post-content">{post.content}</div>
        <div className="bookmark-icon">
          {userObj.bookmarks.some(obj => obj._id === post._id) ? (
            <div onClick={() => removeFromBookmarkHandler()}>
              <BsBookmarkFill />
            </div>
          ) : (
            <div onClick={() => addToBookmarkHandler()}>
              <BsBookmark />
            </div>
          )}
        </div>
      </div>
      <div className="post-bottom-content">
        <div
          onClick={() => LikePostHandler()}
          className="post-like-button post-btn"
        >
          {hasliked ? <AiFillLike /> : <AiOutlineLike />}

          {post.likes.likeCount}
        </div>
        <div
          onClick={() => CommentClickHandler(post)}
          className="post-comment-button post-btn"
        >
          <FaRegComment />
          {post.comments.length}
        </div>
      </div>
      <div className="comments-section">
        {post.comments.slice(0, 3).map(obj => (
          <div className="comment-container" key={obj.id}>
            <p>{obj.username}</p>
            <p>{obj.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
