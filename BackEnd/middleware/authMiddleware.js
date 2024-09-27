// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      console.log(
        "Autenticazione fallita: Nessun header di autorizzazione trovato."
      );
      return res
        .status(401)
        .json({ message: "Autenticazione fallita! Nessun token fornito." });
    }

    const token = authHeader.split(" ")[1]; // Assume il formato "Bearer token"
    console.log("Token JWT ricevuto:", token);

    // Verifica il token
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    console.log("Token decodificato:", decoded); // Log per il debug
    req.userId = decoded.id; // Salva l'ID utente decodificato nella richiesta

    next();
  } catch (error) {
    console.error("Errore di autenticazione:", error.message);
    res.status(401).json({ message: "Autenticazione fallita!" });
  }
};

module.exports = auth;
