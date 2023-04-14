import { toggleSearchInput } from "./utils.js";

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

export { launchEventOnTagSearchInput };
