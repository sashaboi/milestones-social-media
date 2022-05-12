import { React, createContext, useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PostContext = createContext();

// eslint-disable-next-line react/prop-types
const PostProvider = ({ children }) => {
  const reducerfunc = (state, action) => {
    switch (action.type) {
      case 'LOAD_POSTS':
        return action.payload;

      default:
        console.log('default reached');
        break;
    }
  };
  const [state, dispatch] = useReducer(reducerfunc, []);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get('/api/posts').then(
      response => {
        dispatch({ type: 'LOAD_POSTS', payload: response.data.posts });
        navigate('/');
      },
      error => {
        console.log(error);
      }
    );
  }, []);

  return (
    <PostContext.Provider value={{ state, dispatch }}>
      {children}
    </PostContext.Provider>
  );
};

const UsePost = () => useContext(PostContext);
export { PostProvider, UsePost };
