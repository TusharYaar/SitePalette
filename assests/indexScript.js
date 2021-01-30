document.addEventListener("DOMContentLoaded", function () {
  function checkWidth() {
    if (document.body.clientWidth < 558) document.querySelector("#site-overlay").classList.add("active");
    else document.querySelector("#site-overlay").remove();
  }

  checkWidth();
  loadSiteTemplateList();
  getSavedColors();
  showSiteMessage("This Site pages are NOT responsive YET", true);
  // function to add active class to the interaction buttons
  document.querySelectorAll(".site-interaction").forEach(function (element) {
    element.addEventListener("click", function (e) {
      var elementId = this.getAttribute("id");
      siteInteractionButtons.forEach(function (button) {
        if (elementId != button) {
          removeClass(`#${button}`, "active");
        }
      });
      this.classList.add("active");
      setTimeout(function () {
        removeClass(`.site-interaction > img`, "hide");
      }, 90);
      if (elementId != "saved-colors") {
        savedColorMenu.classList.remove("active");
        document.querySelector("#saved-colors > div").classList.add("hide");
      }
      if (elementId != "colors-history") {
        colorsHistoryMenu.classList.remove("active");
        document.querySelector("#saved-colors > div").classList.add("hide");
      }
      if (elementId == "colors-history" || "saved-colors") {
        document.querySelector(`#${elementId} > div`).classList.remove("hide");
      }
      setTimeout(() => {
        this.children[0].classList.add("hide");
      }, 90);
    });
  });

  // document.querySelector("#colors-history").addEventListener("click", function () {
  //   console.log(colorsHistory);
  //   var ul = document.querySelector("#colors-history-list");
  //   if (colorsHistory.length > 0) {
  //   } else ul.innerHTML = "<li>Looks Like You havn't generated any Colors, what are you waiting for, an invitation !!!</li>";
  // });

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
  document.querySelectorAll(".copy-icon").forEach(function (element) {
    element.addEventListener("click", function (e) {
      e.stopPropagation();
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
    });
  });
  document.querySelectorAll(".about-icon").forEach(function (element) {
    id = element.parentElement.attributes["for"].value.slice(5);
    id = parseInt(id);
    showHoverBox(element, basicColorMenu[id - 1].elements, false);
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
  showSiteMessage(`Loading ${page}, please wait...`, false);
  document.querySelector("#site-template-css").setAttribute("href", `assests/templates/styles/${page}.css`);
  var xhr = new XMLHttpRequest();
  var url = `assests/templates/html/${page}.html`;
  xhr.open("GET", url);
  xhr.send();

  xhr.onload = function () {
    document.querySelector("#site-template").innerHTML = this.responseText;
    messageBox.classList.remove("active");
    showClassOnHover();
  };
}
// Function to fetch a random color palette from the array and set the details of the preview box and the input field
function getRandomColorData() {
  var value = Math.floor(Math.random() * colorData.length);
  setColorInputValue(colorData[value]);
}
function setColorInputValue(colorsArray) {
  var colors = [];
  colorsArray.forEach(function (color, index) {
    if (index < 5) {
      if (!currentColorData[index].locked) {
        currentColorData[index].color = color;
        document.querySelector(`#color${index + 1}`).value = `#${color}`;
        document.querySelector(`#color${index + 1}-parent > label> span`).style.backgroundColor = `#${color}`;
        colors.push(color);
      } else colors.push(currentColorData[index].color);
    }
  });

  if (!isColorAlreadySaved(colorsHistory, colors)) colorsHistory.push(colors);
  getcolorsHistory();
  applyBasicColor();
}
function applyBasicColor() {
  var type;
  basicColorMenu.forEach(function (element, index) {
    for (i = 0; i < currentColorData.length; i++) {
      if (element.id === currentColorData[i].id) {
        type = element.type;
        element.elements.forEach(function (element) {
          setClassColor(element, currentColorData[i].color, type);
        });
      }
    }
  });
}
function setClassColor(clas, color, type) {
  // console.log(`calling for ${clas} to set ${type} ${color}`);
  document.querySelectorAll(`.${clas}`).forEach(function (item) {
    item.style[type] = `#${color}`;
  });
}
function allSCComponents(wantClass) {
  ids = [];
  basicColorMenu.forEach(function (item) {
    d = item.elements.map(function (ele) {
      if (wantClass) return `.${ele}`;
      else return ele;
    });
    ids = ids.concat(d);
  });
  idsSet = new Set(ids);
  ids = Array.from(idsSet);
  return ids;
}
function showClassOnHover() {
  ids = allSCComponents(true);
  val = ids.join(", ");
  document.querySelectorAll(val).forEach(function (ele) {
    showHoverBox(ele, ele.classList, true);
  });
}

function showHoverBox(element, content, condition) {
  element.addEventListener("mousemove", function (e) {
    e.stopPropagation();
    e.preventDefault();
    hover.style.top = e.pageY + "px";
    var left = e.pageX - 200;
    if (left < 10) left += 200;
    hover.style.left = left + "px";

    if (condition) {
      if (showClass) hover.style.display = "block";
    } else hover.style.display = "block";
    hover.innerHTML = content;
  });
  element.addEventListener("mouseleave", function (e) {
    e.stopPropagation();
    e.preventDefault();
    hover.style.display = "none";
  });
}

function changeClassHoverState() {
  box = document.getElementById("checkBox-classHover");
  showClass = box.checked;
  showSiteMessage(`Display Class on hover ${showClass ? "Activated" : "Deactivated"}`, true);
}
function saveThisColor() {
  var arr = currentColorData.map((data) => {
    return data.color;
  });
  saveColor(arr);
}

function saveColor(color) {
  var existingColors = [];
  if (localStorage.length != 0) var existingColors = JSON.parse(localStorage.getItem("savedColorData")).colors;
  if (!isColorAlreadySaved(existingColors, color)) {
    existingColors.push(color);
    var obj = {
      updated: Date.now(),
      colors: existingColors,
    };
    localStorage.setItem("savedColorData", JSON.stringify(obj));
    showSiteMessage("Your Color Palette has been saved successfully", true);
    getSavedColors();
  } else {
    showSiteMessage("The Color Palette is already Saved", true);
  }
}

function isColorAlreadySaved(existingColors, newColors) {
  for (let i = 0; i < existingColors.length; i++) {
    if (JSON.stringify(existingColors[i]) === JSON.stringify(newColors)) {
      // showSiteMessage("The Color Palette is already Saved", true);
      return true;
    }
  }
  return false;
}
function getSavedColors() {
  var obj = JSON.parse(localStorage.getItem("savedColorData"));
  if (obj && obj.colors.length > 0) showSavedColors(obj.colors);
  else {
    document.querySelector("#saved-colors-list").innerHTML = "<li>It Seems You dont have any saved color. Try by saving one</li>";
  }
}
function showSavedColors(AllColors) {
  var li;
  var div;
  var img = document.createElement("img");
  img.setAttribute("src", "./assests/icons/menu.svg");
  document.querySelector("#saved-colors-list").innerHTML = "";
  AllColors.forEach(function (colors, index) {
    li = document.createElement("li");
    li.setAttribute("id", `saved${index}`);
    colors.forEach(function (color) {
      div = document.createElement("div");
      div.style.backgroundColor = `#${color}`;
      div.setAttribute("class", "saved-color-item");
      li.insertAdjacentElement("beforeend", div);
    });
    li.insertAdjacentHTML("beforeend", `<img src="./assests/icons/menu.svg" alt=":" title="Menu" class="save-color-menu-icon" />`);
    document.querySelector("#saved-colors-list").insertAdjacentElement("beforeend", li);
  });
  addSavedMenu();
  addHoverOnColorItem(".saved-color-item");
}

function addHoverOnColorItem(element) {
  document.querySelectorAll(element).forEach(function (item) {
    showHoverBox(item, item.style.backgroundColor, false);
  });
}
function addColorHistoryMenu() {
  document.querySelectorAll(".colors-history-menu-icon").forEach(function (item) {
    item.addEventListener("click", function (e) {
      e.stopPropagation();
      var coordinate = item.getBoundingClientRect();
      // colorsHistoryMenu.style.left = item.offsetLeft + this.offsetParent.offsetLeft - 100 + 25 + "px";
      // colorsHistoryMenu.style.top = item.offsetTop + this.offsetParent.offsetTop - 5 + "px";
      colorsHistoryMenu.style.left = coordinate.left - 65 + "px";
      colorsHistoryMenu.style.top = coordinate.top - 5 + "px";
      console.log();
      colorsHistoryMenu.classList.toggle("active");
      colorsHistoryMenu.setAttribute("data", item.parentElement.getAttribute("id"));
    });
  });
}
function addSavedMenu() {
  document.querySelectorAll(".save-color-menu-icon").forEach(function (item) {
    item.addEventListener("click", function (e) {
      e.stopPropagation();
      var coordinate = item.getBoundingClientRect();
      savedColorMenu.style.left = coordinate.left - 171 + 25 + "px";
      savedColorMenu.style.top = coordinate.top - 5 + "px";
      savedColorMenu.classList.toggle("active");
      savedColorMenu.setAttribute("data", item.parentElement.getAttribute("id"));
    });
  });
}
function deleteSavedColors() {
  var id = savedColorMenu.getAttribute("data").slice(5);
  id = parseInt(id);
  var existingColors = [];
  var updatedExistingColors = [];
  existingColors = JSON.parse(localStorage.getItem("savedColorData")).colors;
  updatedExistingColors = existingColors.filter(function (color, index) {
    if (index != id) return color;
  });
  var obj = {
    updated: Date.now(),
    colors: updatedExistingColors,
  };
  localStorage.setItem("savedColorData", JSON.stringify(obj));
  savedColorMenu.classList.remove("active");
  showSavedColors(updatedExistingColors);
  showSiteMessage("Your palette has been deleted", true);
  getSavedColors();
}

function applySavedColors() {
  var id = savedColorMenu.getAttribute("data").slice(5);
  id = parseInt(id);
  var colors;
  var existingColors = [];
  existingColors = JSON.parse(localStorage.getItem("savedColorData")).colors;
  colors = existingColors[id];
  savedColorMenu.classList.remove("active");
  setColorInputValue(colors);
  showSiteMessage("Saved Colors Reloaded", true);
}

function applyHistoryColors() {
  var id = colorsHistoryMenu.getAttribute("data").slice(7);
  console.log(id);
  id = parseInt(id);
  var colors;
  // var existingColors = [];
  colors = colorsHistory[id];
  savedColorMenu.classList.remove("active");
  setColorInputValue(colors);
  showSiteMessage("History Colors Appplied", true);
}
function showSiteMessage(message, autoRemove) {
  messageBox.textContent = message;
  messageBox.classList.add("active");
  if (messageBoxInterval) clearTimeout(messageBoxInterval);
  if (autoRemove) {
    cc = setTimeout(function () {
      messageBox.classList.remove("active");
    }, 1500);
  }
}

function getcolorsHistory() {
  var li;
  var img = document.createElement("img");
  img.setAttribute("src", "./assests/icons/menu.svg");
  document.querySelector("#colors-history-list").innerHTML = "";
  colorsHistory.forEach(function (colors, index) {
    li = document.createElement("li");
    li.setAttribute("id", `history${index}`);
    colors.forEach(function (color) {
      div = document.createElement("div");
      div.style.backgroundColor = `#${color}`;
      div.setAttribute("class", "colors-history-item");
      li.insertAdjacentElement("beforeend", div);
    });
    li.insertAdjacentHTML("beforeend", `<img src="./assests/icons/menu.svg" alt=":" title="Menu" class="colors-history-menu-icon" />`);
    document.querySelector("#colors-history-list").insertAdjacentElement("beforeend", li);
  });
  addColorHistoryMenu();
  addHoverOnColorItem(".colors-history-item");
}
