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
export { toggleSearchInput, updateTags };
