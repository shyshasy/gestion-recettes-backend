// index.js
import express from 'express';
import recetteRoutes from './src/routes/recetteRoutes.js';

const app = express();
const PORT = process.env.PORT || 3200; // Changez le port ici

app.use(express.json());
app.use('/api', recetteRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
