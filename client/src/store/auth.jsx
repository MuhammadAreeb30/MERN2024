import React, { createContext, useContext } from "react";

const authContext = createContext();

const AuthProvider = ({ children }) => {
  const storeTokenInLS = (serverToken) => {
    return localStorage.setItem("token", serverToken);
  };

  return (
    <authContext.Provider value={{ storeTokenInLS }}>
      {children}
    </authContext.Provider>
  );
};

const useAuth = () => {
  return useContext(authContext);
};

export { AuthProvider, useAuth };