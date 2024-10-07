import Recipe from '../src/models/Recipe.js';

describe('Recipe tests', () => {
  let recipeId = null;

  it('can be create', async () => {
    const recipe = { title: 'latchirii et hako', type: 'dessert', ingredients: 'harachude, viande, feuille de hako', };
    const result = await Recipe.createRecipe(
      recipe.title,
      recipe.type,
      recipe.ingredients
    );
    expect(result).not.toBeNull();
  });

  it('can not be create', async () => {
    try {
      const recipe = {
        title: null,
        type: 'dessert',
        ingredients: 'Farine, lait, oeufs',
      };
      const result = await Recipe.createRecipe(
        recipe.title,
        recipe.type,
        recipe.ingredients
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
    const existingRecipeId = 2; 
    const recipe = await Recipe.getRecipeById(existingRecipeId);
    expect(recipe).not.toBeNull(); 
    expect(recipe.id).toBe(existingRecipeId); 
  });
  
  it('Returns null for a non-existent recipe id', async () => {
    const nonExistentId = 110; 
    const recipe = await Recipe.getRecipeById(nonExistentId);
    expect(recipe).toBeNull(); 
  });
  
  it('can be update', async () => {
    // Vérifiez que la recette existe avant de la mettre à jour
    const existingRecipe = await Recipe.getRecipeById(2);
    expect(existingRecipe).not.toBeNull(); // Vérifiez que la recette existe
    
    const updateData = {
        title: 'Crê chocolat', 
        ingredients: 'Farine, lait, oeufs, chocolat, sucre',
        type: 'dessert'
    };
    
    const result = await Recipe.updateRecipe(2, updateData); 
    expect(result).toBe(1); 
});

  

  it('can delete a recipe', async () => {
    await Recipe.deleteRecipe(1);
    const deletedRecipe = await Recipe.getRecipeById(110);
    expect(deletedRecipe).toBeNull();
  });
});
