import { toggleSearchInput, updateTags } from "./utils.js";

const launchEventOnTagSearchInput = () => {
  const buttons = document.querySelectorAll("button");
  const chevrons = document.querySelectorAll(".filter__byTag span");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      toggleSearchInput(button);
    });
  });
  chevrons.forEach((chevron) => {
    chevron.addEventListener("click", () => {
      toggleSearchInput(chevron);
    });
  });
};

const launchEventUpdateTags = () => {
  const inputs = document.querySelectorAll(".tags input")
  inputs.forEach(input =>input.addEventListener("input", (e) => updateTags(e)))
}

export { launchEventOnTagSearchInput, launchEventUpdateTags };
