// import db from '../config-copy/db-sy.js';
import db from '../config/db.js'

// Récupérer toutes les recettes
export const getAllRecipes = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM recipes');
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Récupérer une recette par ID
export const getRecipeById = async (req, res) => {
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
};

// Créer une nouvelle recette
export const createRecipe = async (req, res) => {
    const { title, description, date } = req.body;
    try {
        const [result] = await db.query('INSERT INTO recipes (title, description, date) VALUES (?, ?, ?)', [title, description, date]);
        res.status(201).json({ id: result.insertId, title, description, date });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Mettre à jour une recette existante
export const updateRecipe = async (req, res) => {
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
};

// Supprimer une recette
export const deleteRecipe = async (req, res) => {
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
};
