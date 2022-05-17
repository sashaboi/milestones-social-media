import React, { useEffect } from 'react';
import './sidebarright.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  getUsers,
  followUser,
  unFollowUser,
} from '../../redux-store/alluserSlice/alluserSlice';
export const SideBarRight = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.allUsers);

  console.log('state from sidebar ', state);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (state.loggedinUser === undefined) {
      navigate('/auth/login');
    }
  }, [state.loggedinUser]);
  /* 


REDUXXX


*/
  useEffect(() => {
    (async () => {
      try {
        const response = await dispatch(getUsers());
        if (response.error)
          throw new Error('Could not get posts. Try again later', 'error');
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const allOtherUsers = state.users?.filter(
    obj => obj._id !== state.loggedinUser._id
  );
  /* 


REDUXXX


*/

  const followUserHandler = obj => {
    dispatch(followUser({ token, userId: obj._id }));
  };
  const unfollowUserHandler = obj => {
    dispatch(unFollowUser({ token, userId: obj._id }));
  };
  return (
    <div className="sidebar">
      <h2>Suggested users</h2>
      <div className="users-container">
        {allOtherUsers?.map(obj => (
          <div className="user-obj" key={obj._id}>
            {obj.firstName}
            {obj.lastName}
            {state.loggedinUser.user?.following.some(
              userobj => userobj._id === obj._id
            ) ? (
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
