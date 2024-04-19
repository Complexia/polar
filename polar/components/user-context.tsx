'use client';

import { createContext, useContext, useEffect } from 'react';

//@ts-ignore
const UserContext = createContext();

const UserContextProvider = ({ address, display_name, name, dp_uri, children }) => {
  

  

  return (
    <UserContext.Provider value={{ address, display_name, name, dp_uri }}>
      {children}
    </UserContext.Provider>
  )
};

export default UserContextProvider;

export const useUserContext = () => {
    return useContext(UserContext);
};

