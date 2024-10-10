const imgFilters = document.querySelector('.img-filters');

const getData = async (onSuccess, onFail) => {
  try {
    const response = await fetch(
      'https://25.javascript.htmlacademy.pro/kekstagram/data'
    );

    if (!response.ok) {
      throw new Error('Не удалось загрузить фотографии');
    }

    imgFilters.classList.remove('img-filters--inactive');
    const offers = await response.json();
    onSuccess(offers);
  } catch (error) {
    onFail(error.message);
  }
};

const sendData = async (onSuccess, onFail, body) => {
  try {
    const response = await fetch(
      'https://25.javascript.htmlacademy.pro/kekstagram',
      {
        method: 'POST',
        body,
      }
    );

    if (!response.ok) {
      throw new Error('Не удалось отправить форму. Попробуйте ещё раз');
    }

    onSuccess();
  } catch (error) {
    onFail(error.message);
  }
};

export { getData, sendData };

