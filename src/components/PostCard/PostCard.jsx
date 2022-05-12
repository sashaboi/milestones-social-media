import React from 'react';
import './postcard.css';

import { FaRegComment, FaRegHeart } from 'react-icons/fa';

export const PostCard = () => {
  return (
    <div className="post-card-parent">
      <div className="post-top-content">
        <div className="profile-data">
          <img src="" alt="profile pic" />
          <div className="username-holder">Onkar Deshpande</div>
        </div>
        <div className="post-content">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus
          veniam molestias fuga fugiat veritatis aspernatur est reiciendis
          eveniet. Quasi animi porro dolorum minima corrupti natus perferendis?
          Atque eligendi dolorem officia! Lorem ipsum dolor, sit amet
          consectetur adipisicing elit. Repellendus veniam molestias fuga fugiat
          veritatis aspernatur est reiciendis eveniet. Quasi animi porro dolorum
          minima corrupti natus perferendis? Atque eligendi dolorem officia!
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus
          veniam molestias fuga fugiat veritatis aspernatur est reiciendis
          eveniet. Quasi animi porro dolorum minima corrupti natus perferendis?
          Atque eligendi dolorem officia!Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Repellendus veniam molestias fuga fugiat veritatis
          aspernatur est reiciendis eveniet. Quasi animi porro dolorum minima
          corrupti natus perferendis? Atque eligendi dolorem officia!
        </div>
      </div>
      <div className="post-bottom-content">
        <div className="post-like-button post-btn">
          <FaRegHeart />
        </div>
        <div className="post-comment-button post-btn">
          <FaRegComment />
        </div>
      </div>
    </div>
  );
};
