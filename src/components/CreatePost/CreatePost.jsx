import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UsePost } from '../../context/Post-context';

import './createpost.css';
export const CreatePost = () => {
  const { dispatch } = UsePost();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  if (token === null) {
    navigate('/auth/login');
  }
  const header = { headers: { authorization: token } };
  const [postText, setPostText] = useState('');
  const [letterCounter, setLetterCounter] = useState('');
  useEffect(() => {
    postText.length > 140
      ? setLetterCounter('letter-counter-danger')
      : setLetterCounter('letter-counter-safe');
  }, [postText]);
  const CreatePostHandler = () => {
    axios.post('/api/posts', { postData: postText }, header).then(
      response => {
        console.log('create post response', response.data.posts);
        dispatch({ type: 'LOAD_POSTS', payload: response.data.posts });
      },
      error => {
        console.log(error.response.data.message);
      }
    );
  };
  return (
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
          disabled={postText.length > 140}
          className="primary-btn"
        >
          Post
        </button>
      </div>
    </div>
  );
};
