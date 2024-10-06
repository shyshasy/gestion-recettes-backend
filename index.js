// index.js
import express from 'express';
import recetteRoutes from './src/routes/RecetteRoute.js';

const app = express();
const PORT = process.env.PORT || 4000; // Changez le port ici

app.use(express.json());
app.use('/api', recetteRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
