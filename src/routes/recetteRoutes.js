import express from 'express';
import { getAllRecettes, getRecetteById, createRecette, updateRecette, deleteRecette } from '../controllers/recetteController.js';
import { validateRecette } from '../controllers/recetteController.js';

const router = express.Router();

router.get('/recipes', getAllRecettes);
router.get('/recipes/:id', getRecetteById);

// Appliquer le validateur ici avant la création de la recette
router.post('/recipes', validateRecette, createRecette);

router.put('/recipes/:id', updateRecette);
router.delete('/recipes/:id', deleteRecette);

export default router;
