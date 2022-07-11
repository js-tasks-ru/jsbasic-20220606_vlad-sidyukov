export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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

      console.log(this.cartItems);

      this.onProductUpdate(this.cartItems);
    }
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

    console.log(this.cartItems);

    this.onProductUpdate(this.cartItems);
  }

  isEmpty() {
    if (this.cartItems.length > 0) {
      return false;
    }

    return true;
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

