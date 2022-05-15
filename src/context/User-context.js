import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userObj, setUserObj] = useState();
  const [allUsers, setAllUsers] = useState();
  useEffect(() => {
    axios.get('/api/users', {}).then(
      response => {
        setAllUsers(response.data.users);
      },
      error => {
        console.log(error);
      }
    );
  }, [userObj]);
  return (
    <UserContext.Provider
      value={{ allUsers, setAllUsers, userObj, setUserObj }}
    >
      {children}
    </UserContext.Provider>
  );
};
const useUser = () => useContext(UserContext);

export { useUser, UserProvider };
