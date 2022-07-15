import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
    this.carousel = new Carousel(slides);

    this.ribbonMenu = new RibbonMenu(categories);

    this.stepSlider = new StepSlider({ steps: 5, value: 3 });

    this.cartIcon = new CartIcon();

    this.cart = new Cart(this.cartIcon);

    this.filterBlock = document.querySelector('.filters');
    this.changeCheckboxFilter = this.filterBlock.addEventListener('change', this.onChangeFilterCheckbox.bind(this));

    this.sliderChangeCustomHandler = document.body.addEventListener('slider-change', this.onSliderChange.bind(this));

    this.productAddCustomHandler = document.body.addEventListener('product-add', this.onProductAdd.bind(this));

    this.ribbonSelectCustomHandler = document.body.addEventListener('ribbon-select', this.onRibbonSelect.bind(this));
  }

  filterProducts() {
    this.productGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.sliderCurentValue,
      category: this.ribbonMenu.curentValue
    });
  }

  onSliderChange(evt) {
    this.productGrid.updateFilter({ maxSpiciness: evt.detail });
  }

  onRibbonSelect(evt) {
    this.productGrid.updateFilter({ category: evt.detail });
  }

  onChangeFilterCheckbox() {
    this.productGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
    });
  }

  onProductAdd(evt) {
    this.cart.addProduct(this.products.find(product => {
      return product.id === evt.detail;
    }));
  }

  async render() {
    const carousel = this.carousel.elem;
    const carouselBody = document.querySelector('[data-carousel-holder]');
    carouselBody.append(carousel);


    this.ribonMenuElem = this.ribbonMenu.elem;
    const ribonMenuBody = document.querySelector('[data-ribbon-holder]');
    ribonMenuBody.append(this.ribonMenuElem);

    this.stepSliderElem = this.stepSlider.elem;
    const stepSliderBody = document.querySelector('[data-slider-holder]');
    stepSliderBody.append(this.stepSliderElem);

    this.cartIconElem = this.cartIcon.elem;
    const cartIconBody = document.querySelector('[data-cart-icon-holder]');
    cartIconBody.append(this.cartIconElem);

    const products = await fetch('./products.json')
      .then((response) => response.json())
      .catch((err) => {
        console.error(err);
      });

    this.products = products;
    this.productGrid = new ProductsGrid(products);
    const productGrid = this.productGrid.elem;
    const productGridBody = document.querySelector('[data-products-grid-holder]');
    productGridBody.innerHTML = '';
    productGridBody.append(productGrid);
    this.filterProducts();
  }
}
