const toggleSearchInput = (DOMElement) => {
  DOMElement.parentNode.classList.toggle("extended");
  DOMElement.parentNode.classList.toggle("reduced");
};

const updateTags = (e) => {
  if(e.target.value >= 3){
    const list = e.target.nextElementSibling.querySelectorAll("li");
    list.forEach(element => console.log(element.innerText))
  }else{
    console.log("Ok");
  }
  }
export { toggleSearchInput,updateTags };
