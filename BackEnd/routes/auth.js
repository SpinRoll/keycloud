const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Assicurati che il percorso sia corretto

const router = express.Router();

// Funzione per generare il token di accesso (access token)
const generateAccessToken = (user) => {
  return jwt.sign(
    { email: user.email, id: user._id },
    process.env.JWT_ACCESS_SECRET, // Usa una variabile di ambiente per la chiave segreta dell'access token
    { expiresIn: "15m" } // Durata dell'access token
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

module.exports = router;
