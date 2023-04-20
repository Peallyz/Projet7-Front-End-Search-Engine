const toggleSearchInput = (DOMElement) => {
  DOMElement.parentNode.classList.toggle("extended");
  DOMElement.parentNode.classList.toggle("reduced");
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
      console.log(
        element.innerText
          .toLowerCase()
          .trim()
          .includes(e.target.value.toLowerCase().trim()),
        e.target.value
      );
    });
  } else {
    list.forEach((element) => (element.style.display = "block"));
  }
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
  console.log(cleanFilteredList);
  return cleanFilteredList;
};

export {
  toggleSearchInput,
  updateTags,
  updateAvailableRecipeWithTag,
  updateAvailableRecipeWithInput,
};
