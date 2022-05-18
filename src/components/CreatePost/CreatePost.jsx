import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addPost } from '../../redux-store/postSlice/postSlice';
import './createpost.css';
export const CreatePost = () => {
  const dispatch = useDispatch();

  const token = localStorage.getItem('token');

  const [postText, setPostText] = useState('');
  const [letterCounter, setLetterCounter] = useState('');
  useEffect(() => {
    postText.length > 140
      ? setLetterCounter('letter-counter-danger')
      : setLetterCounter('letter-counter-safe');
  }, [postText]);
  const CreatePostHandler = () => {
    dispatch(addPost({ token, postcontent: postText }));
    setPostText('');
  };
  return (
    <div>
      <div className="create-post-parent">
        <div className={`letter-counter ${letterCounter}`}>
          <p>{postText.length}/140</p>
        </div>
        <textarea
          value={postText}
          onChange={e => setPostText(e.target.value)}
          name="Text1"
          cols="40"
          rows="3"
        ></textarea>
        <div className="post-button">
          <button
            onClick={() => CreatePostHandler()}
            disabled={postText.length > 140 || postText.length === 0}
            className="primary-btn"
          >
            Post
          </button>
        </div>
      </div>
      <hr />
    </div>
  );
};
