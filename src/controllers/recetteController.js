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
