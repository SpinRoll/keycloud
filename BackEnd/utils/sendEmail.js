// utils/sendEmail.js
const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  // Configura il trasportatore usando il servizio Gmail
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER, // La tua email Gmail
      pass: process.env.EMAIL_PASS, // La App Password generata da Google
    },
  });

  // Opzioni dell'email
  const mailOptions = {
    from: process.env.EMAIL_USER, // L'indirizzo che invia l'email
    to, // L'indirizzo dell'utente
    subject, // Oggetto dell'email
    text, // Contenuto del messaggio
  };

  try {
    // Invia l'email
    await transporter.sendMail(mailOptions);
    console.log("Email inviata correttamente");
  } catch (error) {
    console.error("Errore durante l'invio dell'email:", error.message);
    console.error("Errore dettagliato:", error);

  }
};

module.exports = sendEmail;
