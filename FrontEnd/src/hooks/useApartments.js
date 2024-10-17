// hooks/useApartments.js
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { SessionContext } from "../context/SessionContext"; // Import the SessionContext
// eslint-disable-next-line
import axiosInstance from "../utils/axiosInstance";
// eslint-disable-next-line
import dayjs from "dayjs";

const useApartments = () => {
  const { i18n } = useTranslation();
  const [apartments, setApartments] = useState([]);
  const { setIsSessionExpired } = useContext(SessionContext); // Use the session context

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token not found! Please log in.");
          return;
        }
        const response = await axios.get(`/api/apartments`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setApartments(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // If a 401 Unauthorized occurs, set session as expired
          setIsSessionExpired(true);
        } else {
          console.error(
            "Error fetching apartments:",
            error.response ? error.response.data : error.message
          );
        }
      }
    };

    fetchApartments();
  }, [i18n.language, setIsSessionExpired]);

  return [apartments, setApartments];
};

export default useApartments;
