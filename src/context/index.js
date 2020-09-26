import React, { useState, createContext } from 'react';

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [app_state, setAppState] = useState({
    isAuthenticated: false,
  });
  return (
    <StoreContext.Provider value={{ app_state, setAppState }}>
      {children}
    </StoreContext.Provider>
  );
};
