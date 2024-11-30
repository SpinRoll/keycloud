// src/components/Success.js
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Success = () => {
  const location = useLocation();
  const sessionId = new URLSearchParams(location.search).get("session_id");

  useEffect(() => {
    const verifySession = async () => {
      try {
        // Send the session ID to the backend to verify and update user subscription
        await axios.post("/api/payments/verify-session", { sessionId });
        // Handle successful verification
      } catch (error) {
        console.error("Error verifying session:", error);
        // Handle error accordingly
      }
    };

    if (sessionId) {
      verifySession();
    }
  }, [sessionId]);

  return (
    <div>
      <h2>Payment Successful!</h2>
      <p>Your subscription has been activated.</p>
    </div>
  );
};

export default Success;
