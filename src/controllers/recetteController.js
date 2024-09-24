import { body, param, validationResult } from 'express-validator';
import Recipe from '../models/recipeModel.js'; // On utilise la classe Recipe avec méthodes statiques

// Middleware de validation des erreurs
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Récupérer toutes les recettes
export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.getAllRecipes();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Récupérer une recette par ID avec validation de l'ID
export const getRecipeById = [
  param('id').isInt({ min: 1 }).withMessage('ID must be a positive integer'), // Validation améliorée pour s'assurer que l'ID est un entier positif
  handleValidationErrors,
  async (req, res) => {
    const { id } = req.params;
    try {
      const recipe = await Recipe.getRecipeById(id);
      if (!recipe.length) {
        return res.status(404).json({ message: 'Recipe not found' });
      }
      res.json(recipe[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
];

// Créer une nouvelle recette avec validation des champs
export const createRecipe = [
  body('title')
    .isString()
    .withMessage('Title must be a string')
    .notEmpty()
    .withMessage('Title is required'),
  body('description')
    .isString()
    .withMessage('Description must be a string')
    .notEmpty()
    .withMessage('Description is required'),
  body('date').isDate().withMessage('Date must be a valid date'),
  handleValidationErrors,
  async (req, res) => {
    const { title, description, date } = req.body;
    try {
      const id = await Recipe.createRecipe(title, description, date);
      res.status(201).json({
        message: 'Recipe successfully created!',
        id,
        title,
        description,
        date,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
];

// Mettre à jour une recette existante avec validation
export const updateRecipe = [
  param('id').isInt({ min: 1 }).withMessage('ID must be a positive integer'),
  body('title').optional().isString().withMessage('Title must be a string'),
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string'),
  body('date').optional().isDate().withMessage('Date must be a valid date'),
  handleValidationErrors,
  async (req, res) => {
    const { id } = req.params;
    const { title, description, date } = req.body;
    try {
      const affectedRows = await Recipe.updateRecipe(
        id,
        title,
        description,
        date
      );
      if (affectedRows === 0) {
        return res.status(404).json({ message: 'Recipe not found' });
      }
      res.json({ message: 'Recipe updated successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
];

// Supprimer une recette avec validation de l'ID
export const deleteRecipe = [
  param('id').isInt({ min: 1 }).withMessage('ID must be a positive integer'),
  handleValidationErrors,
  async (req, res) => {
    const { id } = req.params;
    try {
      const affectedRows = await Recipe.deleteRecipe(id);
      if (affectedRows === 0) {
        return res.status(404).json({ message: 'Recipe not found' });
      }
      res.json({ message: 'Recipe deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
];
