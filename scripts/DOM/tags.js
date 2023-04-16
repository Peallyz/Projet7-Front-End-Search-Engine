const handleTags = (recipes) => {
  const tagContainers = document.querySelectorAll(".container__tag");

  tagContainers.forEach((tagContainer) => {
    tagContainer.innerHTML = "";
    let currentTag = tagContainer.getAttribute("data-tag");
    tagContainer.innerHTML = "";
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

export { handleTags };
