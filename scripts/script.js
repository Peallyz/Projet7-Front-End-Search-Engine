import recipes from "./data/recipes.js";

const recipesSection = document.querySelector(".recipes");

for (let i = 0; i < recipes.length; i++) {
  let ingredientsList = "";
  for (let j = 0; j < recipes[i].ingredients.length; j++) {
    const ingredient = `<li>${recipes[i].ingredients[j].ingredient}${
      recipes[i].ingredients[j].quantity
        ? ": " + recipes[i].ingredients[j].quantity
        : ""
    } ${
      recipes[i].ingredients[j].unit ? recipes[i].ingredients[j].unit : ""
    }</li>`;

    ingredientsList += ingredient;
  }
  const recipesTemplate = document.createElement("article");
  recipesTemplate.innerHTML = `<article>
      <div class="img"></div>
      <div class="content">
        <div class="content__main">
          <h2>${recipes[i].name}</h2>
          <div class="time">
            <img
              src="./assets/clock.svg"
              alt="Horloge indiquant le temps de préparation du plat"
            />
            <p>${recipes[i].time} min</p>
          </div>
        </div>
        <div class="content__sub">
          <div class="ingredient">
            ${ingredientsList}
          </div>
          <div class="details">
            <p>${recipes[i].description}</p>
          </div>
        </div>
      </div>
    </article>
    `;

  recipesSection.appendChild(recipesTemplate);
}
