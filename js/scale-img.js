const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');

const scaleInput = document.querySelector('.scale__control--value');
const image = document.querySelector('.img-upload__preview img');

const DEFAULT_SCALE = 100;
const MIN_SCALE = 25;
const SCALE_STEP = 25;

scaleInput.value = `${DEFAULT_SCALE}%`;

const scaleImage = (value = `${DEFAULT_SCALE}%`) => {
  image.style.transform = `scale(${value / 100})`;
  scaleInput.value = `${value}%`;
};

const onSmallerButtonCLick = () => {
  const currentValue = parseInt(scaleInput.value, 10);
  let newValue = currentValue - SCALE_STEP;
  if (newValue < MIN_SCALE) {
    newValue = MIN_SCALE;
  }
  scaleImage(newValue);
};

const onBiggerButtonCLick = () => {
  const currentValue = parseInt(scaleInput.value, 10);
  let newValue = currentValue + SCALE_STEP;
  if (newValue > DEFAULT_SCALE) {
    newValue = DEFAULT_SCALE;
  }
  scaleImage(newValue);
};

smallerButton.addEventListener('click', onSmallerButtonCLick);
biggerButton.addEventListener('click', onBiggerButtonCLick);

const resetScale = () => {
  scaleImage(DEFAULT_SCALE);
};

export { resetScale };

