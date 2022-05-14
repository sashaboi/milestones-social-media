import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './sidebarright.css';
import { useUser } from '../../context/User-context';
export const SideBarRight = () => {
  const token = localStorage.getItem('token');
  const header = { headers: { authorization: token } };
  const { userObj, setUserObj } = useUser();
  const [allUsers, setAllUsers] = useState();
  const allOtherUsers = allUsers.filter(obj => obj._id !== userObj._id);
  console.log(userObj);
  useEffect(() => {
    axios.get('/api/users', {}).then(
      response => {
        setAllUsers(response.data.users);
      },
      error => {
        console.log(error);
      }
    );
  }, []);
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
              <button onClick={() => unfollowUserHandler(obj)}>Unfollow</button>
            ) : (
              <button onClick={() => followUserHandler(obj)}>follow</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
