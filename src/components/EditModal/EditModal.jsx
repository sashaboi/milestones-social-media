import React, { useState, useEffect } from 'react';

import './modal.css';
import { useModal } from '../../context/Modal-context';
import { UsePost } from '../../context/Post-context';
import { useDispatch } from 'react-redux';
import { editPost } from '../../redux-store/postSlice/postSlice';
// const dispatch = useDispatch();
// const postState = useSelector(state => state.posts);

export const EditModal = () => {
  const dispatch = useDispatch();
  const { localPost } = UsePost();
  const token = localStorage.getItem('token');

  const { showEditModal, setshowEditModal } = useModal();
  useEffect(() => {
    setNewPostText(localPost?.content);
  }, [localPost]);

  const [newPostText, setNewPostText] = useState(localPost?.content);
  if (!showEditModal) {
    return null;
  }
  const postdatatosend = { ...localPost, content: newPostText };
  const saveEditedPostHandler = () => {
    dispatch(
      editPost({ token, finalpostdata: postdatatosend, postid: localPost._id })
    );
    setshowEditModal(false);
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
