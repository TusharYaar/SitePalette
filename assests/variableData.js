var templateData = [
  {
    name: "Facecopy",
    functionCallName: "facecopy",
    id: "home",
    javascript: false,
  },
  {
    name: "Preview Document",
    functionCallName: "previewDocument",
    id: "preview",
    javascript: false,
  },
  {
    name: "BlogSite Single Page",
    functionCallName: "singleBlogPost",
    id: "blogPost",
    javascript: false,
  },
  {
    name: "Dashboard Type 1",
    functionCallName: "dashboardT1",
    id: "db1",
    javascript: true,
  },
  {
    name: "Pricing Info Page",
    functionCallName: "pricingPage",
    id: "pp",
    javascript: false,
  },
  {
    name: "Editorial Site",
    functionCallName: "editorialSite",
    id: "ed",
    javascript: false,
  },
  {
    name: "404 Error Page",
    functionCallName: "error404",
    id: "error1",
    javascript: false,
  },
];

var currentColorData = [
  { name: "Text", id: "color1", color: "black", locked: false },
  { name: "background", id: "color2", color: "black", locked: false },
  { name: "body", id: "color3", color: "black", locked: false },
  { name: "button", id: "color4", color: "black", locked: false },
  { name: "Something", id: "color5", color: "black", locked: false },
];
var basicColorMenu = [
  {
    id: "color1",
    elements: [
      "sc-icon",
      "sc-h1",
      "sc-h2",
      "sc-h3",
      "sc-h4",
      "sc-h5",
      "sc-h6",
      "sc-button1",
      "sc-button2",
      "sc-button3",
      "sc-text",
      "sc-body",
    ],
    type: "color",
  },
  {
    id: "color2",
    elements: ["sc-background", "sc-button2", "sc-card", "sc-navbar"],
    type: "backgroundColor",
  },
  {
    id: "color3",
    elements: ["sc-body", "sc-button3"],
    type: "backgroundColor",
  },
  {
    id: "color4",
    elements: ["sc-button1", "sc-card2"],
    type: "backgroundColor",
  },
  {
    id: "color5",
    elements: [
      "sc-something",
      "sc-p",
      "sc-icon-brand",
      "sc-icon-special",
      "sc-text2",
      "sc-button2",
    ],
    type: "color",
  },
  {
    id: "color4",
    elements: ["sc-background", "sc-card", "sc-navbar", "sc-card2"],
    type: "borderColor",
  },
  { id: "color3", elements: ["sc-border"], type: "borderColor" },
  { id: "color5", elements: ["sc-body2"], type: "backgroundColor" },
];
var colorsHistory = [];
const hover = document.querySelector("#change-color-about-hover");
// const savedColorMenu = document.querySelector("#saved-color-menu-box");
// const colorsHistoryMenu = document.querySelector("#colors-history-menu-box");
var showClass = false;
var siteInteractionButtons = [
  "site-about",
  "saved-colors",
  "change-template",
  "change-color",
  "colors-history",
];
const messageBox = document.querySelector("#site-messages");
const tourBox = document.querySelector("#tour-box");
var messageBoxInterval;
const numberOfColorDataFiles = 5;
var tourBoxItems = [
  {
    name: "Load template",
    Description:
      "vkjhbvekhkvblug egbvw lhiv ldh li ihv lhw cugq ciwyec wiec  pweuc wgdc oc",
    id: "change-color",
  },
  {
    name: "Color History",
    Description:
      "vkjhbvekhkvblug egbvw lhiv ldh li ihv lhw cugq ciwyec wiec  pweuc wgdc oc",
    id: "colors-history",
  },
  {
    name: "Color History",
    Description:
      "vkjhbvekhkvblug egbvw lhiv ldh li ihv lhw cugq ciwyec wiec  pweuc wgdc oc",
    id: "saved-colors",
  },
];
var tourBoxAtItemIndex = 0;
