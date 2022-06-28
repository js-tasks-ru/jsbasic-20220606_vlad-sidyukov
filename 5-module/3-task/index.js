function initCarousel() {
  const rightArrow = document.querySelector('.carousel__arrow_right');
  const leftArrow = document.querySelector('.carousel__arrow_left');
  const carouselInner = document.querySelector('.carousel__inner');
  const amountSlides = carouselInner.children.length;
  const slideWidth = document.querySelector('.carousel__slide').offsetWidth;

  function hiddenBtn(index) {
    if (index === 0) {
      leftArrow.style.display = 'none';
    } else {
      leftArrow.style.display = '';
    }

    if (index === amountSlides - 1) {
      rightArrow.style.display = 'none';
    } else {
      rightArrow.style.display = '';
    }
  }

  let movementCount = 0;
  let curentSlide = 0;

  hiddenBtn(curentSlide);

  rightArrow.addEventListener('click', function () {
    ++curentSlide;
    movementCount -= slideWidth;
    carouselInner.style.transform = `translateX(${movementCount}px)`;
    hiddenBtn(curentSlide);
  });

  leftArrow.addEventListener('click', function () {
    --curentSlide;
    movementCount += slideWidth;
    carouselInner.style.transform = `translateX(${movementCount}px)`;
    hiddenBtn(curentSlide);
  });
}
