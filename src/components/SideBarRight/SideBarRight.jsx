import React, { useEffect } from 'react';
import axios from 'axios';
import './sidebarright.css';
import { useUser } from '../../context/User-context';
import { useNavigate } from 'react-router-dom';
export const SideBarRight = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const header = { headers: { authorization: token } };
  const { allUsers, userObj, setUserObj } = useUser();

  useEffect(() => {
    if (userObj === undefined) {
      navigate('/auth/login');
    }
  }, [userObj]);

  const allOtherUsers = allUsers?.filter(obj => obj._id !== userObj._id);
  console.log(userObj);

  const followUserHandler = obj => {
    axios.post(`/api/users/follow/${obj._id}`, {}, header).then(
      response => {
        console.log(response);
        setUserObj(response.data.user);
      },
      error => {
        console.log(error.response.data.message);
      }
    );
  };
  const unfollowUserHandler = obj => {
    axios.post(`/api/users/unfollow/${obj._id}`, {}, header).then(
      response => {
        console.log(response);
        setUserObj(response.data.user);
      },
      error => {
        console.log(error.response.data.message);
      }
    );
  };
  return (
    <div className="sidebar">
      <h2>Suggested users</h2>
      <div className="users-container">
        {allOtherUsers?.map(obj => (
          <div className="user-obj" key={obj._id}>
            {obj.firstName}
            {obj.lastName}
            {userObj?.following.some(userobj => userobj._id === obj._id) ? (
              <button
                className="secondary-btn"
                onClick={() => unfollowUserHandler(obj)}
              >
                Unfollow
              </button>
            ) : (
              <button
                className="secondary-btn"
                onClick={() => followUserHandler(obj)}
              >
                Follow
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
