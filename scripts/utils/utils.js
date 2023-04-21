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
  // Utiliser un Set pour stocker les valeurs uniques
  let uniqueSet = new Set();

  // Utiliser un tableau pour stocker les valeurs uniques en respectant la casse
  let uniqueArray = [];

  // Parcourir l'array d'origine
  for (let i = 0; i < arr.length; i++) {
    // Convertir la valeur en minuscules pour éviter les doublons avec des majuscules/minuscules différentes
    let lowercaseValue = arr[i].toLowerCase();

    // Ajouter la valeur au Set seulement si elle n'existe pas déjà (en respectant la casse)
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
