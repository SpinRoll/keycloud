const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Assicurati che il percorso sia corretto
const auth = require("../middleware/authMiddleware"); // Middleware per l'autenticazione
const sendEmail = require("../utils/sendEmail"); // Funzione per inviare email
const nodemailer = require("nodemailer");

const router = express.Router();

// Funzione per generare il token di accesso (access token)
const generateAccessToken = (user) => {
  return jwt.sign(
    { email: user.email, id: user._id },
    process.env.JWT_ACCESS_SECRET, // Usa una variabile di ambiente per la chiave segreta dell'access token
    { expiresIn: "7d" } // Durata dell'access token
  );
};

// Funzione per generare il token di rinnovo (refresh token)
const generateRefreshToken = (user) => {
  return jwt.sign(
    { email: user.email, id: user._id },
    process.env.JWT_REFRESH_SECRET, // Usa una variabile di ambiente per la chiave segreta del refresh token
    { expiresIn: "7d" } // Durata del refresh token
  );
};

// Endpoint di SignUp
router.post("/signup", async (req, res) => {
  const { nome, cognome, email, password } = req.body;

  try {
    // Controlla se l'utente esiste già
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email già in uso" });
    }

    // Crittografia della password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Crea un nuovo utente
    const newUser = new User({
      nome,
      cognome,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    // Genera i token JWT
    const accessToken = generateAccessToken(newUser);
    const refreshToken = generateRefreshToken(newUser);

    // Salva il refresh token nel database dell'utente
    newUser.refreshToken = refreshToken;
    await newUser.save();

    res.status(201).json({ result: newUser, accessToken, refreshToken });
  } catch (error) {
    console.error("Errore durante la registrazione:", error.message); // Log più dettagliato
    res.status(500).json({ message: "Qualcosa è andato storto." });
  }
});

// Endpoint di SignIn
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Trova l'utente nel database
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "Utente non trovato" });
    }

    // Confronta la password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Credenziali non valide" });
    }

    // Genera i token JWT
    const accessToken = generateAccessToken(existingUser);
    const refreshToken = generateRefreshToken(existingUser);

    // Salva il refresh token nel database dell'utente
    existingUser.refreshToken = refreshToken;
    await existingUser.save();

    res.status(200).json({ result: existingUser, accessToken, refreshToken });
  } catch (error) {
    console.error("Errore durante il login:", error.message);
    res.status(500).json({ message: "Qualcosa è andato storto." });
  }
});

// Endpoint per il rinnovo dell'access token
router.post("/token", async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "Token non fornito" });
  }

  try {
    // Trova l'utente con il token di rinnovo
    const user = await User.findOne({ refreshToken });
    if (!user) {
      return res.status(403).json({ message: "Token non valido" });
    }

    // Verifica il refresh token
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ message: "Token non valido" });

      // Genera un nuovo access token
      const accessToken = generateAccessToken({
        email: decoded.email,
        id: decoded.id,
      });
      res.json({ accessToken });
    });
  } catch (error) {
    console.error("Errore durante il rinnovo del token:", error.message);
    res.status(500).json({ message: "Qualcosa è andato storto." });
  }
});

// Endpoint per ottenere i dati del profilo utente
router.get("/profile", auth, async (req, res) => {
  try {
    // Trova l'utente nel database usando l'ID decodificato dal token JWT
    const user = await User.findById(req.userId).select(
      "-password -refreshToken"
    );

    if (!user) {
      return res.status(404).json({ message: "Utente non trovato" });
    }

    res.status(200).json(user); // Restituisci i dati del profilo
  } catch (error) {
    console.error("Errore nel recupero del profilo:", error.message);
    res.status(500).json({ message: "Errore del server" });
  }
});

// Route per aggiornare il profilo utente
router.put("/profile", auth, async (req, res) => {
  const { nome, cognome } = req.body;

  try {
    // Trova l'utente nel database usando l'ID utente dal token JWT
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "Utente non trovato" });
    }

    // Aggiorna i campi Nome e Cognome
    user.nome = nome || user.nome;
    user.cognome = cognome || user.cognome;

    // Salva le modifiche nel database
    await user.save();

    res.status(200).json({ message: "Profilo aggiornato con successo", user });
  } catch (error) {
    console.error("Errore nell'aggiornamento del profilo:", error.message);
    res.status(500).json({ message: "Errore del server" });
  }
});

// Route per richiedere il cambiamento dell'email
router.put("/change-email", auth, async (req, res) => {
  const { newEmail } = req.body;

  try {
    // Controlla se l'email esiste già
    const emailExists = await User.findOne({ email: newEmail });
    if (emailExists) {
      return res.status(400).json({ message: "Email già in uso" });
    }

    // Aggiorna il campo email_temp con la nuova email
    const user = await User.findById(req.userId);
    user.email_temp = newEmail;
    await user.save();

    // Invia l'email di verifica
    const emailVerificationToken = jwt.sign(
      { userId: req.userId, newEmail },
      process.env.JWT_EMAIL_SECRET,
      { expiresIn: "1h" }
    );

    const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${emailVerificationToken}`;
    await sendEmail(
      newEmail,
      "Verifica la tua nuova email",
      `Clicca qui per verificare la tua email: ${verificationLink}`
    );

    res
      .status(200)
      .json({ message: "Email di verifica inviata alla nuova email" });
  } catch (error) {
    console.error(
      "Errore durante l'invio dell'email di verifica:",
      error.message
    );
    res.status(500).json({ message: "Errore del server" });
  }
});

// Route per verificare l'email
router.put("/verify-email", async (req, res) => {
  const { token } = req.query;

  try {
    // Decodifica il token di verifica dell'email
    const { userId, newEmail } = jwt.verify(
      token,
      process.env.JWT_EMAIL_SECRET
    );

    // Trova l'utente e aggiorna l'email
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Utente non trovato" });
    }

    // Aggiorna l'email dell'utente con quella temporanea
    user.email = user.email_temp;
    user.email_temp = null; // Pulisci il campo temporaneo
    await user.save();

    res.status(200).json({ message: "Email aggiornata con successo" });
  } catch (error) {
    console.error("Errore durante la verifica dell'email:", error.message);
    res.status(500).json({ message: "Errore del server" });
  }
});

// ENDPOINT recupero della password
router.post("/recover-email", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Utente non trovato" });
    }

    // Crea un token JWT per il reset password
    const resetToken = jwt.sign(
      { id: user._id },
      process.env.JWT_RESET_SECRET,
      {
        // Durata del token
        expiresIn: process.env.JWT_RESET_EXPIRATION,
      }
    );

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    // Configura nodemailer per inviare l'email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Recupero Password",
      text: `Clicca qui per resettare la tua password: ${resetLink}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email di recupero inviata" });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      // Se il token è scaduto
      return res.status(401).json({ message: "Il link di reset è scaduto." });
    }
    console.error("Errore nel recupero della password:", error);
    res.status(500).json({ message: "Errore del server" });
  }
});

// Endpoint per il reset della password
router.post("/reset-password", async (req, res) => {
  const { token, password } = req.body;

  try {
    // Verifica il token
    const decoded = jwt.verify(token, process.env.JWT_RESET_SECRET);

    // Trova l'utente
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "Utente non trovato" });
    }

    // Hash della nuova password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Aggiorna la password dell'utente
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password resettata con successo" });
  } catch (error) {
    console.error("Errore durante il reset della password:", error);
    res.status(500).json({ message: "Errore nel reset della password" });
  }
});

module.exports = router;
