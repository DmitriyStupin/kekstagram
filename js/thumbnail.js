import { showBigPicture } from './fullScreen.js';

const filterButtons = document.querySelectorAll('.img-filters__button');

for (let i = 0; i < filterButtons.length; i++) {
  filterButtons[i].addEventListener('click', function() {
    for (let j = 0; j < filterButtons.length; j++) {
      filterButtons[j].classList.remove('img-filters__button--active');
    }
    this.classList.add('img-filters__button--active');
  });
}

const container = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const createPicture = (data) => {
  const { url, description, likes, comments } = data;
  const picture = pictureTemplate.cloneNode(true);

  picture.querySelector('.picture__img').src = url;
  picture.querySelector('.picture__img').alt = description;
  picture.querySelector('.picture__comments').textContent = comments.length;
  picture.querySelector('.picture__likes').textContent = likes;

  picture.addEventListener('click', () => {
    showBigPicture(data);
  });

  return picture;
};

const renderPictures = (pictures) => {
  container.querySelectorAll('.picture').forEach((element) => element.remove());
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const pictureElement = createPicture(picture);
    fragment.append(pictureElement);
  });

  container.append(fragment);
};


export{ renderPictures };
