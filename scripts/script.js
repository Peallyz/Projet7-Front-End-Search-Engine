import { createRecipeDOMElements } from "./DOM/recipes.js";
import { handleTags } from "./DOM/tags.js";
import recipes from "./data/recipes.js";
import { launchEventOnTagSearchInput, launchEventUpdateTags } from "./utils/eventListener.js";

const displayRecipes = (recipes) => {
  const recipesSection = document.querySelector(".recipes");
  recipesSection.innerHTML = "";
  const currentRecipe = createRecipeDOMElements(recipes);
  currentRecipe.forEach((recipe) => recipesSection.appendChild(recipe));
};

const mainSearchInput = document.querySelector("#main__research");

mainSearchInput.addEventListener("input", (e) => {
  if (e.target.value.length >= 3) {
    updateAvailableRecipe(e.target.value, recipes);
  } else {
    displayRecipes(recipes);
    handleTags(recipes);
  }
});

const updateAvailableRecipe = (filter, recipes) => {
  let filteredList = [];

  for (let recipe of recipes) {
    if (
      recipe.name.toLowerCase().trim().indexOf(filter.toLowerCase().trim()) >
        -1 ||
      recipe.description
        .toLowerCase()
        .trim()
        .indexOf(filter.toLowerCase().trim()) > -1 ||
      recipe.appliance
        .toLowerCase()
        .trim()
        .indexOf(filter.toLowerCase().trim()) > -1
    ) {
      filteredList.push(recipe);

      continue;
    }

    for (let ustensil of recipe.ustensils) {
      if (ustensil.toLowerCase().trim().indexOf(filter) > -1) {
        filteredList.push(recipe);
        break;
      }
    }

    for (let ingredient of recipe.ingredients) {
      if (ingredient.ingredient.toLowerCase().trim().indexOf(filter) > -1) {
        filteredList.push(recipe);
        break;
      }
    }
  }
  displayRecipes(filteredList);
  handleTags(filteredList);
  return filteredList;
};

const init = (recipes) => {
  displayRecipes(recipes);
  handleTags(recipes);
  launchEventOnTagSearchInput();
  launchEventUpdateTags();
};

init(recipes);
