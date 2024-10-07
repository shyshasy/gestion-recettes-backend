import db from '../config/db.js';

class Recipe {
  static async getAllRecipes() {
    const [results] = await db.query('SELECT * FROM recipes');
    return results;
  }

  static async getRecipeById(id) {
    const [results] = await db.query('SELECT * FROM recipes WHERE id = ?', [id]);
    return results.length > 0 ? results[0] : null;
  }

  // Ajout de la méthode findByTitle pour vérifier si le titre existe déjà
  static async findByTitle(title) {
    const [results] = await db.query('SELECT * FROM recipes WHERE title = ?', [title]);
    return results.length > 0;  // Retourne true si le titre existe, sinon false
  }

  static async createRecipe(title, ingredients, type) {
    const [result] = await db.query(
      'INSERT INTO recipes (title, ingredients, type) VALUES (?, ?, ?)',
      [title, ingredients, type] // Vérifiez que 'type' est passé ici
    );
    return result.insertId;
  }
  

  static async updateRecipe(id, title, ingredients, type, description, date) {
    // Vérifiez si l'ID est valide
    if (!id || typeof id !== 'number') {
        throw new Error('Invalid recipe id');
    }

    // Construction dynamique de la requête SQL
    const updates = [];
    const values = [];

    if (title) {
        updates.push('title = ?');
        values.push(title);
    }
    if (ingredients) {
        updates.push('ingredients = ?');
        values.push(ingredients);
    }
    if (type) {
        updates.push('type = ?');
        values.push(type);
    }
    if (description) {
        updates.push('description = ?');
        values.push(description);
    }
    if (date) {
        updates.push('date = ?');
        values.push(date);
    }

    // Si aucun champ à mettre à jour, retournez 0
    if (updates.length === 0) {
        return 0;
    }

    // Ajoutez l'ID à la fin des valeurs pour la clause WHERE
    values.push(id);

    // Construire la requête SQL de mise à jour
    const sql = `UPDATE recipes SET ${updates.join(', ')} WHERE id = ?`;

    // Exécution de la requête SQL avec les valeurs
    const [result] = await db.query(sql, values);

    // Retourner le nombre de lignes affectées
    return result.affectedRows;
}


  static async deleteRecipe(id) {
    const [result] = await db.query('DELETE FROM recipes WHERE id = ?', [id]);
    return result.affectedRows;
  }
}

export default Recipe;
