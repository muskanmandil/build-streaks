import React, { useState, createContext, useEffect, useCallback} from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const [isSignedUp, setSignedUp] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
  });
  const [leaderboard, setLeaderboard] = useState([]);

  const fetchUserInfo = useCallback(async () => {
    // check if auth-token is present or not
    if (localStorage.getItem("auth-token")) {
      // if present then try to fetch response
      try {
        const res = await fetch(`${backendUrl}/userinfo`, {
          method: "POST",
          headers: {
            "auth-token": `${localStorage.getItem("auth-token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });

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
  },[backendUrl])

  const fetchLeaderboard = useCallback(async () => {
    // check if auth-token is present or not
    if (localStorage.getItem("auth-token")) {
      // if present then try to fetch response
      try {
        const res = await fetch(`${backendUrl}/leaderboard`, {
          method: "GET",
          headers: {
            "auth-token": `${localStorage.getItem("auth-token")}`,
            "Content-Type": "application/json",
          },
        });

        // console.log(res);

        // if response is ok then set leaderboard
        if (res.status === 200) {
          const data = await res.json();
          setLeaderboard(data);
        }
      } catch (error) {
        // catch if any error occurs and log it
        console.log(error);
      }
    }
  },[backendUrl])


  useEffect(() => {
    fetchUserInfo();
    fetchLeaderboard();
  }, [fetchUserInfo, fetchLeaderboard]);

  return (
    <AppContext.Provider
      value={{
        isSignedUp,
        setSignedUp,
        userInfo,
        leaderboard
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
