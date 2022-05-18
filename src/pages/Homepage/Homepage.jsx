import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CreatePost,
  EditModal,
  Footer,
  Modal,
  Navbar,
  SideBarLeft,
  SideBarRight,
} from '../../components';
import { Myfeed } from '../MyFeed/Myfeed';
import { Bars } from 'react-loading-icons';

import './homepage.css';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../redux-store/postSlice/postSlice';

export const Homepage = () => {
  const dispatch = useDispatch();
  // const [loading, setLoading] = useState(false);
  const state = useSelector(state => state.allUsers);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token === null) {
      navigate('/auth/login');
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await dispatch(getPosts());
        // if (response.loading === true) {
        //   setLoading(true);
        // }
        if (response.error)
          throw new Error('Could not get posts. Try again later', 'error');
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="app-layout">
      <Modal />
      <EditModal />
      <Navbar />
      <div className="home-page-container">
        <SideBarLeft />
        <div className="feed-container">
          <CreatePost />
          <hr className="hori-line" />
          {state.loading ? <Bars /> : <Myfeed />}
        </div>
        <SideBarRight />
      </div>
      <Footer />
    </div>
  );
};
