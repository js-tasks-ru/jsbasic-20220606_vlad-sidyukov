import createElement from '../../assets/lib/create-element.js';



const createProdutCard = (product) => {
  return createElement(`
    <div class="card">
      <div class="card__top">
        <img class="card__image" src="/assets/images/products/${product.image}" alt="product">
        <span class="card__price">€${(product.price).toFixed(2)}</span>
      </div>
      <div class="card__body">
        <div class="card__title">${product.name}</div>
        <button type="button" class="card__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    </div>
  `);
};



export default class ProductCard {
  constructor(product) {
    this.name = product.name;
    this.price = product.price;
    this.category = product.category;
    this.image = product.image;
    this.id = product.id;

    this.elem = createProdutCard(product);

    this.cardButton = this.elem.querySelector(`.card__button`);
    this.clickPlusHandler = this.cardButton.addEventListener('click', this.clickPlusHandler.bind(this));

    this.card = this.elem.closest(`.card`);
    this.clickCustomIdHandler = this.card.addEventListener("product-add", this.clickCustomIdHandler);
  }

  clickPlusHandler() {
    this.card.dispatchEvent(new CustomEvent("product-add", {
      detail: this.id,
      bubbles: true,
    }));
  }

  clickCustomIdHandler(evt) {
    console.log(evt.detail);
  }
}

