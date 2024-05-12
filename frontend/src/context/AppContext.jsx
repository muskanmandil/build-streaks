import React, { useState, createContext, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isSignedUp, setSignedUp] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      // check if auth-token is present or not
      if (localStorage.getItem("auth-token")) {
        // if present then try to fetch response
        try {
          const res = await fetch("http://localhost:4000/userinfo", {
            method: "POST",
            headers: {
              "auth-token": `${localStorage.getItem("auth-token")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
          });

          // log the response
          // console.log(res);

          // if response is ok then set userInfo
          if (res.status === 200) {
            const data = await res.json();
            setUserInfo(data);
          }
        } catch (error) {
          // catch if any error occurs and log it
          console.log(error);
        }
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <AppContext.Provider
      value={{
        isSignedUp,
        setSignedUp,
        userInfo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
