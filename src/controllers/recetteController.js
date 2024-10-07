import { body, param, validationResult } from 'express-validator';
import Recipe from '../models/RecipeModel.js';

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.getAllRecipes();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getRecipeById = [
  param('id').isInt({ min: 1 }).withMessage('ID must be a positive integer'),
  handleValidationErrors,
  async (req, res) => {
    const { id } = req.params;
    try {
      const recipe = await Recipe.getRecipeById(id);

      if (!recipe) {
        return res.status(404).json({ message: 'Recipe not found' });
      }
      res.json(recipe);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
];

export const createRecipe = [
  body('title')
    .isString()
    .withMessage('Title must be a string')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 5, max: 100 })
    .withMessage('Title must be between 5 and 100 characters long')
    .custom(async (value) => {
      const exists = await Recipe.findByTitle(value);
      if (exists) {
        throw new Error('Title must be unique');
      }
      return true;
    }),
  body('ingredients')
    .isString()
    .withMessage('Ingredients must be a string')
    .notEmpty()
    .withMessage('Ingredients are required')
    .isLength({ min: 10, max: 500 })
    .withMessage('Ingredients must be between 10 and 500 characters long'),
  body('type') // Correction ici
    .isString()
    .withMessage('Recipe type must be a string')
    .notEmpty()
    .withMessage('Recipe type is required')
    .isIn(['entrée', 'plat', 'dessert'])
    .withMessage('Recipe type must be one of the following: entrée, plat, dessert'),
  
  handleValidationErrors,
  async (req, res) => {
    const { title, ingredients, type } = req.body;
    // Correction ici
    try {
      const id = await Recipe.createRecipe(title, ingredients, type); // Correction ici
      res.status(201).json({
        message: 'Recipe successfully created!',
        id,
        title,
        ingredients,
        type, // Correction ici
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
];


export const updateRecipe = [
  param('id').isInt({ min: 1 }).withMessage('ID must be a positive integer'),
  // Les autres validations ici
  handleValidationErrors, // S'assure que toutes les erreurs de validation sont traitées avant la suite
  async (req, res) => {
    const { id } = req.params;  // Assurez-vous que l'ID est bien récupéré depuis req.params
    const { title, ingredients, Type, description, date } = req.body;

    // Vérifiez l'ID avant d'appeler updateRecipe
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid recipe id' });
    }

    // Créer un objet des champs fournis pour la mise à jour
    try {
      const affectedRows = await Recipe.updateRecipe(Number(id), title, ingredients, Type, description, date);
      if (affectedRows === 0) {
        return res.status(404).json({ message: 'Recipe not found' });
      }
      res.json({ message: 'Recipe updated successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
];


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