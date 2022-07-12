import createElement from '../../assets/lib/create-element.js';



const createModal = () => {
  return createElement(`
  <div class="modal">

    <div class="modal__overlay"></div>

    <div class="modal__inner">
      <div class="modal__header">

        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>

        <h3 class="modal__title"></h3>

      </div>

      <div class="modal__body"></div>

    </div>

  </div>
  `);
};



export default class Modal {
  constructor() {
    this.elem = createModal();

    this.modalTitle = this.elem.querySelector('.modal__title');
    this.modalBody = this.elem.querySelector('.modal__body');

    this.modalCloseButton = this.elem.querySelector('.modal__close');
    this.clickCloseButtonHandler = this.modalCloseButton.addEventListener('click', this.close.bind(this));

    this.keydownEsc = this.onKeydownEsc.bind(this);
  }

  open() {
    document.body.append(this.elem);
    document.body.classList.add('is-modal-open');
    document.addEventListener('keydown', this.keydownEsc);
  }

  setTitle(title) {
    this.modalTitle.textContent = title;
  }

  setBody(node) {
    if (typeof node === "string") {
      this.modalBody.innerHTML = node;
    } else {
      this.modalBody.innerHTML = '';
      this.modalBody.append(node);
    }
  }

  close() {
    this.elem.remove();
    document.body.classList.remove('is-modal-open');
    document.removeEventListener('keydown', this.keydownEsc);
  }

  onKeydownEsc(evt) {
    if (evt.code === 'Escape') {
      this.close();
    }
  }
}
