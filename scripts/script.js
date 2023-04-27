import { displayRecipes } from "./DOM/recipes.js";
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
