lockIcon = `./assests/icons/lock.svg`;
lockedIcon = `./assests/icons/locked.svg`;
// Adds an event listener to every close icon on the page.
// Mostly the close icons in the site-interactions menu
document.addEventListener("DOMContentLoaded",function(){
document.querySelectorAll(".close-icon").forEach(function (element) {
  element.addEventListener("click", function (e) {
    e.stopPropagation();
    savedColorMenu.classList.remove("active");
    removeClass(`#${this.parentElement.parentElement.id}`, "active");
    setTimeout(function () {
      removeClass(`.site-interaction > img`, "hide");
    }, 250);
    savedColorMenu.classList.remove();
  });
});

// Add event Listeners to the about icons on the side of colors input to show on which classes that color is applied
document.querySelectorAll(".about-icon").forEach(function (element) {
  id = element.parentElement.attributes["for"].value.slice(5);
  id = parseInt(id);
  showHoverBox(element, basicColorMenu[id - 1].elements, false);
});

// Add event listener to lock-icon in the random color
//  This toggles the image to a red color img and a white color image

document.querySelectorAll(".lock-icon").forEach(function (element) {
  element.addEventListener("click", function (e) {
    e.stopPropagation();
    e.preventDefault();
    if(this.classList.contains("fa-unlock"))
    this.classList.replace("fa-unlock", "fa-lock");
    else 
    this.classList.replace("fa-lock", "fa-unlock");
    this.classList.add("clicked");
    var id = parseInt(this.getAttribute("parent-data"));
    currentColorData[id-1].locked = !currentColorData[id-1].locked;
  });
});

// Add event listener to copy icon in the random color box
document.querySelectorAll(".copy-icon").forEach(function (element) {
  element.addEventListener("click", function (e) {
    e.stopPropagation();
    var id = this.parentElement.attributes["for"].value;
    document.getElementById(id).select();
    document.execCommand("copy");
  });
});
});