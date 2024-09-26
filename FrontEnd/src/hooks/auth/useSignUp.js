// src/hooks/auth/useSignUp.js
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const useSignUp = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // Stato per la modale
  const [successMessage, setSuccessMessage] = useState(""); // Messaggio di successo
  const [userName, setUserName] = useState(""); // Nome dell'utente
  const [userSurname, setUserSurname] = useState(""); // Cognome dell'utente

  const signUp = async (e, formData, API_URL) => {
    e.preventDefault();
    setError(""); // Resetta gli errori

    try {
      const response = await axios.post(`${API_URL}/api/auth/signup`, formData);

      // Estrai nome e cognome dalla risposta
      const { nome, cognome } = response.data.result;

      // Salva nome e cognome
      setUserName(nome);
      setUserSurname(cognome);

      // Mostra il modal di successo
      setSuccessMessage(t("signup_success"));
      setIsModalOpen(true);

      // Chiudi il modal automaticamente dopo 2 secondi e naviga alla dashboard
      setTimeout(() => {
        handleCloseModal();
      }, 2000);
    } catch (error) {
      setError(
        error.response ? error.response.data.message : t("signup_error")
      );
      console.error("Errore durante la registrazione:", error.response.data);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Chiudi il modal
    navigate("/dashboard"); // Naviga alla dashboard
  };

  return {
    signUp,
    error,
    isModalOpen,
    successMessage,
    handleCloseModal,
    userName, // Passa il nome dell'utente
    userSurname, // Passa il cognome dell'utente
  };
};

export default useSignUp;
