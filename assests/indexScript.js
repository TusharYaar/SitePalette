document.addEventListener("DOMContentLoaded", function () {
  function checkWidth() {
    if (document.body.clientWidth < 458) document.querySelector("#site-overlay").classList.add("active");
    else document.querySelector("#site-overlay").remove();
  }
  checkWidth();
  loadSiteTemplateList();
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
      // console.log(id);
      arr = currentColorData.map((e) => {
        if (id === e.id) {
          e.locked = !e.locked;
          if (e.locked) {
            id = e.id;
            img = document.querySelector(`#${id}-parent img.lock-icon`);
            img.setAttribute("src", lockedIcon);
          } else img.setAttribute("src", lockIcon);
          return e;
        }
      });
      // console.log(arr);
    });
  });
  document.querySelectorAll(".about-icon").forEach(function (element) {
    var hover = document.querySelector("#change-color-about-hover");
    element.addEventListener("mouseenter", function (e) {
      e.stopPropagation();
      e.preventDefault();
      hover.style.top = e.pageY + "px";
      hover.style.left = e.pageX - 200 + "px";
      var id = this.parentElement.attributes["for"].value.slice(5);
      parseInt(id);
      // console.log(e.pageX);
      hover.style.display = "block";
      hover.innerHTML = basicColorMenu[id - 1].elements;
    });
    element.addEventListener("mouseleave", function (e) {
      hover.style.display = "none";
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
  applyBasicColor();
}
function applyBasicColor() {
  currentColorData.forEach(function (color, index) {
    if (color.id === basicColorMenu[index].id) {
      var type = basicColorMenu[index].type;
      basicColorMenu[index].elements.forEach(function (element) {
        // console.log(element);
        setClassColor(element, color.color, type);
      });
    }
  });
}
function setClassColor(clas, color, type) {
  // console.log(`calling for ${clas} to set ${type} ${color}`);
  document.querySelectorAll(`.${clas}`).forEach(function (item) {
    item.style[type] = `#${color}`;
  });
}
