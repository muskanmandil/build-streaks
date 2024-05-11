import React, { useState, createContext, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isSignedUp, setSignedUp] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/userinfo", {
        method: "POST",
        headers: {
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      })
        .then((res) => res.json())
        .then((data) => {
          setUserName(data.name);
          setUserEmail(data.email);
        });
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        isSignedUp,
        setSignedUp,
        userName,
        userEmail,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
