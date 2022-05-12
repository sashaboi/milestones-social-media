import { React, createContext, useContext } from 'react';

const PostContext = createContext();

// eslint-disable-next-line react/prop-types
const PostProvider = ({ children }) => {
  return <PostContext.Provider value={{}}>{children}</PostContext.Provider>;
};

const UsePost = () => useContext(PostContext);
export { PostProvider, UsePost };
