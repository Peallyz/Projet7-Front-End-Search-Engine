const createRecipeDOMElements = (recipes) => {
  const allRecipesDOMElement = [];

  recipes.forEach((recipe) => {
    const recipesTemplate = document.createElement("article");
    recipesTemplate.innerHTML = `<div class="img"></div>
      <div class="content">
        <div class="content__main">
          <h2>${recipe.name}</h2>
          <div class="time">
            <img
              src="./assets/clock.svg"
              alt="Horloge indiquant le temps de préparation du plat"
            />
            <p>${recipe.time} min</p>
          </div>
        </div>
        <div class="content__sub">
          <div class="ingredient">
	    	<ul>
      	${captureIngredient(recipe)}
	    	</ul>
          </div>
          <div class="details">
            <p>${recipe.description}</p>
          </div>
        </div>
      </div>
    `;
    allRecipesDOMElement.push(recipesTemplate);
  });
  return allRecipesDOMElement;
};

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

const captureIngredient = (recipe) => {
  let ingredientsList = "";

  recipe.ingredients.forEach((el) => {
    const ingredient = `<li>${el.ingredient}${
      el.quantity ? ": " + el.quantity : ""
    } ${el.unit ? el.unit : ""}</li>`;
    ingredientsList += ingredient;
  });

  return ingredientsList;
};

export { createRecipeDOMElements, displayRecipes };
