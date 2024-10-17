// src/utils/axiosInstance.js
import axios from "axios";
import eventEmitter from "./eventEmitter";
// eslint-disable-next-line
import jwt_decode from "jwt-decode";
// eslint-disable-next-line
import { SessionContext } from "../context/SessionContext";
// eslint-disable-next-line
import { useContext } from "react";

const axiosInstance = axios.create({
  baseURL: "/api",
});

// Request interceptor to add the access token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers["Authorization"] = "Bearer " + accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If error status is 401 and not retrying already
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        try {
          const response = await axios.post("/api/auth/refresh", {
            refreshToken,
          });

          // Save the new access token
          localStorage.setItem("token", response.data.accessToken);

          // Update the Authorization header
          axiosInstance.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.accessToken;

          // Retry the original request
          return axiosInstance(originalRequest);
        } catch (err) {
          // Refresh token invalid or expired
          console.error("Refresh token invalid or expired:", err);

          // Emit the session expired event
          eventEmitter.emit("sessionExpired");

          // Return a rejected promise
          return Promise.reject(err);
        }
      } else {
        // No refresh token, emit session expired event
        eventEmitter.emit("sessionExpired");

        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
