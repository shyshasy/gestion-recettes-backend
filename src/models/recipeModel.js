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
  

  static async updateRecipe(id, fieldsToUpdate) {
    const keys = Object.keys(fieldsToUpdate);
    const values = Object.values(fieldsToUpdate);

    // Vérifiez si l'ID est valide
    if (!id || typeof id !== 'number') {
        throw new Error('Invalid recipe id');
    }

    if (keys.length === 0) return 0;

    
    const setClause = keys.map(() => `?`).join(', ');
    
    
    values.push(id);
    
    
    const sql = `UPDATE recipes SET ${keys.join(' = ?, ')} = ? WHERE id = ?`;

   
    const [result] = await db.query(sql, [...values]);

    return result.affectedRows;
}


  static async deleteRecipe(id) {
    const [result] = await db.query('DELETE FROM recipes WHERE id = ?', [id]);
    return result.affectedRows;
  }
}

export default Recipe;
