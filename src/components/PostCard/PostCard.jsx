import React from 'react';
import './postcard.css';

import { FaRegComment } from 'react-icons/fa';
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineDislike,
  AiFillDislike,
} from 'react-icons/ai';
import {
  BsBookmark,
  BsBookmarkFill,
  BsThreeDotsVertical,
} from 'react-icons/bs';
import { UsePost } from '../../context/Post-context';
import { useUser } from '../../context/User-context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../context/Modal-context';

export const PostCard = ({ post }) => {
  const { setShowModal, setshowEditModal } = useModal();
  const navigate = useNavigate();
  const { userObj, setUserObj, allUsers } = useUser();
  const userOfPost = allUsers.filter(obj => obj.username === post.username);

  const { dispatch, setLocalComments, setLocalpost } = UsePost();
  const hasliked = post.likes.likedBy.some(obj => obj._id === userObj._id);
  const token = localStorage.getItem('token');
  if (token === null) {
    navigate('/auth/login');
  }
  const header = { headers: { authorization: token } };
  const LikePostHandler = () => {
    if (hasliked) {
      axios.post(`api/posts/dislike/${post._id}`, {}, header).then(
        response => {
          dispatch({ type: 'LOAD_POSTS', payload: response.data.posts });
        },
        error => {
          console.log(error.response.data.message);
        }
      );
    } else {
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

    setShowModal(true);
  };
  const addToBookmarkHandler = () => {
    axios.post(`/api/users/bookmark/${post._id}`, {}, header).then(
      response => {
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
        const newUserObj = { ...userObj };
        newUserObj.bookmarks = response.data.bookmarks;
        setUserObj(newUserObj);
      },
      error => {
        console.log(error);
      }
    );
  };
  const upvoteComment = comment => {
    axios
      .post(`/api/comments/upvote/${post._id}/${comment._id}`, {}, header)
      .then(
        response => {
          dispatch({ type: 'LOAD_POSTS', payload: response.data.posts });
        },
        error => {
          console.log(error);
        }
      );
  };
  const downvoteComment = comment => {
    axios
      .post(`/api/comments/downvote/${post._id}/${comment._id}`, {}, header)
      .then(
        response => {
          dispatch({ type: 'LOAD_POSTS', payload: response.data.posts });
        },
        error => {
          console.log(error);
        }
      );
  };
  const EdiPostClickHandler = () => {
    setLocalpost(post);
    setshowEditModal(true);
  };
  return (
    <div className="post-card-parent">
      <div className="post-top-content">
        <div className="profile-data">
          <div className="profile-pic-letters">
            {userOfPost[0].firstName.slice(0, 1)}
            {userOfPost[0].lastName.slice(0, 1)}
          </div>

          <div className="username-holder">{post.username}</div>
        </div>
        <div className="post-content">{post.content}</div>
        <div className="options">
          <div className="bookmark-icon">
            {userObj && userObj.bookmarks.some(obj => obj._id === post._id) ? (
              <div onClick={() => removeFromBookmarkHandler()}>
                <BsBookmarkFill />
              </div>
            ) : (
              <div onClick={() => addToBookmarkHandler()}>
                <BsBookmark />
              </div>
            )}
          </div>
          <div className="edit-post">
            {post.username === userObj.username && (
              <button
                onClick={() => EdiPostClickHandler()}
                className="secondary-btn"
              >
                <BsThreeDotsVertical />
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="post-bottom-content">
        <div className="post-buttons">
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
              <div className="profile-pic-letters comment-dp">
                {obj.username.slice(0, 2).toUpperCase()}
              </div>
              <div className="comment-content">
                <strong>
                  <p>{obj.username}</p>
                </strong>
                <p>{obj.text}</p>
              </div>
              <div className="comment-buttons">
                <button
                  disabled={obj.votes.upvotedBy?.some(
                    obj => obj._id === userObj._id
                  )}
                  onClick={() => upvoteComment(obj)}
                  className="comment-vote-btn"
                >
                  {obj.votes.upvotedBy?.some(obj => obj._id === userObj._id) ? (
                    <AiFillLike />
                  ) : (
                    <AiOutlineLike />
                  )}
                </button>
                <button
                  disabled={obj.votes.downvotedBy?.some(
                    obj => obj._id === userObj._id
                  )}
                  onClick={() => downvoteComment(obj)}
                  className="comment-vote-btn"
                >
                  {obj.votes.downvotedBy?.some(
                    obj => obj._id === userObj._id
                  ) ? (
                    <AiFillDislike />
                  ) : (
                    <AiOutlineDislike />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
