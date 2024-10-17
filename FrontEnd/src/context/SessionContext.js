// src/context/SessionContext.js
import React, { createContext, useState, useEffect } from "react";
import eventEmitter from "../utils/eventEmitter"; // Import the event emitter

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [isSessionExpired, setIsSessionExpired] = useState(false);

  useEffect(() => {
    // Listen to the sessionExpired event
    const handleSessionExpired = () => {
      setIsSessionExpired(true);
    };

    eventEmitter.on("sessionExpired", handleSessionExpired);

    // Cleanup
    return () => {
      eventEmitter.off("sessionExpired", handleSessionExpired);
    };
  }, []);

  const value = {
    isSessionExpired,
    setIsSessionExpired,
  };

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};
