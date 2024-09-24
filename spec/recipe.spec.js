import Recipe from '../src/models/recipeModel.js';

describe('Recipe tests', () => {
  let recipeId = null;

  it('can be create', async () => {
    const recipe = {
      title: 'crepe',
      description: 'sdkqsd',
      date: '2024-03-05',
    };
    await Recipe.createRecipe(recipe.title, recipe.description, recipe.date);
  });


  
  it("can not be create", async () => {
    try {
      const recipe = { titre: null, type: "dessert", ingredient: "farime" };
      const result = await Recipe.createRecipe(
        recipe.titre,
        recipe.type,
        recipe.ingredient
      );
      recipeId = result.insertId;
      const recipeCreated = await Recipe.getRecipeById(recipeId);
      expect(recipeId).toBeNull();
      expect(recipeCreated).toEqual([]);
    } catch (error) {
      error.message
    }
  });

  it('Can get all recipes', async () => {
    const getAll = await Recipe.getAllRecipes();
    expect(getAll).not.toBeNull();
  });

  it('Can get all recipes', async () => {
    const getAll = await Recipe.getRecipeById(28);
    expect(getAll).not.toBeNull();
  });

  it('can be update', async () => {
    const recipe = { title: 'p', description: 'sdkqsd', date: '2024-03-05' };
    const result = await Recipe.updateRecipe(
      28,
      recipe.title,
      recipe.description,
      recipe.date
    );
    recipeId = result.insertId;
    await Recipe.getRecipeById(28);
    expect(recipeId).not.toBeNull();
  });

  it('can delete a recipe', async () => {
    await Recipe.deleteRecipe(110);
    const deletedRecipe = await Recipe.getRecipeById(110);
    expect(deletedRecipe).toBeNull(); // Vérifie que la recette a bien été supprimée
  });
});
