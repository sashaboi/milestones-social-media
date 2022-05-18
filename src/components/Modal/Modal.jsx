import React, { useState } from 'react';

import './modal.css';
import { useModal } from '../../context/Modal-context';
import { UsePost } from '../../context/Post-context';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addComment } from '../../redux-store/postSlice/postSlice';
import { AiFillCloseCircle } from 'react-icons/ai';
export const Modal = () => {
  // const reduxState = useSelector(state => state.posts);

  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [inputComment, setInputComment] = useState();
  const { showModal, setShowModal } = useModal();
  const { localComments } = UsePost();
  // const indexOfStateToMap = state.findIndex(
  //   obj => obj._id === localComments._id
  // );
  const token = localStorage.getItem('token');
  if (!showModal) {
    return null;
  }
  const sendComment = () => {
    dispatch(
      addComment({
        token,
        postcontent: inputComment,
        postid: localComments._id,
      })
    )
      .unwrap()
      .then(() => {
        setShowModal(!showModal);
        setInputComment('');
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <div className="modal-parent">
      <div className="modal-container">
        <h3>Add Comment</h3>
        <div className="make-comment">
          <textarea
            value={inputComment}
            onChange={e => setInputComment(e.target.value)}
            type="text"
            cols="40"
            rows="3"
            className="make-comment-textarea"
          />
          <button className="primary-btn" onClick={() => sendComment()}>
            Post Comment
          </button>
        </div>
        {/* {state[indexOfStateToMap].comments.map(obj => (
          <div key={obj._id}>{obj.text}</div>
        ))} */}
        <button className="close-btn" onClick={() => setShowModal(!showModal)}>
          <AiFillCloseCircle />
        </button>
      </div>
    </div>
  );
};
