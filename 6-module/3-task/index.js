import createElement from '../../assets/lib/create-element.js';



const createCaruseleBody = () => {
  return createElement(`
  <div class="carousel">
    <div class="carousel__arrow carousel__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </div>
    <div class="carousel__arrow carousel__arrow_left">
      <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
    </div>
    <div class="carousel__inner"></div>
  </div>
  `);
};

const createSlide = (slide) => {
  return createElement(`
  <div class="carousel__slide" data-id="${slide.id}">
      <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
      <div class="carousel__caption">
        <span class="carousel__price">€${(slide.price).toFixed(2)}</span>
        <div class="carousel__title">${slide.name}</div>
        <button type="button" class="carousel__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    </div>
  `);
};




export default class Carousel {
  movementCount = 0;
  curentSlide = 0;

  constructor(slides) {
    this.slides = slides;

    this.amountSlides = slides.length;

    this.caruseleBody = createCaruseleBody();
    this.rightArrow = this.caruseleBody.querySelector('.carousel__arrow_right');
    this.leftArrow = this.caruseleBody.querySelector('.carousel__arrow_left');
    this.caruseleInner = this.caruseleBody.querySelector('.carousel__inner');

    this.elem = this.createCarusele();

    this.clickRightArrowHandler = this.rightArrow.addEventListener('click', this.clickRightArrowHandler.bind(this));
    this.clickLeftArrowHandler = this.leftArrow.addEventListener('click', this.clickLeftArrowHandler.bind(this));

    this.clickCustomIdHandler = this.elem.addEventListener("product-add", this.clickCustomIdHandler);
  }

  createCarusele() {
    const caruseleFragment = new DocumentFragment();
    this.slides.forEach(curentSlide => {
      const slide = createSlide(curentSlide);
      caruseleFragment.append(slide);
      const slideButton = slide.querySelector('.carousel__button');
      slideButton.addEventListener('click', this.clickPlusHandler.bind(slide));
    });

    this.caruseleInner.append(caruseleFragment);
    this.hiddenBtn();

    return this.caruseleBody;
  }

  clickPlusHandler() {
    this.dispatchEvent(new CustomEvent("product-add", {
      detail: this.dataset.id,
      bubbles: true,
    }));
  }

  clickCustomIdHandler(evt) {
    console.log(evt.detail);
  }

  clickRightArrowHandler() {
    const slideWidth = this.elem.querySelector('.carousel__slide').offsetWidth;
    ++this.curentSlide;
    this.movementCount -= slideWidth;
    this.caruseleInner.style.transform = `translateX(${this.movementCount}px)`;
    this.hiddenBtn();
  }

  clickLeftArrowHandler() {
    const slideWidth = this.elem.querySelector('.carousel__slide').offsetWidth;
    --this.curentSlide;
    this.movementCount += slideWidth;
    this.caruseleInner.style.transform = `translateX(${this.movementCount}px)`;
    this.hiddenBtn();
  }

  hiddenBtn() {
    if (this.curentSlide === 0) {
      this.leftArrow.style.display = 'none';
    } else {
      this.leftArrow.style.display = '';
    }

    if (this.curentSlide === this.amountSlides - 1) {
      this.rightArrow.style.display = 'none';
    } else {
      this.rightArrow.style.display = '';
    }
  }
}




