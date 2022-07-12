import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';



export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this.modal = new Modal();

    this.addEventListeners();
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${(product.price * count).toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(2)}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }


  getTotalCount() {
    let totalCount = 0;

    this.cartItems.forEach(item => {
      totalCount += item.count;
    });

    return Number(totalCount);
  }

  getTotalPrice() {
    let totalPrice = 0;

    this.cartItems.forEach(item => {
      totalPrice += item.product.price * item.count;
    });

    return Number(totalPrice);
  }


  renderModal() {
    this.renderContentModal(this.cartItems);

    this.modal.open();
  }

  renderContentModal(cartItems) {
    const productListFragment = new DocumentFragment();

    cartItems.forEach(item => {
      const newProduct = this.renderProduct(item.product, item.count);
      newProduct.addEventListener('click', this.onClickCartCounterButton.bind(this));
      productListFragment.append(newProduct);
    });

    const orderForm = this.renderOrderForm();
    orderForm.addEventListener('submit', this.onSubmit.bind(this));
    productListFragment.append(orderForm);

    this.modal.setTitle('Your order');
    this.modal.setBody(productListFragment);
  }

  onClickCartCounterButton(evt) {
    const targetElement = evt.target.closest('.cart-counter__button');
    if (targetElement) {
      const currentId = evt.currentTarget.dataset.productId;

      if (targetElement.classList.contains('cart-counter__button_minus')) {
        this.updateProductCount(currentId, -1);
        if (this.isEmpty()) {
          this.modal.close();
        }
      }

      if (targetElement.classList.contains('cart-counter__button_plus')) {
        this.updateProductCount(currentId, 1);
      }
    }
  }

  isEmpty() {
    if (this.cartItems.length > 0) {
      return false;
    }

    return true;
  }

  addProduct(product) {
    if (product) {
      let productAvailability = this.cartItems.findIndex(item => {
        return item.product.name === product.name;
      });

      if (productAvailability === -1) {
        this.cartItems.push({
          product,
          count: 1
        });
      } else {
        this.cartItems[productAvailability].count += 1;
      }

      this.onProductUpdate(this.cartItems);
    }
  }

  onProductUpdate(cartItems) {
    if (this.modal) {
      this.renderContentModal(cartItems);
    }

    this.cartIcon.update(this);
  }

  updateProductCount(productId, amount) {
    this.cartItems.forEach((item, index) => {
      if (item.product.id === productId) {
        item.count += amount;
        if (item.count === 0) {
          this.cartItems.splice(index, 1);
        }
      }
    });

    this.onProductUpdate(this.cartItems);
  }

  onSubmit(evt) {
    evt.preventDefault();

    const submitButton = this.modal.elem.querySelector('.button');

    submitButton.classList.add('is-loading');

    const formData = new FormData(evt.currentTarget);

    fetch(
      'https://httpbin.org/post',
      {
        method: 'POST',
        body: formData,
      })
      .then((response) => {
        if (response.ok) {
          this.onSuccesSubmit();
        } else {
          console.log('err');
        }
      })
      .catch(() => {
        console.log('err');
      });
  }

  onSuccesSubmit() {
    this.modal.setTitle('Success!');
    this.modal.setBody(`
    <div class="modal__body-inner">
      <p>
        Order successful! Your order is being cooked :) <br>
        We’ll notify you about delivery time shortly.<br>
        <img src="/assets/images/delivery.gif">
      </p>
    </div>
    `);

    this.cartItems = [];
    this.cartIcon.update(this);
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

