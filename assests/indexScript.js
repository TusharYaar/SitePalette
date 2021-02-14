document.addEventListener("DOMContentLoaded", function () {
  function checkWidth() {
    if (document.body.clientWidth < 656 )
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
  // loadTemplate("dashboardT1","Dashboard Type 1");
  showSiteMessage("This Site pages are NOT responsive YET", true, 1500);
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
    element = `<li><label for="${item.id}">${item.name}</label><input type="radio" name="change-template-option" id="${item.id}" onclick="loadTemplate('${item.functionCallName},${item.name}')" /></li>`;
    ul.insertAdjacentHTML("beforeend", element);
  });
}
// This function is called when an option is clicked in the templateBox
// it accepts the filename of the option clicked and them loads the file into
// It Makes a xhr
function loadTemplate(page) {
  var pageDetails = page.split(",");
  var page = pageDetails[0];
  var pageName = pageDetails[1];
  showSiteMessage(`Loading ${pageName}, please wait...`, false);
  document
    .querySelector("#site-template-css")
    .setAttribute("href", `assests/templates/styles/${page}.css`);
  var xhr = new XMLHttpRequest();
  var xhr2 = new XMLHttpRequest();
  var url = `assests/templates/html/${page}.html`;
  var url2 = `assests/templates/styles/${page}.css`;
  xhr.open("GET", url);
  xhr2.open("GET", url2);
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
    showClassOnHover();
    setCustomColorInput();
  };
}
// Function to fetch a random color palette from the array and set the details of the preview box and the input field
//  It calls the setColorInputValue which apply color to the template(page)
//  and changes the value in inputs in the random color box
function getRandomColorData() {
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
    if(document.getElementById(`color${i}`).value.length < 3)
     {
       showSiteMessage("One or More text Fields are empty",true,1500);
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
          `#color${index + 1}-parent > label> span`
        ).style.backgroundColor = `${color}`;
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
    colors.forEach(function (color,index) {
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
function addApplySavedColorIcon(){
  document.querySelectorAll(".apply-saved-color-icon").forEach(function (icon){
    icon.addEventListener("click",function(e) {
      applySavedColors(e.target.getAttribute("parent-data"));
    })
  })
}
function addHoverOnColorItem(element) {
  document.querySelectorAll(element).forEach(function (item) {
    showHoverBox(item, item.style.backgroundColor, false);
  });
}

function addDeleteSavedIcon() {
  document.querySelectorAll(".delete-saved-color-icon").forEach(function (icon){
    icon.addEventListener("click",function(){
      showSiteMessage("Double Click to Delete",true,800);
    })

    icon.addEventListener("dblclick",function(e) {
      e.stopPropagation();
      deleteSavedColors(e.target.getAttribute("parent-data"));
    })
  })
}
function addHoverOnColorItem(element) {
  document.querySelectorAll(element).forEach(function (item) {
    showHoverBox(item, item.style.backgroundColor, false);
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
  messageBox.textContent = message;
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
  var suffix = Math.floor(Math.random() * numberOfColorDataFiles);
  var script = document.createElement("script");
  script.setAttribute("src", `assests/ColorData/colorData${suffix}.js`);
  script.setAttribute("type", "text/javascript");
  document.getElementsByTagName("head")[0].appendChild(script);
}
