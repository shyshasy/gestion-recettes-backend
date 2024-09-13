const express = require('express');
const app = express();
const port = 3020;

// Middleware pour gérer les requêtes JSON
app.use(express.json());

// Route de base
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur Express démarré sur http://localhost:${port}`);
});
