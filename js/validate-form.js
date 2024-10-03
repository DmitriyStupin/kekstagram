import { showAlert } from './util.js';
import { sendData } from './api.js';
import { resetScale } from './scale-img.js';

const form = document.querySelector('.img-upload__form');
const hashtagField = document.querySelector('.text__hashtags');

const uploadFile = document.querySelector('#upload-file');
const uploadCancel = document.querySelector('#upload-cancel');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const commentField = document.querySelector('.text__description');

const MAX_HASHTAG_COUNT = 5;
const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;
const UNVALID_SYMBOLS = /[^a-zA-Z0-9а-яА-ЯёЁ]/g;

const pristine = new Pristine(form, {
  classTo: 'img-upload__element',
  errorTextParent: 'img-upload__element',
  errorTextClass: 'img-upload__error-text',
});

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
});

// Проверка, что начинаем с Хэштэга
const startWithHashtag = (value) => value[0] === '#';

const hasValidSymbols = (value) => !UNVALID_SYMBOLS.test(value.slice(1));

const hasValidLength = (value) => value.length >= MIN_HASHTAG_LENGTH && value.length <= MAX_HASHTAG_LENGTH;

const isValidTag = (tag) => startWithHashtag(tag) && hasValidSymbols(tag) && hasValidLength(tag);

const hasValidCount = (tags) => tags.length <= MAX_HASHTAG_COUNT;

const isUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateTags = (value) => {
  const tags = value.trim().split(' ').filter((tag) => tag.trim().length);
  return hasValidCount(tags) && isUniqueTags(tags) && tags.every(isValidTag);
};

const onFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();

    if (isValid) {
      sendData(
        () => onSuccess(),
        () => showAlert('Не удалось отправить форму. Попробуйте ещё раз'),
        new FormData(evt.target),
      );
    }
  });
};

const isTextFieldFocused = () =>
  document.activeElement === hashtagField ||
  document.activeElement === commentField;

function onEscKeyDown(evt) {
  if (evt.key === 'Escape' && !isTextFieldFocused()) {
    evt.preventDefault();
    hideModal();
  }
}

const showModal = () => {

  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeyDown);
};

function hideModal() {
  form.reset();
  pristine.reset();
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);
  resetScale();
}

uploadFile.addEventListener('change', () => {
  showModal();
});

uploadCancel.addEventListener('click', () => {
  hideModal();
});

pristine.addValidator(
  hashtagField,
  validateTags,
  'Неправильно заполнены хэштэги'
);

export { onFormSubmit, showModal, hideModal };
