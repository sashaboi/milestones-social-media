import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userObj, setUserObj] = useState();
  return (
    <UserContext.Provider value={{ userObj, setUserObj }}>
      {children}
    </UserContext.Provider>
  );
};
const useUser = () => useContext(UserContext);

export { useUser, UserProvider };
