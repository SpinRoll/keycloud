// hooks/useApartments.js
import { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

const useApartments = () => {
  const { i18n } = useTranslation();
  const [apartments, setApartments] = useState([]);

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
        console.error(
          "Error fetching apartments:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchApartments();
  }, [i18n.language]);

  return [apartments, setApartments];
};

export default useApartments;
