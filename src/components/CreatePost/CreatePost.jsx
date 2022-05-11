import React, { useState, useEffect } from 'react';

import './createpost.css';
export const CreatePost = () => {
  const [postText, setPostText] = useState('');
  const [letterCounter, setLetterCounter] = useState('');
  useEffect(() => {
    postText.length > 140
      ? setLetterCounter('letter-counter-danger')
      : setLetterCounter('letter-counter-safe');
  }, [postText]);

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
        <button disabled={postText.length > 140} className="primary-btn">
          Post
        </button>
      </div>
    </div>
  );
};
