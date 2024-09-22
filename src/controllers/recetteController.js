import { body, param, validationResult } from 'express-validator';
import db from '../config/db.js';

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
        const [results] = await db.query('SELECT * FROM recipes');
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Récupérer une recette par ID avec validation de l'ID
export const getRecipeById = [
    param('id').isInt().withMessage('ID must be an integer'),
    handleValidationErrors,
    async (req, res) => {
        const { id } = req.params;
        try {
            const [results] = await db.query('SELECT * FROM recipes WHERE id = ?', [id]);
            if (results.length === 0) {
                return res.status(404).json({ message: 'Recipe not found' });
            }
            res.json(results[0]);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
];

// Créer une nouvelle recette avec validation des champs
export const createRecipe = [
    body('title').isString().withMessage('Title must be a string').notEmpty().withMessage('Title is required'),
    body('description').isString().withMessage('Description must be a string').notEmpty().withMessage('Description is required'),
    body('date').isDate().withMessage('Date must be a valid date'),
    handleValidationErrors,
    async (req, res) => {
        const { title, description, date } = req.body;
        try {
            const [result] = await db.query('INSERT INTO recipes (title, description, date) VALUES (?, ?, ?)', [title, description, date]);
            res.status(201).json({ id: result.insertId, title, description, date });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
];

// Mettre à jour une recette existante avec validation
export const updateRecipe = [
    param('id').isInt().withMessage('ID must be an integer'),
    body('title').optional().isString().withMessage('Title must be a string'),
    body('description').optional().isString().withMessage('Description must be a string'),
    body('date').optional().isDate().withMessage('Date must be a valid date'),
    handleValidationErrors,
    async (req, res) => {
        const { id } = req.params;
        const { title, description, date } = req.body;
        try {
            const [result] = await db.query('UPDATE recipes SET title = ?, description = ?, date = ? WHERE id = ?', [title, description, date, id]);
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Recipe not found' });
            }
            res.json({ message: 'Recipe updated successfully' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
];

// Supprimer une recette avec validation de l'ID
export const deleteRecipe = [
    param('id').isInt().withMessage('ID must be an integer'),
    handleValidationErrors,
    async (req, res) => {
        const { id } = req.params;
        try {
            const [result] = await db.query('DELETE FROM recipes WHERE id = ?', [id]);
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Recipe not found' });
            }
            res.json({ message: 'Recipe deleted successfully' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
];
