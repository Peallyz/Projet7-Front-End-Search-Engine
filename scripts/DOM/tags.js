import { updateAvailableRecipe } from "../script.js";
import { closeInputSearchTag, removeDuplicate } from "../utils/utils.js";

const handleTags = (recipes) => {
  const tagContainers = document.querySelectorAll(".container__tag");

  tagContainers.forEach((tagContainer) => {
    tagContainer.innerHTML = "";
    let currentTag = tagContainer.getAttribute("data-tag");
    let tags;

    switch (currentTag) {
      case "ingredients":
        tags = captureTags(currentTag, recipes);
        break;
      case "appliance":
        tags = captureTags(currentTag, recipes);
        break;
      case "ustensils":
        tags = captureTags(currentTag, recipes);
        break;
      default:
        break;
    }

    tags.forEach((tag) => {
      const tagDOMli = document.createElement("li");
      tagDOMli.innerText = tag;
      tagContainer.appendChild(tagDOMli);
    });
  });
  launchEventAddTag();
};

const captureTags = (option, recipes) => {
  let targets;

  const allSelectedTags = document.querySelectorAll(".tag__list ul li");
  let tagList = "";
  allSelectedTags.forEach((tag) => (tagList += `${tag.innerText} `));

  const tags = [];
  recipes.forEach((recipe) => {
    if (option === "ingredients") {
      targets = recipe.ingredients;
    } else if (option === "ustensils") {
      targets = recipe.ustensils;
    } else if (option === "appliance") {
      targets = recipe.appliance;
    }

    if (Array.isArray(targets)) {
      targets.forEach((target) => {
        if (
          !tags.includes(target.ingredient ? target.ingredient : target) &&
          !tagList
            .toLowerCase()
            .trim()
            .includes(
              target.ingredient
                ? target.ingredient.toLowerCase().trim()
                : target.toLowerCase().trim()
            )
        ) {
          tags.push(target.ingredient ? target.ingredient : target);
        }
      });
    } else {
      if (
        !tags.includes(targets) &&
        !tagList.toLowerCase().trim().includes(targets.toLowerCase().trim())
      ) {
        tags.push(targets);
      }
    }
  });

  return removeDuplicate(tags);
};

const launchEventAddTag = () => {
  const list = document.querySelectorAll(".container__tag li");
  list.forEach((tag) => tag.addEventListener("click", (e) => addTag(e.target)));
};

const addTag = (target) => {
  closeInputSearchTag();
  const listToDisplay = document.querySelector(".tag__list ul");
  const liDOM = document.createElement("li");
  liDOM.innerHTML = `<p>${target.innerText}</p> <img src="./assets/delete.svg" alt="Delete tag"/>`;

  if (target.parentNode.getAttribute("data-tag") === "ingredients") {
    liDOM.classList.add("tag__list--ingredient");
  } else if (target.parentNode.getAttribute("data-tag") === "appliance") {
    liDOM.classList.add("tag__list--device");
  } else if (target.parentNode.getAttribute("data-tag") === "ustensils") {
    liDOM.classList.add("tag__list--ustensil");
  }

  listToDisplay.appendChild(liDOM);

  const filterInputValue = document.querySelector("#main__research").value;

  updateAvailableRecipe(filterInputValue);
};

export { handleTags };
