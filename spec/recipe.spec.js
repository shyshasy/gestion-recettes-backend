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
  //   recipeId = result.insertId;
  //   const recipeCreated = await Recipe.getRecipeById(recipeId);
  //   expect(recipeId).not.toBeNull();
  //   expect(recipeCreated).not.toBeNull();
  // })  

})

it("can retrieve a recipe by ID", async () => {
  const recipeRetrieved = await Recipe.getRecipeById(recipeId);
  expect(recipeRetrieved).not.toEqual([]);  // Vérifie que la recette a bien été récupérée
});

it("can not be create", async () => {
  try {
    const recipe = { title: null, description: "dessert", date: "farime" };
    const result = await Recipe.createRecipe(
      recipe.title,
      recipe.description,
      recipe.date
    );
    // recipeId = result.insertId;
    // const recipeCreated = await Recipe.getRecipeById(recipeId);
    // expect(recipeId).toBeNull();
    // expect(recipeCreated).toEqual([]);
  } catch (error) {}
});

})
