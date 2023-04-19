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
        if (!tags.includes(target.ingredient ? target.ingredient : target)) {
          tags.push(target.ingredient ? target.ingredient : target);
        }
      });
    } else {
      if (!tags.includes(targets)) {
        tags.push(targets);
      }
    }
  });

  return tags;
};

const launchEventAddTag = (tagContainer) => {
  const list = document.querySelectorAll(".container__tag li");
  list.forEach((tag) => tag.addEventListener("click", (e) => addTag(e.target)));
};

const addTag = (target) => {
  const listToDisplay = document.querySelector(".tag__list ul");
  const liDOM = document.createElement("li");
  liDOM.innerText = target.innerText;

  if (target.parentNode.getAttribute("data-tag") === "ingredients") {
    liDOM.classList.add("tag__ingredient");
  } else if (target.parentNode.getAttribute("data-tag") === "appliance") {
    liDOM.classList.add("tag__device");
  } else if (target.parentNode.getAttribute("data-tag") === "ustensils") {
    liDOM.classList.add("tag__ustensil");
  }
  //Mettre  la liste de tous les tag dans une variable pour preshot le tri, l'ajout et le retrait de tag

  listToDisplay.appendChild(liDOM);
};

export { handleTags };
