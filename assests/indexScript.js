document.addEventListener("DOMContentLoaded", function () {
  function checkWidth() {
    if (document.body.clientWidth < 458) document.querySelector("#site-overlay").classList.add("active");
    else document.querySelector("#site-overlay").remove();
  }
  checkWidth();
  loadSiteTemplateList();
  loadColorSelectList();
  // function to add active class to the interaction buttons
  document.querySelectorAll(".site-interaction").forEach(function (element) {
    element.addEventListener("click", function (e) {
      e.stopPropagation();
      removeClass(".site-interaction", "active");
      this.classList.add("active");
      setTimeout(function () {
        removeClass(`.site-interaction > img`, "hide");
      }, 90);
      setTimeout(() => {
        this.children[0].classList.add("hide");
      }, 100);
    });
  });

  document.querySelectorAll(".close-icon").forEach(function (element) {
    element.addEventListener("click", function (e) {
      e.stopPropagation();
      e.preventDefault();
      removeClass(`#${this.parentElement.parentElement.id}`, "active");
      setTimeout(function () {
        removeClass(`.site-interaction > img`, "hide");
      }, 250);
    });
  });
  document.querySelectorAll(".copy-icon").forEach(function (element) {
    element.addEventListener("click", function (e) {
      e.stopPropagation();
      e.preventDefault();
      var id = this.parentElement.attributes["for"].value;
      document.getElementById(id).select();
      document.execCommand("copy");
    });
  });
  document.querySelectorAll(".lock-icon").forEach(function (element) {
    element.addEventListener("click", function (e) {
      e.stopPropagation();
      e.preventDefault();
      var id = this.parentElement.attributes["for"].value;
      this.classList.toggle("locked");
      console.log(id);
      arr = currentColorData.map((e) => {
        if (id === e.id) e.locked = !e.locked;
        return e;
      });
      console.log(arr);
    });
  });
});
// Function to remove class from all the elements with same selector and the class
function removeClass(string, clas) {
  document.querySelectorAll(string).forEach((element) => {
    element.classList.remove(clas);
  });
}
function loadSiteTemplateList() {
  var ul = document.getElementById("change-template-list");
  var element;
  ul.innerHTML = "";
  templateData.forEach((item) => {
    element = `<li><label for="${item.id}">${item.name}</label><input type="radio" name="change-template-option" id="${item.id}" onclick="loadTemplate('${item.functionCallName}')" /></li>`;
    ul.insertAdjacentHTML("beforeend", element);
  });
}

function loadTemplate(page) {
  document.querySelector("#site-template-css").setAttribute("href", `assests/templates/styles/${page}.css`);
  var xhr = new XMLHttpRequest();
  var url = `assests/templates/html/${page}.html`;
  xhr.open("GET", url);
  xhr.send();

  xhr.onload = function () {
    document.querySelector("#site-template").innerHTML = this.responseText;
  };
}
// Function to fetch a random color palette from the array and set the details of the preview box and the input field
function getRandomColorData() {
  var value = Math.floor(Math.random() * colorData.length);
  colorData[value].forEach(function (color, index) {
    if (index < 5) {
      if (!currentColorData[index].locked) {
        currentColorData[index].color = color;
        document.querySelector(`#color${index + 1}`).value = `#${color}`;
        document.querySelector(`#color${index + 1}-parent > label> span`).style.backgroundColor = `#${color}`;
      }
    }
  });
}
function loadColorSelectList() {
  var ul = document.getElementById("change-color-list");
  var element;
  ul.innerHTML = "";
  currentColorData.forEach(function (data) {
    console.log(data);
    element = `<li id="${data.id}-parent"><label for="${data.id}">${data.name} <span class="color-preview"></span>${copyIcon}</label><input type="text" id="${data.id}" /><label for="${data.id}">${lockIcon}</label></li>`;
    ul.insertAdjacentHTML("beforeend", element);
  });
}
