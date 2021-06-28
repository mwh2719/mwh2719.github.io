let slideShowClicked = false;
let t;
let x;

function setUpAuto(){
    if(!slideShowClicked){
        t = setTimeout(timedSlide, 5000);
    }
}

window.onload = function(){
    setUpAuto();
    showSlides(slideIndex);
}



var slideIndex = 1;


// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
    slideShowClicked = true;
    clearTimeout(t);
    clearTimeout(x);
    x = setTimeout(timedSlide, 30000);
}

function timedSlide(){
    slideShowClicked = false;
    showSlides(slideIndex += 1);
    setUpAuto();
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
    slideShowClicked = true;
    clearTimeout(t);
    clearTimeout(x);
    x = setTimeout(timedSlide, 30000);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}
