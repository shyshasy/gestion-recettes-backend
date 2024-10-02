import Recipe from '../src/models/RecipeModel.js';

describe('Recipe tests', () => {
  let recipeId = null;

  it('can be create', async () => {
    const recipe = { title: 'crepe', description: 'dessert', date: '2024-6-9' };
    const result = await Recipe.createRecipe(
      recipe.title,
      recipe.description,
      recipe.date
    );
    expect(result).not.toBeNull();
  });

  it('can not be create', async () => {
    try {
      const recipe = {
        title: null,
        description: 'dessert',
        date: '2024-09-08',
      };
      const result = await Recipe.createRecipe(
        recipe.title,
        recipe.description,
        recipe.date
      );
      recipeId = result.insertId;
      const recipeCreated = await Recipe.getRecipeById(recipeId);
      expect(recipeId).toBeNull();
      expect(recipeCreated).toEqual([]);
    } catch (error) {
      error.message;
    }
  });

  it('Can get all recipes', async () => {
    const getAll = await Recipe.getAllRecipes();
    expect(getAll).not.toBeNull();
  });

  it('Can get a recipe by id', async () => {
    const existingRecipeId = 2; // Utilisez un ID qui existe
    const recipe = await Recipe.getRecipeById(existingRecipeId);
    expect(recipe).not.toBeNull(); // Vérifiez que le résultat n'est pas null
    expect(recipe.id).toBe(existingRecipeId); // Vérifiez que l'ID est correct
  });
  
  it('Returns null for a non-existent recipe id', async () => {
    const nonExistentId = 110; // Un ID qui n'existe pas
    const recipe = await Recipe.getRecipeById(nonExistentId);
    expect(recipe).toBeNull(); // Vérifiez que le résultat est bien null
  });
  
  it('can be update', async () => {
    // Vérifiez que la recette existe avant de la mettre à jour
    const existingRecipe = await Recipe.getRecipeById(2);
    expect(existingRecipe).not.toBeNull(); // Vérifiez que la recette existe
    
    const updateData = {
        title: 'Crê chocolat', // Changer le titre
        ingredients: 'Farine, lait, oeufs, chocolat, sucre',
        type: 'dessert'
    };
    
    const result = await Recipe.updateRecipe(2, updateData); // Utilisez l'ID de la recette existante
    expect(result).toBe(1); // Vérifiez que l'update a bien été effectué
});

  

  it('can delete a recipe', async () => {
    await Recipe.deleteRecipe(1);
    const deletedRecipe = await Recipe.getRecipeById(110);
    expect(deletedRecipe).toBeNull();
  });
});
