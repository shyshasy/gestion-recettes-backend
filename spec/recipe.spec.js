import Recipe from "../src/models/recipeModel.js";

describe("Recipe tests", () => {
  let recipeId = null;

  it("can be create", async () => {
    const recipe = { title: "crepe", description: "sdkqsd", date: "2024-03-05" };
    const result = await Recipe.createRecipe(
      recipe.title,
      recipe.description,
      recipe.date
    );
    // recipeId = result.insertId;
    // const recipeCreated = await Recipe.getRecipeById(recipeId);
    // expect(recipeId).not.toBeNull();
    // expect(recipeCreated).not.toBeNull();
  })
  it("can not be create", async () => {
      try {
        const recipe = { title: null, description: "dessert", date: "farime" };
        const result = await Recipe.createRecipe(
          recipe.title,
          recipe.description,
          recipe.date
        );
        recipeId = result.insertId;
        const recipeCreated = await Recipe.getRecipeById(recipeId);
        expect(recipeId).toBeNull();
        expect(recipeCreated).toEqual([]);
      } catch (error) {}
    }); 

  it("Can get all recipes", async () => {
    const getAll = await Recipe.getRecipeById(100);
  expect(getAll).not.toBeNull();
});

it("can be update", async () => {
  const recipe = { title: "l", description: "sdkqsd", date: "2024-03-05" };
  const result = await Recipe.updateRecipe(
    73, 
    recipe.title,
    recipe.description,
    recipe.date
  );
  recipeId = result.insertId;
  const recipeCreated = await Recipe.getRecipeById(73);
  expect(recipeId).not.toBeNull();
})

it("can delete a recipe", async () => {
    await Recipe.deleteRecipe(110);
    const deletedRecipe = await Recipe.getRecipeById(110);
    expect(deletedRecipe).toBeNull();  // Vérifie que la recette a bien été supprimée
  });

})

