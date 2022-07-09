import createElement from '../../assets/lib/create-element.js';



const createRibonMenuBody = () => {
  return createElement(`
  <div class="ribbon">

    <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>

    <nav class="ribbon__inner"></nav>

    <button class="ribbon__arrow ribbon__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
  </div>
  `);
};


const createRibonMenuItem = (category) => {
  return createElement(`
    <a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>
  `);
};



export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;

    this.ribonMenuBody = createRibonMenuBody();
    this.ribonMenuNav = this.ribonMenuBody.querySelector('.ribbon__inner');

    this.elem = this.createRibonMenu();

    this.clickLinkCustomIdHandler = this.elem.addEventListener('ribbon-select', this.onClickCustomLinkId);

    this.ribonMenuRightArrow = this.ribonMenuBody.querySelector('.ribbon__arrow_right');
    this.ribonMenuLeftArrow = this.ribonMenuBody.querySelector('.ribbon__arrow_left');

    this.clickRightArrowHandler = this.ribonMenuRightArrow.addEventListener('click', this.onClickArrow.bind(this));
    this.clickLeftArrowHandler = this.ribonMenuLeftArrow.addEventListener('click', this.onClickArrow.bind(this));


    this.toggleVisibilityArrow();

    this.scrollMenuNavHandler = this.ribonMenuNav.addEventListener('scroll', this.toggleVisibilityArrow.bind(this));
  }

  createRibonMenu() {
    const menuItemsFragment = new DocumentFragment();

    this.categories.forEach(category => {
      const newMenuItem = createRibonMenuItem(category);
      newMenuItem.addEventListener('click', this.toggleActiveLink.bind(this));
      menuItemsFragment.append(newMenuItem);
    });

    this.ribonMenuNav.append(menuItemsFragment);

    return this.ribonMenuBody;
  }

  toggleVisibilityArrow() {
    let scrollWidth = this.ribonMenuNav.scrollWidth;
    let scrollLeft = this.ribonMenuNav.scrollLeft;
    let clientWidth = this.ribonMenuNav.clientWidth;

    let scrollRight = scrollWidth - scrollLeft - clientWidth;

    if (scrollLeft === 0) {
      this.ribonMenuLeftArrow.classList.remove('ribbon__arrow_visible');
      this.ribonMenuRightArrow.classList.add('ribbon__arrow_visible');
    } else {
      this.ribonMenuLeftArrow.classList.add('ribbon__arrow_visible');

      if (scrollRight < 1) {
        this.ribonMenuRightArrow.classList.remove('ribbon__arrow_visible');
      } else {
        this.ribonMenuRightArrow.classList.add('ribbon__arrow_visible');
      }
    }
  }

  toggleActiveLink(evt) {
    evt.preventDefault();
    const menuLinks = this.elem.querySelectorAll('.ribbon__item');

    menuLinks.forEach(link => {
      if (link === evt.target) {
        link.classList.add('ribbon__item_active');
        link.dispatchEvent(new CustomEvent('ribbon-select', {
          detail: link.dataset.id,
          bubbles: true,
        }));
      } else {
        link.classList.remove('ribbon__item_active');
      }
    });
  }

  onClickArrow(evt) {
    switch (evt.target.closest('button')) {
      case this.ribonMenuRightArrow:
        this.ribonMenuNav.scrollBy(350, 0);
        break;

      case this.ribonMenuLeftArrow:
        this.ribonMenuNav.scrollBy(-350, 0);
        break;
    }
  }

  onClickCustomLinkId(evt) {
    console.log(evt.detail);
  }
}
