const grid = document.querySelector(".Art_Gallery");
const rowSize = parseInt(getComputedStyle(grid).getPropertyValue("grid-auto-rows"), 10);
const rowGap = parseInt(getComputedStyle(grid).getPropertyValue("grid-gap"), 10);
const gridItems = [];


const positionGridItems = () => {
  gridItems.forEach(({ artCard, artImage }) => {
    const rowSpan = Math.ceil(
      (artImage.offsetHeight + rowGap) / (rowSize + rowGap)
    );
    artCard.style.setProperty("--row-span", rowSpan);
  });
};

var galleryElements = document.getElementsByClassName("Art_Card")
for (let i = 0; i < galleryElements.length; i++) {
  var artCard = document.getElementsByClassName("Art_Card")[i]
  var artImage = document.getElementsByClassName("Card_Image")[i]
  gridItems.push({ artCard, artImage });
}

window.addEventListener("load", positionGridItems);
window.addEventListener("resize", positionGridItems);
window.addEventListener("scroll", function () {
  var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
  if (scrollTop < 100) {
    positionGridItems();
  }
});

