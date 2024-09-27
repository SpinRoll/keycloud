// BackEnd/routes/auth.js
const express = require("express");
const bcrypt = require("bcryptjs"); // Libreria per la crittografia delle password
const jwt = require("jsonwebtoken"); // Libreria per i token JWT
const User = require("../models/User"); // Assicurati che il percorso sia corretto
const auth = require("../middleware/authMiddleware"); // Middleware per l'autenticazione
const sendEmail = require("../utils/sendEmail"); // Funzione per inviare email
const nodemailer = require("nodemailer"); // Libreria per inviare email
const speakeasy = require("speakeasy"); // Libreria per l'autenticazione a due fattori
const qrcode = require("qrcode"); // Libreria per generare codici QR

const router = express.Router();

// Funzione per generare il token di accesso (access token)
const generateAccessToken = (user) => {
  return jwt.sign(
    { email: user.email, id: user._id },
    process.env.JWT_ACCESS_SECRET, // Usa una variabile di ambiente per la chiave segreta dell'access token
    { expiresIn: "1h" } // Durata dell'access token
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
    console.log("Inizio processo di SignUp...");

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Utente già esistente");
      return res.status(400).json({ message: "Email già in uso" });
    }

    console.log("Utente non trovato, creo nuovo utente");

    const hashedPassword = await bcrypt.hash(password, 12);
    console.log("Password crittografata:", hashedPassword);

    const newUser = new User({
      nome,
      cognome,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    console.log("Nuovo utente salvato nel database");

    const accessToken = generateAccessToken(newUser);
    const refreshToken = generateRefreshToken(newUser);
    console.log("Token generati");

    newUser.refreshToken = refreshToken;
    await newUser.save();
    console.log("Refresh token salvato nel database");

    res.status(201).json({ result: newUser, accessToken, refreshToken });
  } catch (error) {
    console.error("Errore durante la registrazione:", error.message);
    res.status(500).json({ message: "Qualcosa è andato storto." });
  }
});

// Endpoint di SignIn
router.post("/signin", async (req, res) => {
  console.log("Dati ricevuti:", req.body);

  // Verifica che req.body non sia vuoto
  if (!req.body || !req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ message: "Email e password sono obbligatorie" });
  }

  const { email, password, mfaToken } = req.body;

  try {
    console.log("Tentativo di login con email:", email);

    // Trova l'utente nel database
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      console.log("Utente non trovato");
      return res.status(404).json({ message: "Utente non trovato" });
    }

    console.log("Utente trovato:", existingUser);

    // Verifica la password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    console.log("Confronto password:", isPasswordCorrect);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Credenziali non valide" });
    }

    console.log("Password corretta");

    // Controlla se l'MFA è abilitato per l'utente
    if (existingUser.mfaEnabled) {
      console.log("MFA abilitato per questo utente");
      // Se l'MFA è abilitato, verifica se il token MFA è stato inviato
      if (!mfaToken) {
        console.log("Token MFA non fornito, MFA richiesto");
        return res
          .status(200)
          .json({ message: "MFA richiesto", mfaRequired: true });
      }

      // Verifica il codice MFA usando speakeasy
      const isMfaValid = speakeasy.totp.verify({
        secret: existingUser.mfaSecret,
        encoding: "base32",
        token: mfaToken,
      });

      if (!isMfaValid) {
        console.log("Codice MFA non valido");
        return res.status(400).json({ message: "Codice MFA non valido" });
      }
      console.log("Codice MFA valido");
    }

    // Se MFA è verificato o non è abilitato, genera i token JWT
    console.log("Generazione token JWT...");
    const accessToken = generateAccessToken(existingUser);
    const refreshToken = generateRefreshToken(existingUser);
    console.log("Token JWT generati");

    // Salva il refresh token nel database
    existingUser.refreshToken = refreshToken;
    await existingUser.save();
    console.log("Refresh token salvato nel database");

    // Restituisci i token e i dati dell'utente senza includere la password
    const { nome, cognome, email, _id, mfaEnabled } = existingUser;
    return res.status(200).json({
      result: { _id, nome, cognome, email, mfaEnabled },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    // Log dell'errore completo
    console.error("Errore durante il login:", error);

    // Restituisci un messaggio di errore più dettagliato
    res.status(500).json({
      message:
        error.message ||
        "Si è verificato un errore sconosciuto durante il login.",
      stack: error.stack, // Restituisce lo stack trace per ulteriori dettagli (solo per debug)
      error: error, // Restituisce l'intero oggetto errore
    });
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

// Cambiare la password
router.put("/change-password", async (req, res) => {
  const { userId, currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(userId);

    // Verifica che l'utente esista
    if (!user) {
      return res.status(404).json({ message: "Utente non trovato" });
    }

    // Verifica che la password corrente corrisponda
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "La password corrente non è corretta" });
    }

    // Controlli di sicurezza sulla nuova password (puoi aggiungere regole personalizzate qui)
    if (newPassword.length < 3) {
      return res
        .status(400)
        .json({ message: "La nuova password deve avere almeno 8 caratteri" });
    }

    // Cripta la nuova password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Aggiorna la password dell'utente
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password aggiornata con successo" });
  } catch (error) {
    console.error("Errore durante l'aggiornamento della password:", error);
    res.status(500).json({ message: "Errore del server" });
  }
});

// Endpoint per generare il segreto MFA e il QR code
router.post("/mfa/setup", auth, async (req, res) => {
  try {
    // Trova l'utente autenticato
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "Utente non trovato." });
    }

    // Genera il segreto MFA
    const secret = speakeasy.generateSecret({
      name: `KeyCloud (${user.email})`, // Nome dell'applicazione e email dell'utente
    });

    // Genera il QR code
    qrcode.toDataURL(secret.otpauth_url, async (err, data) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Errore nella generazione del QR code." });
      }

      // Salva il segreto temporaneo nel database (ma non ancora mfaSecret)
      user.mfaSecret_temp = secret.base32;
      await user.save();

      // Ritorna il QR code e il segreto temporaneo
      res.json({ mfaSecret_temp: secret.base32, qrCode: data });
    });
  } catch (error) {
    console.error("Errore nella configurazione MFA:", error);
    res.status(500).json({ message: "Errore del server." });
  }
});

// Endpoint per verificare il codice MFA e salvare il segreto MFA nel database
router.post("/mfa/verify", auth, async (req, res) => {
  try {
    const { token } = req.body; // Il token MFA inviato dall'utente

    // Trova l'utente autenticato tramite il middleware auth
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "Utente non trovato." });
    }

    // Verifica che l'utente abbia un segreto temporaneo
    if (!user.mfaSecret_temp) {
      return res
        .status(400)
        .json({ message: "Nessun segreto MFA trovato per la verifica." });
    }

    // Verifica il codice MFA usando il segreto temporaneo
    const verified = speakeasy.totp.verify({
      secret: user.mfaSecret_temp, // Usa il segreto temporaneo per la verifica
      encoding: "base32",
      token: token, // Il token inviato dall'utente
      window: 1, // Aumenta la tolleranza temporale per evitare problemi di sincronizzazione
    });

    if (!verified) {
      return res.status(400).json({ message: "Codice MFA non valido." });
    }

    // Se il codice è corretto, salva il segreto MFA nel database
    user.mfaSecret = user.mfaSecret_temp; // Sposta il segreto temporaneo nel campo mfaSecret
    user.mfaSecret_temp = null; // Pulisci il campo temporaneo
    user.mfaEnabled = true;
    await user.save();

    // Invia una risposta di successo
    res.json({ message: "MFA verificato con successo!" });
  } catch (error) {
    console.error("Errore durante la verifica MFA:", error);
    res.status(500).json({ message: "Errore del server." });
  }
});

// Endpoint per disabilitare MFA
router.post("/mfa/disable", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "Utente non trovato." });
    }

    user.mfaEnabled = false;
    user.mfaSecret = null; // Rimuovi il segreto MFA dal database
    await user.save();

    res.json({ message: "MFA disabilitato con successo." });
  } catch (error) {
    console.error("Errore durante la disattivazione MFA:", error);
    res.status(500).json({ message: "Errore del server." });
  }
});

// Endpoint per controllare lo stato MFA dell'utente
router.get("/mfa/status", auth, async (req, res) => {
  try {
    // Trova l'utente autenticato
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "Utente non trovato." });
    }

    // Ritorna lo stato MFA (abilitato o meno)
    res.json({ mfaEnabled: user.mfaEnabled });
  } catch (error) {
    console.error("Errore durante il controllo dello stato MFA:", error);
    res.status(500).json({ message: "Errore del server." });
  }
});

module.exports = router;
