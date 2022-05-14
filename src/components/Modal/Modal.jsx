import React, { useState } from 'react';

import './modal.css';
import { useModal } from '../../context/Modal-context';
import { UsePost } from '../../context/Post-context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export const Modal = () => {
  const navigate = useNavigate();
  const [inputComment, setInputComment] = useState();
  const { showModal, setShowModal } = useModal();
  const { localComments, dispatch, state } = UsePost();
  const indexOfStateToMap = state.findIndex(
    obj => obj._id === localComments._id
  );

  if (!showModal) {
    return null;
  }
  const sendComment = () => {
    console.log('make comment', inputComment);
    const token = localStorage.getItem('token');
    if (token === null) {
      navigate('/auth/login');
    }
    const header = { headers: { authorization: token } };
    axios
      .post(
        `/api/comments/add/${localComments._id}`,
        { commentData: inputComment },
        header
      )
      .then(
        response => {
          dispatch({ type: 'LOAD_POSTS', payload: response.data.posts });
          setInputComment('');
        },
        error => {
          console.log(error.response.data.message);
        }
      );
  };
  return (
    <div className="modal-parent">
      <div className="modal-container">
        <h3>comments</h3>
        <div className="make-comment">
          <input
            value={inputComment}
            onChange={e => setInputComment(e.target.value)}
            type="text"
          />
          <button onClick={() => sendComment()}>Post</button>
        </div>
        {state[indexOfStateToMap].comments.map(obj => (
          <div key={obj._id}>{obj.text}</div>
        ))}
        <button onClick={() => setShowModal(!showModal)}>Close</button>
      </div>
    </div>
  );
};
