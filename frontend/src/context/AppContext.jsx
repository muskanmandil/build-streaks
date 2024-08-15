import React, { useState, createContext, useEffect, useCallback } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
  });
  const [leaderboard, setLeaderboard] = useState([]);
  const [filter, setFilter] = useState("");
  const [revision, setRevision] = useState(false);

  const fetchUserInfo = useCallback(async () => {
    if (localStorage.getItem("auth-token")) {
      setLoading(true);
      try {
        const res = await fetch(`${backendUrl}/userInfo`, {
          method: "POST",
          headers: {
            "auth-token": `${localStorage.getItem("auth-token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });

        // console.log(res);

        if (res.status === 200) {
          const data = await res.json();
          setUserInfo(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  }, [backendUrl]);

  const fetchLeaderboard = useCallback(async () => {
    if (localStorage.getItem("auth-token")) {
      setLoading(true);
      try {
        const res = await fetch(`${backendUrl}/leaderboard`, {
          method: "GET",
          headers: {
            "auth-token": `${localStorage.getItem("auth-token")}`,
            "Content-Type": "application/json",
          },
        });

        // console.log(res);

        if (res.status === 200) {
          const data = await res.json();
          setLeaderboard(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  }, [backendUrl]);

  // to fetch the userinfo & leaderboard on the first render of the app
  useEffect(() => {
    fetchUserInfo();
    fetchLeaderboard();
  }, [fetchUserInfo, fetchLeaderboard]);

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        userInfo,
        leaderboard,
        fetchLeaderboard,
        filter,
        setFilter,
        revision,
        setRevision,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
