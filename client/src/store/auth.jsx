import React, { createContext, useContext, useEffect, useState } from "react";

const authContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [services, setServices] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const authorizationToken = `Bearer ${token}`;

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  // logout user code
  let isLoggedIn = !!token;
  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  // JWT AUTHENTICATION - to get the currently loggedIn user data

  const userAuthentication = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("http://localhost:5000/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.userData);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching user data");
      setIsLoading(true);
    }
  };

  // to fetch the service data from the database

  const getServices = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/data/service", {
        method: "GET",
      });
      if (res.ok) {
        const data = await res.json();
        setServices(data.response);
      }
    } catch (error) {
      console.log(`service frontend error ${error}`);
    }
  };

  useEffect(() => {
    getServices();
    userAuthentication();
  }, []);

  return (
    <authContext.Provider
      value={{ storeTokenInLS, LogoutUser, isLoggedIn, user, services, authorizationToken, isLoading }}
    >
      {children}
    </authContext.Provider>
  );
};

const useAuth = () => {
  return useContext(authContext);
};

export { AuthProvider, useAuth };
