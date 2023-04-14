const toggleSearchInput = (DOMElement) => {
  DOMElement.parentNode.classList.toggle("extended");
  DOMElement.parentNode.classList.toggle("reduced");
};
export { toggleSearchInput };
