import React, { useEffect } from 'react';
import './sidebarright.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LoadingSpin from 'react-loading-spin';
import { toast } from 'react-toastify';
import {
  getUsers,
  followUser,
  unFollowUser,
} from '../../redux-store/alluserSlice/alluserSlice';
export const SideBarRight = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.allUsers);

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

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
  useEffect(() => {
    console.log('logged in user', state.loggedinUser);
    if (Object.keys(state.loggedinUser).length === 0) {
      console.log('reached sidebar auth checker');
      navigate('/auth/login');
    }
  }, [state]);
  /* 


REDUXXX


*/

  const followUserHandler = obj => {
    dispatch(followUser({ token, userId: obj._id })).then(() => {
      toast.success('User Followed !', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
  };
  const unfollowUserHandler = obj => {
    dispatch(unFollowUser({ token, userId: obj._id }));
  };
  return (
    <div className="sidebar">
      <h2>Suggested users</h2>
      <div className="users-container">
        {state.loading ? (
          <LoadingSpin />
        ) : (
          allOtherUsers?.map(obj => (
            <div className="user-obj" key={obj._id}>
              <div
                onClick={() => navigate(`/people/${obj.username}`)}
                className="user-name"
              >
                {obj.firstName}
                {obj.lastName}
              </div>
              {state.loggedinUser?.following.some(
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
          ))
        )}
      </div>
    </div>
  );
};
