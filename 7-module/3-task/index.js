import createElement from '../../assets/lib/create-element.js';



const createSliderBody = (obj) => {
  return createElement(`
  <div class="slider">

    <div class="slider__thumb" style="left: ${obj.value ? (100 / (obj.steps - 1) * (obj.value)) : 0}%;">
      <span class="slider__value">${obj.value} </span>
    </div>

    <div class="slider__progress" style="width: ${obj.value ? (100 / (obj.steps - 1) * (obj.value)) : 0}%;"></div>

    <div class="slider__steps"></div>
  </div>
  `);
};



export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;

    this.sliderBody = createSliderBody({ steps, value });
    this.sliderStepsInner = this.sliderBody.querySelector('.slider__steps');

    this.sliderThumb = this.sliderBody.querySelector('.slider__thumb');
    this.sliderProgress = this.sliderBody.querySelector('.slider__progress');
    this.sliderValue = this.sliderBody.querySelector('.slider__value');

    this.elem = this.createSlider();

    this.sliderSteps = this.sliderStepsInner.querySelectorAll('span');
    this.arrSteps = this.getArrSteps();

    this.clickSliderHandler = this.elem.addEventListener('click', this.onClickSlider.bind(this));

    this.changeSliderValueCustomHandler = this.elem.addEventListener('slider-change', this.onChangeSliderValueCustom);
  }

  createSlider() {
    const stepsFragment = new DocumentFragment();

    for (let i = 0; i < this.steps; i++) {
      const newStep = createElement('<span></span>');

      if (this.value === i) {
        newStep.classList.add('slider__step-active');
      }

      stepsFragment.append(newStep);
    }

    this.sliderStepsInner.append(stepsFragment);

    return this.sliderBody;
  }

  getArrSteps() {
    let arrSteps = [];
    const step = 100 / (this.steps - 1);
    let count = 0;

    for (let i = 0; i < this.steps; i++) {
      if (i === 0) {
        arrSteps.push(0);
      } else {
        count += step;
        arrSteps.push(count);
      }
    }

    return arrSteps;
  }

  onClickSlider(evt) {
    const targetX = (evt.clientX - this.elem.getBoundingClientRect().left) / (this.elem.offsetWidth / 100);
    let closestStep = this.arrSteps.slice().sort((a, b) => Math.abs(targetX - a) - Math.abs(targetX - b))[0];

    this.sliderThumb.style.left = `${closestStep}%`;
    this.sliderProgress.style.width = `${closestStep}%`;

    const currentStepIndex = this.arrSteps.indexOf(closestStep);
    this.togglerActiveStep(currentStepIndex);
    this.sliderValue.textContent = currentStepIndex;

    this.elem.dispatchEvent(new CustomEvent('slider-change', {
      detail: Number(this.sliderValue.textContent),
      bubbles: true
    }));
  }

  onChangeSliderValueCustom(evt) {
    console.log(evt.detail);
  }

  togglerActiveStep(currentStepIndex) {
    this.sliderSteps.forEach((step, index) => {
      if (index === currentStepIndex) {
        step.classList.add('slider__step-active');
      } else {
        step.classList.remove('slider__step-active');
      }
    });
  }
}
