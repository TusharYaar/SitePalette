document.addEventListener("DOMContentLoaded", function () {
  function checkWidth() {
    if (document.body.clientWidth < 558) document.querySelector("#site-overlay").classList.add("active");
    else document.querySelector("#site-overlay").remove();
  }
  getColorDataFileName(); // Calls the function to get the random colorData file
  checkWidth(); // Calls the function to check width of the screen and if smaller than 558 pixels, show the overlay
  loadSiteTemplateList(); // Loads the site template list
  getSavedColors(); // Calls the get saved color to get saved colors from localStorage
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
      // it removes the active class after a few milliseconds
      setTimeout(function () {
        removeClass(`.site-interaction > img`, "hide");
      }, 90);
      // checks the menu and removes class active from them if not required
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

  // Adds an event listener to every close icon on the page.
  // Mostly the close icons in the site-interactions menu
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

  // Add event listener to copy icon in the random color box
  document.querySelectorAll(".copy-icon").forEach(function (element) {
    element.addEventListener("click", function (e) {
      e.stopPropagation();
      var id = this.parentElement.attributes["for"].value;
      document.getElementById(id).select();
      document.execCommand("copy");
    });
  });
  // Add event listener to lock-icon in the random color
  //  This toggles the image to a red color img and a white color image

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
  // Add event Listeners to the about icons on the side of colors input to show on which classes that color is applied
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
// This function loads the list to change template from the data in templateData variable
// Called only once
function loadSiteTemplateList() {
  var ul = document.getElementById("change-template-list");
  var element;
  ul.innerHTML = "";
  templateData.forEach((item) => {
    element = `<li><label for="${item.id}">${item.name}</label><input type="radio" name="change-template-option" id="${item.id}" onclick="loadTemplate('${item.functionCallName}')" /></li>`;
    ul.insertAdjacentHTML("beforeend", element);
  });
}
// This function is called when an option is clicked in the templateBox
// it accepts the filename of the option clicked and them loads the file into
// It Makes a xhr
function loadTemplate(page) {
  showSiteMessage(`Loading ${page}, please wait...`, false);
  document.querySelector("#site-template-css").setAttribute("href", `assests/templates/styles/${page}.css`);
  var xhr = new XMLHttpRequest();
  var url = `assests/templates/html/${page}.html`;
  xhr.open("GET", url);
  xhr.send();
  // when xhr is completed, it removes the text loading
  // Loads the recieved file and
  //  calls the showClassOnHover fuction to add event listener to all the elements which has those classes
  xhr.onload = function () {
    document.querySelector("#site-template").innerHTML = this.responseText;
    messageBox.classList.remove("active");
    showClassOnHover();
  };
}
// Function to fetch a random color palette from the array and set the details of the preview box and the input field
//  It calls the setColorInputValue which apply color to the template(page)
//  and changes the value in inputs in the random color box
function getRandomColorData() {
  var value = Math.floor(Math.random() * colorData.length);
  setColorInputValue(colorData[value]);
}
function setColorInputValue(colorsArray) {
  var colors = [];
  colorsArray.forEach(function (color, index) {
    // index is limited to 5 here
    if (index < 5) {
      // Setting the value
      if (!currentColorData[index].locked) {
        currentColorData[index].color = color;
        document.querySelector(`#color${index + 1}`).value = `#${color}`;
        document.querySelector(`#color${index + 1}-parent > label> span`).style.backgroundColor = `#${color}`;
        colors.push(color);
      } else colors.push(currentColorData[index].color);
    }
  });
  // Checks if the color already saved in the colors history array , and if not, pushed the data to it
  if (!isColorAlreadySaved(colorsHistory, colors)) colorsHistory.push(colors);
  getcolorsHistory(); // calls the function to update the colors history box
  applyBasicColor(); // Calls the function to apply the colors
}
// it loops over  all the color and basic menu color arrays, to call the function to set colors
// it takes care to provide correct class, color and type
function applyBasicColor() {
  var type;
  basicColorMenu.forEach(function (element) {
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
// this function sets the color, accpeting 3 params
// class to be set the color, actual color you want to set, type of property to apply color on(backgrounColor, color, border, etc)
function setClassColor(clas, color, type) {
  // console.log(`calling for ${clas} to set ${type} ${color}`);
  document.querySelectorAll(`.${clas}`).forEach(function (item) {
    item.style[type] = `#${color}`;
  });
}
//  Function to give all the classes prsent in the basic color menu,
// Accepts a parameter to give class as class
//  default return "sc-component"
//  if true, return .sc-component
// return an array
function allSCComponents(wantClass) {
  var ids = [];
  var d;
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
// Function to add event listener to all sc-components
function showClassOnHover() {
  ids = allSCComponents(true);
  val = ids.join(", ");
  document.querySelectorAll(val).forEach(function (ele) {
    showHoverBox(ele, ele.classList, true); // Class the function which actually add the hover box
  });
}

// function to add Hover box
// Requires 3 parms
//  1 the elements to add the hover box on
// 2nd the content to display when it is hovered on that item
// 3rd a  condition which requires the checkbox(showClass variable) to be ticked to show the class, true means it requires the checkbox to be checked
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

// function to get a randon colorDatafile
function getColorDataFileName() {
  var suffix = Math.floor(Math.random() * numberOfColorDataFiles);
  var script = document.createElement("script");
  script.setAttribute("src", `assests/colorData${suffix}.js`);
  script.setAttribute("type", "text/javascript");
  document.getElementsByTagName("head")[0].appendChild(script);
}
