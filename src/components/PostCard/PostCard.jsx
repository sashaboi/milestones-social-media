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
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import { useModal } from '../../context/Modal-context';
import { useSelector, useDispatch } from 'react-redux';
import { SetloggedInUser } from '../../redux-store/alluserSlice/alluserSlice';

import {
  likeVideo,
  dislikeVideo,
  upvoteComment,
  downvoteComment,
} from '../../redux-store/postSlice/postSlice';
import { useNavigate } from 'react-router-dom';
export const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector(state => state.allUsers);
  const postState = useSelector(state => state.posts);

  console.log(postState.loading);
  const { setShowModal, setshowEditModal } = useModal();
  // const navigate = useNavigate();
  const userOfPost = state.users.filter(obj => obj.username === post.username);
  console.log(state.loggedinUser._id);
  const { setLocalComments, setLocalpost } = UsePost();
  const hasliked = post.likes.likedBy.some(
    obj => obj._id === state.loggedinUser._id
  );
  const token = localStorage.getItem('token');

  const header = { headers: { authorization: token } };
  const LikePostHandler = () => {
    if (hasliked) {
      dispatch(dislikeVideo({ token, postid: post._id }));
    } else {
      dispatch(likeVideo({ token, postid: post._id }));
    }
  };

  const CommentClickHandler = post => {
    setLocalComments(post);

    setShowModal(true);
  };
  const addToBookmarkHandler = () => {
    axios.post(`/api/users/bookmark/${post._id}`, {}, header).then(
      response => {
        const newUserObj = { ...state.loggedinUser };
        newUserObj.bookmarks = response.data.bookmarks;
        dispatch(SetloggedInUser(newUserObj));
      },
      error => {
        console.log(error);
      }
    );
  };
  const removeFromBookmarkHandler = () => {
    axios.post(`/api/users/remove-bookmark/${post._id}`, {}, header).then(
      response => {
        const newUserObj = { ...state.loggedinUser };
        newUserObj.bookmarks = response.data.bookmarks;
        dispatch(SetloggedInUser(newUserObj));
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
          <div
            onClick={() => navigate(`/people/${post.username}`)}
            className="profile-pic-letters"
          >
            {userOfPost[0].firstName.slice(0, 1)}
            {userOfPost[0].lastName.slice(0, 1)}
          </div>

          <div
            onClick={() => navigate(`/people/${post.username}`)}
            className="username-holder"
          >
            {post.username}
          </div>
        </div>
        <div className="post-content">{post.content}</div>
        <div className="options">
          <div className="bookmark-icon">
            {state.loggedinUser?.bookmarks.some(obj => obj === post._id) ? (
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
            {post.username === state.loggedinUser.username && (
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
                    obj => obj._id === state.loggedinUser._id
                  )}
                  onClick={() => {
                    dispatch(
                      upvoteComment({
                        token,
                        postid: post._id,
                        commentid: obj._id,
                      })
                    );
                  }}
                  className="comment-vote-btn"
                >
                  {obj.votes.upvotedBy?.some(
                    obj => obj._id === state.loggedinUser._id
                  ) ? (
                    <AiFillLike />
                  ) : (
                    <AiOutlineLike />
                  )}
                </button>
                <button
                  disabled={obj.votes.downvotedBy?.some(
                    obj => obj._id === state.loggedinUser._id
                  )}
                  onClick={() =>
                    dispatch(
                      downvoteComment({
                        token,
                        postid: post._id,
                        commentid: obj._id,
                      })
                    )
                  }
                  className="comment-vote-btn"
                >
                  {obj.votes.downvotedBy?.some(
                    obj => obj._id === state.loggedinUser._id
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
