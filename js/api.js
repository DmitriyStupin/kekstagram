import { onFormSubmit, hideModal } from './validate-form.js';
import { showAlert, showSuccess } from './util.js';
import { renderPictures } from './thumbnail.js';
import { resetEffects } from './effect-img.js';
import { resetScale } from './scale-img.js';

const form = document.querySelector('.img-upload__form');

const getData = () => {
  fetch('https://25.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        response.json()
          .then((pictures) => {
            renderPictures(pictures);
          });
      } else {
        showAlert('Не удалось загрузить фотографии! Попробуйте ещё раз');
      }
    })
    .catch(() => {
      showAlert('Не удалось загрузить фотографии! Попробуйте ещё раз');
    });
  onFormSubmit(hideModal);
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://25.javascript.htmlacademy.pro/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
        showSuccess('Фотография загружена!');
        form.reset();
        resetEffects();
        resetScale();
        hideModal();
      } else {
        showAlert('Не удалось отправить форму. Попробуйте ещё раз');
        form.reset();
        resetEffects();
        resetScale();
        hideModal();
      }
    })
    .catch(() => {
      showAlert('Не удалось отправить форму. Попробуйте ещё раз');
      form.reset();
      resetEffects();
      resetScale();
      hideModal();
    });
};

export { getData, sendData };
