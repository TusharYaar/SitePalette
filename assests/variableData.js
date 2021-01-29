var templateData = [
  {
    name: "Facecopy",
    functionCallName: "facecopy",
    id: "home",
  },
  {
    name: "Preview Document",
    functionCallName: "previewDocument",
    id: "preview",
  },
  { name: "BlogSite Single Page", functionCallName: "singleBlogPost", id: "blogPost" },
];

var currentColorData = [
  { name: "Text", id: "color1", color: "black", locked: false },
  { name: "background", id: "color2", color: "black", locked: false },
  { name: "body", id: "color3", color: "black", locked: false },
  { name: "button", id: "color4", color: "black", locked: false },
  { name: "Something", id: "color5", color: "black", locked: false },
];
var basicColorMenu = [
  { id: "color1", elements: ["sc-icon", "sc-h1", "sc-h2", "sc-h3", "sc-h4", "sc-h5", "sc-h6", "sc-button1", "sc-button2", "sc-button3", "sc-text", "sc-body"], type: "color" },
  { id: "color2", elements: ["sc-background", "sc-card", "sc-navbar"], type: "backgroundColor" },
  { id: "color3", elements: ["sc-body"], type: "backgroundColor" },
  { id: "color4", elements: ["sc-button1", "sc-button2", "sc-button3", "sc-card2"], type: "backgroundColor" },
  { id: "color5", elements: ["sc-something", "sc-p", "icon-brand", "icon-special"], type: "color" },
  { id: "color4", elements: ["sc-background", "sc-card", "sc-navbar", "sc-card2"], type: "borderColor" },
];
var colorHistory = [];
const hover = document.querySelector("#change-color-about-hover");
const menu = document.querySelector("#saved-color-menu-box");
var showClass = false;
var siteInteractionButtons = ["site-about", "saved-colors", "change-template", "change-color"];
const messageBox = document.querySelector("#site-messages");
var messageBoxInterval;
