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

document.querySelectorAll(".product-view-slider-control").forEach((control) => {
  control.addEventListener("click", function (e) {
    e.stopPropagation();
    scrollView(control.id.split("-")[3]);
  });
});

function scrollView(id) {
  var allItem = document.querySelectorAll(".item-card");
  if (id === "right") {
    allItem[allItem.length - 1].scrollIntoView();
  } else allItem[0].scrollIntoView();
}
