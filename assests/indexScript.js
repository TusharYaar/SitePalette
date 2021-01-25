document.addEventListener("DOMContentLoaded", function () {
  function checkWidth() {
    if (document.body.clientWidth < 458) document.querySelector("#site-overlay").classList.add("active");
    else document.querySelector("#site-overlay").remove();
  }
  checkWidth();
  // function to add active class to the interaction buttons
  document.querySelectorAll(".site-interaction").forEach(function (element) {
    element.addEventListener("click", function (e) {
      e.stopPropagation();
      removeClass(".site-interaction", "active");
      this.classList.add("active");
      setTimeout(() => {
        this.children[0].classList.add("hide");
      }, 100);
    });
  });

  document.querySelectorAll(".close-icon").forEach(function (element) {
    element.addEventListener("click", function (e) {
      e.stopPropagation();
      removeClass(`#${this.parentElement.parentElement.id}`, "active");
      setTimeout(function () {
        removeClass(`.site-interaction > img`, "hide");
      }, 250);
    });
  });
});
// Function to remove class from all the elements with same selector and the class
function removeClass(string, clas) {
  document.querySelectorAll(string).forEach((element) => {
    element.classList.remove(clas);
  });
}
function load_home(page) {
  document.getElementById("site-template").innerHTML = `<object type="text/html" data="./assests/templates/html/${page}.html" ></object>`;
}

// Function to fetch a random color palette from the array and set the details of the preview box and the input field
function getRandomColorData() {
  var value = Math.floor(Math.random() * colorData.length);
  colorData[value].forEach(function (color, index) {
    if (index < 4) {
      document.querySelector(`#color${index + 1}`).value = `#${color}`;
      document.querySelector(`#color${index + 1}-parent > label> span`).style.backgroundColor = `#${color}`;
    }
  });
}
