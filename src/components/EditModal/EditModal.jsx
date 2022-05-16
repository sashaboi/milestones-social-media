import React, { useState, useEffect } from 'react';

import './modal.css';
import { useModal } from '../../context/Modal-context';
import { UsePost } from '../../context/Post-context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export const EditModal = () => {
  const { localPost, dispatch } = UsePost();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  if (token === null) {
    navigate('/auth/login');
  }
  const header = { headers: { authorization: token } };
  const { showEditModal, setshowEditModal } = useModal();
  console.log('localpost from edit modal', localPost);
  useEffect(() => {
    setNewPostText(localPost?.content);
  }, [localPost]);

  const [newPostText, setNewPostText] = useState(localPost?.content);
  if (!showEditModal) {
    return null;
  }
  const postdatatosend = { ...localPost, content: newPostText };
  console.log(postdatatosend);
  const saveEditedPostHandler = () => {
    axios
      .post(
        `/api/posts/edit/${localPost._id}`,
        { postData: postdatatosend },
        header
      )
      .then(
        response => {
          dispatch({ type: 'LOAD_POSTS', payload: response.data.posts });
          setshowEditModal(false);
        },
        error => {
          console.log(error.response.data.message);
        }
      );
  };
  return (
    <div className="modal-parent-post">
      <div className="modal-container-post">
        <h3>Edit Post</h3>
        <textarea
          className="textarea-post-edit"
          value={newPostText}
          onChange={e => setNewPostText(e.target.value)}
          name="Text1"
          cols="40"
          rows="5"
        ></textarea>
        <br />
        <button onClick={() => saveEditedPostHandler()} className="primary-btn">
          Save Edited Post
        </button>
        <br />
        <button
          className="secondary-btn"
          onClick={() => setshowEditModal(!showEditModal)}
        >
          Close
        </button>
      </div>
    </div>
  );
};
