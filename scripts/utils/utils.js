import { updateAvailableRecipe } from "../script.js";

const toggleSearchInput = (DOMElement, option) => {
  closeInputSearchTag();
  if (option === "open") {
    DOMElement.parentNode.classList.add("extended");
  } else if (option === "close") {
    DOMElement.parentNode.classList.remove("extended");
  }
};

const removeDuplicate = (arr) => {
  let uniqueSet = new Set();

  let uniqueArray = [];

  for (let i = 0; i < arr.length; i++) {
    let lowercaseValue = arr[i].toLowerCase();

    if (!uniqueSet.has(lowercaseValue)) {
      uniqueSet.add(lowercaseValue);
      uniqueArray.push(arr[i]);
    }
  }

  return uniqueArray;
};

const closeInputSearchTag = () => {
  const allTagsInput = document.querySelectorAll(".filter__byTag div");
  allTagsInput.forEach((element) => element.classList.remove("extended"));
};

const updateTags = (e) => {
  const list = e.target.nextElementSibling.querySelectorAll("li");
  if (e.target.value.length >= 3) {
    list.forEach((element) => {
      if (
        !element.innerText
          .toLowerCase()
          .trim()
          .includes(e.target.value.toLowerCase().trim())
      ) {
        element.style.display = "none";
      }
    });
  } else {
    list.forEach((element) => (element.style.display = "block"));
  }
};

const removeTag = (e) => {
  e.target.parentNode.remove();

  const filterInputValue = document.querySelector("#main__research").value;

  updateAvailableRecipe(filterInputValue);
};

const updateAvailableRecipeWithInput = (recipes, filter, filteredList) => {
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
  return filteredList;
};
const updateAvailableRecipeWithTag = (filteredList, allSelectedTags) => {
  let cleanFilteredList = [...filteredList];
  allSelectedTags.forEach((tag) => {
    if (tag.classList.value.includes("ingredient")) {
      cleanFilteredList = [...cleanFilteredList].filter((recipe) => {
        let ingredientsList = "";
        recipe.ingredients.forEach(
          (element) => (ingredientsList += element.ingredient)
        );

        return ingredientsList
          .toLowerCase()
          .trim()
          .includes(tag.innerText.toLowerCase().trim());
      });
    } else if (tag.classList.value.includes("device")) {
      cleanFilteredList = [...cleanFilteredList].filter(
        (recipe) =>
          recipe.appliance.toLowerCase().trim() ===
          tag.innerText.toLowerCase().trim()
      );
    } else if (tag.classList.value.includes("ustensil")) {
      cleanFilteredList = [...cleanFilteredList].filter((recipe) =>
        recipe.ustensils
          .join("")
          .toLowerCase()
          .trim()
          .includes(tag.innerText.toLowerCase().trim())
      );
    }
  });

  return cleanFilteredList;
};

export {
  toggleSearchInput,
  updateTags,
  updateAvailableRecipeWithTag,
  updateAvailableRecipeWithInput,
  removeTag,
  closeInputSearchTag,
  removeDuplicate,
};
