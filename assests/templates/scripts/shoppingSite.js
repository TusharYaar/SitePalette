var currentCarouselImage = 0;
var carousel, img, insertImage;
var imagesArr = document.querySelectorAll(".carousel > img");
document.querySelectorAll(".carousel-control").forEach((control) => {
  control.addEventListener("click", function (e) {
    e.stopPropagation();
    carouselImage(control.id);
  });
});
setCarouselInterval();
function carouselImage(id) {
  id = id.split("-")[1];
  if (id === "left") {
    currentCarouselImage--;
    if (currentCarouselImage < 0) currentCarouselImage += imagesArr.length;
    showCarouselImage("left");
  } else {
    currentCarouselImage++;
    if (currentCarouselImage >= imagesArr.length) currentCarouselImage = 0;
    showCarouselImage("right");
  }
}
function setCarouselInterval() {
  interval = setInterval(function () {
    carouselImage("carousel-right");
  }, 3000);
}
function showCarouselImage(direction) {
  clearInterval(interval);
  setCarouselInterval();
  carousel = document.querySelector(".carousel");
  img = document.querySelector(".carousel > img.show");
  insertImage = imagesArr[currentCarouselImage];
  if (direction == "left") carousel.insertBefore(insertImage, img);
  else carousel.insertBefore(insertImage, img.nextSibling);
  insertImage.classList = "show";
  img.classList = "";
  setTimeout(() => {
    img.remove();
  }, 1110);
}

document
  .querySelectorAll(".product-view-slider1-control")
  .forEach((control) => {
    control.addEventListener("click", function (e) {
      e.stopPropagation();
      scrollView("product-view-slider1", control.id.split("-")[3]);
    });
  });

document
  .querySelectorAll(".product-view-slider2-control")
  .forEach((control) => {
    control.addEventListener("click", function (e) {
      e.stopPropagation();
      scrollView("product-view-slider2", control.id.split("-")[3]);
    });
  });

document
  .querySelectorAll(".product-view-slider3-control")
  .forEach((control) => {
    control.addEventListener("click", function (e) {
      e.stopPropagation();
      scrollView("product-view-slider3", control.id.split("-")[3]);
    });
  });
document.getElementById("back-to-top").addEventListener("click", function () {
  console.log("called");
  var parent = document.querySelector("html");
  parent.scroll({ top: 0, behavior: "smooth" });
});

function scrollView(parentid, id) {
  var parent = document.querySelector(`#${parentid}`);
  if (id === "right") {
    parent.scroll({
      left: 2050,
      behavior: "smooth",
    });
  } else
    parent.scroll({
      left: 0,
      behavior: "smooth",
    });
}
