import {
  React,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import axios from 'axios';

const PostContext = createContext();

// eslint-disable-next-line react/prop-types
const PostProvider = ({ children }) => {
  const [localComments, setLocalComments] = useState([]);

  const reducerfunc = (state, action) => {
    switch (action.type) {
      case 'LOAD_POSTS':
        return action.payload;
      case 'ADD_COMMENT':
        return state;

      default:
        console.log('default reached');
        break;
    }
  };
  const [state, dispatch] = useReducer(reducerfunc, []);
  const [localPost, setLocalpost] = useState({});
  useEffect(() => {
    axios.get('/api/posts').then(
      response => {
        dispatch({ type: 'LOAD_POSTS', payload: response.data.posts });
      },
      error => {
        console.log(error);
      }
    );
  }, []);

  return (
    <PostContext.Provider
      value={{
        localComments,
        setLocalComments,
        state,
        dispatch,
        localPost,
        setLocalpost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

const UsePost = () => useContext(PostContext);
export { PostProvider, UsePost };
