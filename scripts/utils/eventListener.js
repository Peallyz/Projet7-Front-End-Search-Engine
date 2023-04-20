import { removeTag, toggleSearchInput, updateTags } from "./utils.js";

const launchEventOnTagSearchInput = () => {
  const buttons = document.querySelectorAll("button");
  const chevrons = document.querySelectorAll(".filter__byTag span");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      toggleSearchInput(button, "open");
    });
  });
  chevrons.forEach((chevron) => {
    chevron.addEventListener("click", () => {
      toggleSearchInput(chevron, "close");
    });
  });
};

const launchEventUpdateTags = () => {
  const inputs = document.querySelectorAll(".tags input");
  inputs.forEach((input) =>
    input.addEventListener("input", (e) => updateTags(e))
  );
};

const launchEventOnDeleteTag = () => {
  const deleteTagCross = document.querySelectorAll(".tag__list li img");

  deleteTagCross.forEach((deleteIcon) =>
    deleteIcon.addEventListener("click", (e) => removeTag(e))
  );
};

export {
  launchEventOnTagSearchInput,
  launchEventUpdateTags,
  launchEventOnDeleteTag,
};
