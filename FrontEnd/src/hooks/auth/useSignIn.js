// src/hooks/auth/useSignIn.js
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const useSignIn = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [error, setError] = useState("");
  const [mfaRequired, setMfaRequired] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Gestione del modal
  const [successMessage, setSuccessMessage] = useState(""); // Messaggio di successo

  const signIn = async (e, formData, API_URL) => {
    e.preventDefault();
    setError(""); // Resetta l'errore

    try {
      const response = await axios.post(`${API_URL}/api/auth/signin`, formData);

      if (response.data.mfaRequired) {
        setMfaRequired(true);
        return;
      }

      // Memorizza i token JWT nel localStorage
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.setItem("userId", response.data.result._id);

      // Mostra il modal di successo
      setSuccessMessage(t("signin_success")); // Messaggio di successo
      setIsModalOpen(true); // Apri il modal

      // Aggiungi timeout per chiudere il modal dopo 2 secondi
      setTimeout(() => {
        handleCloseModal();
      }, 2000);
    } catch (error) {
      setError(error.response ? error.response.data.message : "Sign-in error");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Chiudi il modal
    navigate("/dashboard"); // Naviga alla dashboard dopo il successo
  };

  return {
    signIn,
    error,
    mfaRequired,
    isModalOpen,
    successMessage,
    handleCloseModal,
  };
};

export default useSignIn;
