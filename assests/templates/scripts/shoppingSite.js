currentCarouselImage = 0;
var imagesArr = [
  "pexels-alex-andrews-821651",
  "pexels-gabriel-freytez-341523",
  "pexels-pixabay-279906",
];
document.querySelectorAll(".carousel-control").forEach((control) => {
  control.addEventListener("click", function (e) {
    e.stopPropagation();
    carouselImage(control.id);
  });
});
console.log("hello");

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

function showCarouselImage(direction) {
  console.log(direction);
  var carousel = document.querySelector(".carousel");
  var img = document.querySelector(".carousel > img.show");
  var insertImage = document.createElement("img");
  insertImage.src = `/assests/templates/images/${imagesArr[currentCarouselImage]}.jpg`;
  if (direction == "left") carousel.insertBefore(insertImage, img);
  else carousel.insertBefore(insertImage, img.nextSibling);
  insertImage.classList = "show";
  img.classList = "";
  setTimeout(() => {
    img.remove();
  }, 1110);
}
