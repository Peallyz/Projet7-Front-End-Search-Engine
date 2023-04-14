import { createRecipeDOMElements } from "./DOM/recipes.js";
import { handleTags } from "./DOM/tags.js";
import recipes from "./data/recipes.js";
import { launchEventOnTagSearchInput } from "./utils/eventListener.js";

const displayRecipes = (recipes) => {
  const recipesSection = document.querySelector(".recipes");
  const currentRecipe = createRecipeDOMElements(recipes);
  currentRecipe.forEach((recipe) => recipesSection.appendChild(recipe));
};

const init = (recipes) => {
  displayRecipes(recipes);
  handleTags(recipes);
  launchEventOnTagSearchInput();
};

init(recipes);
