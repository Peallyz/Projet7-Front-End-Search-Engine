import { createRecipeDOMElements } from "./DOM/recipes.js";
import { handleTags } from "./DOM/tags.js";
import recipes from "./data/recipes.js";
import {
  launchEventOnDeleteTag,
  launchEventOnTagSearchInput,
  launchEventUpdateTags,
} from "./utils/eventListener.js";
import {
  updateAvailableRecipeWithInput,
  updateAvailableRecipeWithTag,
} from "./utils/utils.js";

const displayRecipes = (recipes) => {
  const recipesSection = document.querySelector(".recipes");
  recipesSection.innerHTML = "";
  if (recipes.length > 0) {
    const currentRecipe = createRecipeDOMElements(recipes);
    currentRecipe.forEach((recipe) => recipesSection.appendChild(recipe));
  } else {
    const noRecipeMessage = document.createElement("h2");
    noRecipeMessage.innerText = `Aucune recette ne correspond à votre critère… vous pouvez
chercher « tarte aux pommes », « poisson », etc.`;
    recipesSection.appendChild(noRecipeMessage);
  }
};

const mainSearchInput = document.querySelector("#main__research");

mainSearchInput.addEventListener("input", (e) => {
  updateAvailableRecipe(e.target.value);
});

const updateAvailableRecipe = (filter) => {
  let filteredList = [];

  const allSelectedTags = document.querySelectorAll(".tag__list ul li");

  if (filter.length >= 3) {
    filteredList = updateAvailableRecipeWithInput(
      recipes,
      filter,
      filteredList
    );
  } else {
    filteredList = [...recipes];
  }

  if (allSelectedTags.length > 0) {
    filteredList = updateAvailableRecipeWithTag(filteredList, allSelectedTags);
  }

  displayRecipes(filteredList);
  handleTags(filteredList);
  launchEventOnDeleteTag();

  return filteredList;
};

const init = (recipes) => {
  displayRecipes(recipes);
  handleTags(recipes);
  launchEventOnTagSearchInput();
  launchEventUpdateTags();
};

init(recipes);

export { updateAvailableRecipe };
