document.addEventListener("DOMContentLoaded", function () {
  function checkWidth() {
    if (document.body.clientWidth < 330)
      document.querySelector("#site-overlay").classList.add("active");
    else document.querySelector("#site-overlay").remove();
  }
  document.addEventListener("keydown", function (e) {
    // console.log(e)
    var changeColorActive = document
      .querySelector("#change-color")
      .classList.contains("active");
    if (e.keyCode === 67 && !changeColorActive) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      getRandomColorData();
    }
    //  if(e.keyCode === 13 && changeColorActive) {
    //    applyBasicColor();
    //  }
  });
  getColorDataFileName(); // Calls the function to get the random colorData file
  checkWidth(); // Calls the function to check width of the screen and if smaller than 558 pixels, show the overlay
  loadSiteTemplateList(); // Loads the site template list
  getSavedColors(); // Calls the get saved color to get saved colors from localStorage
  loadTemplate("landingPage, Landing Page, false");
  // loadTemplate("previewDocument,Shopping Site,true");

  // showSiteMessage("New to the site!!! Start by taking a basic tour", true, 1500);
  showSiteMessage(
    `New to the site!!! Start by taking a basic tour` + tourPopup,
    true,
    5000
  );
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
        document.querySelector("#saved-colors > div").classList.add("hide");
      }
      if (elementId != "colors-history") {
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

  document
    .querySelector("#advance-color-select-input")
    .addEventListener("keyup", changeAdvanceComponent);

  document
    .querySelector("#advance-color-input")
    .addEventListener("keyup", changeAdvanceComponentColor);
  document
    .querySelector("#advance-text-color-input")
    .addEventListener("keyup", changeAdvanceComponentTextColor);
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
    element = `<li><label for="${item.id}">${item.name}</label><input type="radio" name="change-template-option" id="${item.id}" onclick="loadTemplate('${item.functionCallName},${item.name},${item.javascript}')" /></li>`;
    ul.insertAdjacentHTML("beforeend", element);
  });
}
// This function is called when an option is clicked in the templateBox
// it accepts the filename of the option clicked and them loads the file into
// It Makes a xhr
function loadTemplate(page) {
  if (interval) {
    clearInterval(interval);
  }
  var pageDetails = page.split(",");
  var page = pageDetails[0];
  var pageName = pageDetails[1];
  var javascriptReq = pageDetails[2];
  console.log(javascriptReq);
  showSiteMessage(`Loading ${pageName}, please wait...`, false);
  document
    .querySelector("#site-template-css")
    .setAttribute("href", `assests/templates/styles/${page}.css`);
  var xhr = new XMLHttpRequest();
  var xhr2 = new XMLHttpRequest();
  var xhr3 = new XMLHttpRequest();
  var url = `assests/templates/html/${page}.html`;
  var url2 = `assests/templates/styles/${page}.css`;
  if (javascriptReq === "true")
    var url3 = `assests/templates/scripts/${page}.js`;
  xhr.open("GET", url);
  xhr2.open("GET", url2);
  if (javascriptReq) xhr3.open("GET", url3);
  xhr2.send();

  // when xhr is completed, it removes the text loading
  // Loads the recieved file and
  //  calls the showClassOnHover fuction to add event listener to all the elements which has those classes
  xhr2.onload = function () {
    document.querySelector("#site-template-css").innerHTML = this.responseText;
    xhr.send();
  };
  xhr.onload = function () {
    document.querySelector("#site-template").innerHTML = this.responseText;
    messageBox.classList.remove("active");
    if (javascriptReq === "true") xhr3.send();
    showClassOnHover();
    applyBasicColor();
  };
  if (javascriptReq === "true") {
    xhr3.onload = function () {
      console.log("called");
      if (this.status == 200) eval(this.responseText);
    };
  }
}
// Function to fetch a random color palette from the array and set the details of the preview box and the input field
//  It calls the setColorInputValue which apply color to the template(page)
//  and changes the value in inputs in the random color box
function getRandomColorData() {
  viewedColorPalettes++;
  if (viewedColorPalettes >= colorData.length - 10) {
    if (loadedColorData.length == numberOfColorDataFiles) {
      if (!allPalettesLoaded) {
        allPalettesLoaded = true;
        showSiteMessage(
          "OOO man!! Looks like you loaded all palettes no new will be loaded",
          true,
          3000
        );
      }
    } else {
      getColorDataFileName();
      showSiteMessage(
        "OO boy!! you user alot of palettes, let me load more!!",
        true,
        3000
      );
    }
  }
  document.querySelector(".random-icon-btn").classList.add("rotate");
  setTimeout(function () {
    document.querySelector(".random-icon-btn").classList.remove("rotate");
  }, 400);
  var value = Math.floor(Math.random() * colorData.length);
  var colorArray = colorData[value].map(function (color) {
    return `#${color}`;
  });
  setColorInputValue(colorArray);
}
// Apply custom color values
function setCustomColorInput() {
  var colorsArray = [];
  for (var i = 1; i < 6; i++) {
    if (document.getElementById(`color${i}`).value.length < 3) {
      showSiteMessage("One or More text Fields are empty", true, 1500);
      return;
    }
    colorsArray.push(document.getElementById(`color${i}`).value);
  }
  setColorInputValue(colorsArray);
}

function setColorInputValue(colorsArray) {
  var colors = [];
  colorsArray.forEach(function (color, index) {
    // index is limited to 5 here
    if (index < 5) {
      // Setting the value
      if (!currentColorData[index].locked) {
        currentColorData[index].color = color;
        document.querySelector(`#color${index + 1}`).value = `${color}`;
        document.querySelector(
          `#color${index + 1}-parent > label> .color-preview`
        ).value = `${color}`;
        colors.push(color);
      } else colors.push(currentColorData[index].color);
    }
  });
  // Checks if the color already saved in the colors history array , and if not, pushed the data to it
  if (!isColorAlreadySaved(colorsHistory, colors)) {
    colorsHistory.push(colors);
  }
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
  showClassOnHover();
}
// this function sets the color, accpeting 3 params
// class to be set the color, actual color you want to set, type of property to apply color on(backgrounColor, color, border, etc)
function setClassColor(clas, color, type) {
  // console.log(`calling for ${clas} to set ${type} ${color}`);
  document.querySelectorAll(`.${clas}`).forEach(function (item) {
    item.style[type] = `${color}`;
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

// ===============================================================
//              Adavnce color change function
// =============================================================
function toggleAdvanceColorEdit() {
  advanceMode = !advanceMode;
  if (advanceMode) {
    document.querySelector("#change-color").classList.add("advance");
    document.querySelector("#change-color").classList.remove("basic");
    document.querySelector("#basic-change-color").classList.remove("basic");
    document.querySelector("#advance-change-color").classList.add("advance");
  } else {
    document.querySelector("#change-color").classList.remove("advance");
    document.querySelector("#change-color").classList.add("basic");
    document.querySelector("#basic-change-color").classList.add("basic");
    document.querySelector("#advance-change-color").classList.remove("advance");
  }
}

// Function to add event listener to all sc-components
function showClassOnHover() {
  ids = allSCComponents(true);
  val = ids.join(", ");
  document.querySelectorAll(val).forEach(function (ele) {
    // console.log(ele.style);
    var color = "",
      backgroundColor = "";
    if (ele.style["background-color"] != "") {
      backgroundColor = `<br>Background-color: ${rgbToHex(
        ele.style["background-color"]
      )}`;
    }
    if (ele.style["color"] != "") {
      color = `<br>Color :${rgbToHex(ele.style["color"])}`;
    }
    showHoverBox(ele, `${ele.classList}${backgroundColor}${color}`, true); // Calls the function which actually add the hover box
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
    hover.innerHTML = content;
    if (window.innerHeight <= e.pageY + 80)
      hover.style.top = e.pageY - hover.getBoundingClientRect().height + "px";
    else hover.style.top = e.pageY + "px";
    var left = e.pageX - 230;
    if (left < 10) left += 230;
    hover.style.left = left + "px";

    if (condition) {
      if (showClass) hover.style.display = "block";
    } else hover.style.display = "block";
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
  showSiteMessage(
    `Display Class on hover ${showClass ? "Activated" : "Deactivated"}`,
    true,
    1000
  );
}
function saveThisColor() {
  var arr = currentColorData.map((data) => {
    return data.color;
  });
  saveColor(arr);
}

function saveColor(color) {
  var existingColors = [];
  if (localStorage.length != 0)
    var existingColors = JSON.parse(localStorage.getItem("savedColorData"))
      .colors;
  if (!isColorAlreadySaved(existingColors, color)) {
    existingColors.push(color);
    var obj = {
      updated: Date.now(),
      colors: existingColors,
    };
    localStorage.setItem("savedColorData", JSON.stringify(obj));
    showSiteMessage(
      "Your Color Palette has been saved successfully",
      true,
      1000
    );
    getSavedColors();
  } else {
    showSiteMessage("The Color Palette is already Saved", true, 1000);
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
    document.querySelector("#saved-colors-list").innerHTML =
      "<li>It Seems You dont have any saved color. Try by saving one</li>";
  }
}
function showSavedColors(AllColors) {
  var li, div;
  document.querySelector("#saved-colors-list").innerHTML = "";
  AllColors.forEach(function (colors, index) {
    li = document.createElement("li");
    li.setAttribute("id", `saved${index}`);
    colors.forEach(function (color, index) {
      div = document.createElement("div");
      div.style.backgroundColor = `${color}`;
      div.setAttribute("class", "saved-color-item");
      li.insertAdjacentElement("beforeend", div);
    });
    li.insertAdjacentHTML(
      "beforeend",
      `<i class="fas fa-trash-alt delete-saved-color-icon" parent-data=${index}></i><i class="fas fa-edit apply-saved-color-icon" parent-data=${index}></i>`
    );
    document
      .querySelector("#saved-colors-list")
      .insertAdjacentElement("beforeend", li);
  });
  addApplySavedColorIcon();
  addDeleteSavedIcon();
  addHoverOnColorItem(".saved-color-item");
}
function addApplySavedColorIcon() {
  document.querySelectorAll(".apply-saved-color-icon").forEach(function (icon) {
    icon.addEventListener("click", function (e) {
      applySavedColors(e.target.getAttribute("parent-data"));
    });
  });
}
function addHoverOnColorItem(element) {
  document.querySelectorAll(element).forEach(function (item) {
    // console.log(item.style.backgroundColor);
    showHoverBox(item, rgbToHex(item.style.backgroundColor), false);
  });
}

function addDeleteSavedIcon() {
  document
    .querySelectorAll(".delete-saved-color-icon")
    .forEach(function (icon) {
      icon.addEventListener("click", function () {
        showSiteMessage("Double Click to Delete", true, 800);
      });

      icon.addEventListener("dblclick", function (e) {
        e.stopPropagation();
        deleteSavedColors(e.target.getAttribute("parent-data"));
      });
    });
}
function addColorHistoryMenu() {
  document
    .querySelectorAll(".apply-history-color-icon")
    .forEach(function (item) {
      item.addEventListener("click", (e) => {
        id = parseInt(e.target.getAttribute("parent-data"));
        setColorInputValue(colorsHistory[id]);
        showSiteMessage("History Colors Appplied", true, 700);
      });
    });
}
function deleteSavedColors(id) {
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
  showSavedColors(updatedExistingColors);
  showSiteMessage("Your palette has been deleted", true, 1000);
  getSavedColors();
}

function applySavedColors(id) {
  id = parseInt(id);
  var colors;
  var existingColors = [];
  existingColors = JSON.parse(localStorage.getItem("savedColorData")).colors;
  colors = existingColors[id];
  // console.log(colors)
  setColorInputValue(colors);
  showSiteMessage("Saved Colors Reloaded", true, 700);
}
function showSiteMessage(message, autoRemove, interval) {
  messageBox.innerHTML = message;
  messageBox.classList.add("active");
  if (messageBoxInterval) clearTimeout(messageBoxInterval);
  if (autoRemove) {
    cc = setTimeout(function () {
      messageBox.classList.remove("active");
    }, interval);
  }
}

function getcolorsHistory() {
  var li;
  document.querySelector("#colors-history-list").innerHTML = "";
  colorsHistory.forEach(function (colors, index) {
    li = document.createElement("li");
    li.setAttribute("id", `history${index}`);
    colors.forEach(function (color) {
      div = document.createElement("div");
      div.style.backgroundColor = `${color}`;
      div.setAttribute("class", "colors-history-item");
      li.insertAdjacentElement("beforeend", div);
    });
    li.insertAdjacentHTML(
      "beforeend",
      `<i class="fas fa-edit apply-history-color-icon" parent-data=${index}></i>`
    );
    document
      .querySelector("#colors-history-list")
      .insertAdjacentElement("beforeend", li);
  });
  addColorHistoryMenu();
  addHoverOnColorItem(".colors-history-item");
}

// function to get a randon colorDatafile
function getColorDataFileName() {
  do {
    var suffix = Math.floor(Math.random() * numberOfColorDataFiles);
    console.log(suffix);
  } while (loadedColorData.includes(suffix));
  loadedColorData.push(suffix);
  var tempColorData = [...colorData];
  var xhr = new XMLHttpRequest();
  var url = `assests/ColorData/colorData${suffix}.js`;
  xhr.open("GET", url);
  xhr.send();
  xhr.onload = function () {
    if (this.status == 200) {
      eval(this.responseText);
      colorData = tempColorData.concat(colorData);
    }
  };
}

function componentToHex(c) {
  if (c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  } else return "00";
}
function rgbToHex(color) {
  var arr = getValuesFromRGBString(color);
  return (
    "#" +
    componentToHex(arr[0]) +
    componentToHex(arr[1]) +
    componentToHex(arr[2])
  );
}
function getValuesFromRGBString(colorStr) {
  colorStr = colorStr.slice(4, -1);
  return colorStr.split(", ").map((val) => {
    return parseInt(val);
  });
}

function displayTourBox() {
  document.querySelector(
    "#text-description"
  ).innerHTML = `<h3>${tourBoxItems[tourBoxAtItemIndex].name}</h3>${tourBoxItems[tourBoxAtItemIndex].description}`;
  tourBox.classList.add("active");
  e = document
    .querySelector(`#${tourBoxItems[tourBoxAtItemIndex].id}`)
    .getClientRects()[0];
  tourBox.style.left = `${e.left - tourBox.offsetWidth + 35}px`;
  tourBox.style.top = `${e.top - tourBox.offsetHeight - 20}px`;
}

function showNextTourItem(start) {
  if (start) {
    tourBoxAtItemIndex = -1;
  }
  tourBoxAtItemIndex++;
  if (tourBoxAtItemIndex >= tourBoxItems.length) {
    stopTourBox();
  } else {
    displayTourBox();
  }
}
function stopTourBox() {
  tourBoxAtItemIndex = -1;
  tourBox.classList.remove("active");
}

function changeAdvanceComponent() {
  var element = document.getElementById("advance-color-select-input").value;
  var elements = document.querySelectorAll(`.${element}`);
  document.querySelector("#advance-color-select-number").innerText =
    elements.length;
  if (elements.length > 0) {
    document.getElementById("advance-color-input").value = rgbToHex(
      elements[0].style.backgroundColor
    );
    document.querySelector("#advance-color-input-picker").value = rgbToHex(
      elements[0].style.backgroundColor
    );
    document.getElementById("advance-text-color-input").value = rgbToHex(
      elements[0].style.color
    );
    document.querySelector("#advance-text-color-input-picker").value = rgbToHex(
      elements[0].style.color
    );
    document.querySelector("#advance-color-opacity-slider").value =
      elements[0].style.opacity;
    document.querySelector("#advance-color-opacity-slider-value").innerText =
      element[0].style.opacity + "%";
  }
}
function changeAdvanceComponentColor() {
  var element = document.getElementById("advance-color-select-input").value;
  var color = document.getElementById("advance-color-input").value;
  document.getElementById("advance-color-input-picker").value = color;

  document.querySelectorAll(`.${element}`).forEach(function (element) {
    element.style.backgroundColor = color;
  });

  showSiteMessage("Color Applied", true, 2000);
}
function changeAdvanceComponentColorPicker() {
  var element = document.getElementById("advance-color-select-input").value;
  var color = document.getElementById("advance-color-input-picker").value;
  document.getElementById("advance-color-input").value = color;
  document.querySelectorAll(`.${element}`).forEach(function (element) {
    element.style.backgroundColor = color;
  });
  showSiteMessage("Color Applied", true, 2000);
}
function changeAdvanceOpacity(value) {
  document.querySelector("#advance-color-opacity-slider-value").innerText =
    value + "%";
  var element = document.getElementById("advance-color-select-input").value;
  document.querySelectorAll(`.${element}`).forEach(function (element) {
    element.style.opacity = value + "%";
  });
}
document.querySelectorAll(".color-preview").forEach((element) => {
  element.addEventListener("change", function () {
    id = element.parentElement.getAttribute("for");
    document.querySelector(`#${id}`).value = element.value;
    basicColorMenu.forEach((menu) => {
      if (menu.id === id) {
        menu.elements.forEach((childelement) => {
          document.querySelectorAll(`.${childelement}`).forEach((child) => {
            child.style[menu.type] = element.value;
          });
        });
      }
    });
  });
});
function changeAdvanceComponentTextColor() {
  var element = document.getElementById("advance-color-select-input").value;
  var color = document.getElementById("advance-text-color-input").value;
  document.getElementById("advance-text-color-input-picker").value = color;

  document.querySelectorAll(`.${element}`).forEach(function (element) {
    element.style.color = color;
  });

  showSiteMessage("Color Applied", true, 2000);
}
function changeAdvanceComponentTextColorPicker() {
  var element = document.getElementById("advance-color-select-input").value;
  var color = document.getElementById("advance-text-color-input-picker").value;
  document.getElementById("advance-text-color-input").value = color;
  document.querySelectorAll(`.${element}`).forEach(function (element) {
    element.style.color = color;
  });
  showSiteMessage("Color Applied", true, 2000);
}
