// get slider items | Array.from [ES6]
let sliderImages = Array.from(
  document.querySelectorAll(".slider-container img")
);
// get number of slides
let slidesCount = sliderImages.length;

// slide number string Element
let slideNumberElemnet = document.querySelector("#slide-number");
// previous and next buttons
let nextButton = document.getElementById("next");
let prevButton = document.getElementById("prev");
// Hande click on previous and Next buttons
nextButton.addEventListener("click", nextSlide);
prevButton.addEventListener("click", prevSlide);

// create main ul Element (slide numbers)
let paginationElement = document.createElement("ul");
// set id on created ul
paginationElement.setAttribute("id", "pagination-ul");
// create list of items based on slide count
for (let i = 1; i <= slidesCount; i++) {
  // create the li
  let paginationItem = document.createElement("li");
  // set custom attribute
  paginationItem.setAttribute(`data-slide`, i);
  // set item content
  paginationItem.appendChild(document.createTextNode(i));
  // append item to the main ul
  paginationElement.appendChild(paginationItem);
}
// add the created ul to the page
document.querySelector("#indicators").appendChild(paginationElement);
// get the new created ul
let paginationCreatedUL = document.querySelector("#pagination-ul");

// get pagination items
let paginationBullets = Array.from(
  document.querySelectorAll("#pagination-ul li")
);
// Set current slide
let currentSlide;
// check if the current slide has value in local storage
if (localStorage.slide) {
  // retreve the value from the local stoge
  currentSlide = +localStorage.slide;
  theCheacker();
} else {
  currentSlide = 1;
}
// loop through all bullet item
paginationBullets.forEach((bullets) => {
  bullets.addEventListener("click", (e) => {
    currentSlide = +e.target.getAttribute("data-slide");
    // save the current slide inside the local storage
    localStorage.slide = currentSlide;
    theCheacker();
  });
});

// trigger the cheaker function
theCheacker();
// next slide function
function nextSlide() {
  if (nextButton.classList.contains("disabled")) {
    // do Nothing
  } else {
    // change the value of the side index
    currentSlide++;
    // save the value inside the local storage
    localStorage.slide = currentSlide;

    // trigger the cheaker function to apply changes in the page
    theCheacker();
  }
}
// previous slide function
function prevSlide() {
  if (prevButton.classList.contains("disabled")) {
    // do Nothing
  } else {
    // change the value of the side index
    currentSlide--;
    // save the value inside the local storage
    localStorage.slide = currentSlide;
    // trigger the cheaker function to apply changes in the page
    theCheacker();
  }
}
// the Cheacker function
function theCheacker() {
  // set the slide number
  slideNumberElemnet.textContent = `Slide #${currentSlide} of ${slidesCount}`;
  removeAllActive();
  // set active class on current slide
  sliderImages[currentSlide - 1].classList.add("active");
  // set active class on curren pagination Item
  paginationCreatedUL.children[currentSlide - 1].classList.add("active");
  // check if the current slide is the first
  if (currentSlide === 1) {
    //add disable class to the previous button
    prevButton.classList.add("disabled");
    // check if the current slide is the last
  } else if (currentSlide === slidesCount) {
    //add disable class to the next button
    nextButton.classList.add("disabled");
  } else {
    // remove disable class from the previous button
    prevButton.classList.remove("disabled");
    // remove disable class from the next button
    nextButton.classList.remove("disabled");
  }
}
// remove all active classes from images and pagination bullets
function removeAllActive() {
  // loop through images
  sliderImages.forEach((image) => {
    image.classList.remove("active");
  });
  // loop through pagination bullets
  paginationBullets.forEach((bullets) => {
    bullets.classList.remove("active");
  });
}
