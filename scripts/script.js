import { createRecipeDOMElements } from "./DOM/recipes.js";
import { handleTags } from "./DOM/tags.js";
import recipes from "./data/recipes.js";
import { launchEventOnTagSearchInput } from "./utils/eventListener.js";

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

  recipes.map((recipe) => {
    if (
      recipe.name.toLowerCase().trim().includes(filter.toLowerCase().trim()) ||
      recipe.description
        .toLowerCase()
        .trim()
        .includes(filter.toLowerCase().trim()) ||
      recipe.appliance
        .toLowerCase()
        .trim()
        .includes(filter.toLowerCase().trim())
    ) {
      if (!filteredList.includes(recipe)) filteredList.push(recipe);
    }

    if (!filteredList.includes(recipe)) {
      recipe.ustensils.map((ustensil) => {
        if (
          ustensil.toLowerCase().trim().includes(filter.toLowerCase().trim())
        ) {
          filteredList.push(recipe);
        }
      });
      if (!filteredList.includes(recipe)) {
        recipe.ingredients.map((ingredient) => {
          if (
            ingredient.ingredient
              .toLowerCase()
              .trim()
              .includes(filter.toLowerCase().trim())
          ) {
            filteredList.push(recipe);
          }
        });
      }
    }
  });

  displayRecipes(filteredList);
  handleTags(filteredList);

  return filteredList;
};

const init = (recipes) => {
  displayRecipes(recipes);
  handleTags(recipes);
  launchEventOnTagSearchInput();
};

init(recipes);
