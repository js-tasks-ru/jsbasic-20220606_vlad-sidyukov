import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';



const createProductGridBody = () => {
  return createElement(`
    <div class="products-grid">
      <div class="products-grid__inner"></div>
    </div>
  `);
};



export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};

    this.productGridBody = createProductGridBody();
    this.productGridInner = this.productGridBody.querySelector('.products-grid__inner');

    this.elem = this.createProductGrid(products);
  }

  createProductGrid(productsArr) {
    const productsFragment = new DocumentFragment();

    for (let product of productsArr) {
      let productCard = new ProductCard(product);
      productsFragment.append(productCard.elem);
    }

    this.productGridInner.append(productsFragment);

    return this.productGridBody;
  }


  updateFilter(filters) {
    Object.assign(this.filters, filters);

    this.productGridInner.innerHTML = '';

    let filtredProducts = this.products;

    if (this.filters.noNuts) {
      filtredProducts = filtredProducts.filter(product => {
        return product.nuts !== this.filters.noNuts;
      });
    }

    if (this.filters.vegeterianOnly) {
      filtredProducts = filtredProducts.filter(product => {
        return product.vegeterian === this.filters.vegeterianOnly;
      });
    }

    if (isFinite(this.filters.maxSpiciness)) {
      filtredProducts = filtredProducts.filter(product => {
        return product.spiciness <= this.filters.maxSpiciness;
      });
    }

    if (this.filters.category) {
      filtredProducts = filtredProducts.filter(product => {
        return product.category === this.filters.category;
      });
    }
    this.createProductGrid(filtredProducts);
  }
}
