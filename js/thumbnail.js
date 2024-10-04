/* eslint-disable prefer-const */
import { showBigPicture } from './fullScreen.js';
import { getRandomPicture } from './util.js';

const filterButtons = document.querySelectorAll('.img-filters__button');
const filterRandom = document.querySelector('#filter-random');

for (let i = 0; i < filterButtons.length; i++) {
  filterButtons[i].addEventListener('click', function() {
    for (let j = 0; j < filterButtons.length; j++) {
      filterButtons[j].classList.remove('img-filters__button--active');
    }
    this.classList.add('img-filters__button--active');
  });
}

const pictureList = document.querySelector('.pictures');
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

// const pictureRank = (data) => {
//   const { comments } = data;

//   let rank = comments.length;

//   return rank;
// };


const renderPictures = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures
    .forEach((picture) => {
      const pictureElement = createPicture(picture);
      fragment.append(pictureElement);
    });
  pictureList.append(fragment);
};

// filterDiscussed.addEventListener('click', () => {
//   filterDiscussed.classList.add('img-filters__button--active');
// });

filterRandom.addEventListener('click', (pictures) => {
  getRandomPicture(pictures);
});

export{ renderPictures };
