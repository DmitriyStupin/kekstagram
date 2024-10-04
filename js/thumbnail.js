/* eslint-disable prefer-const */
import { showBigPicture } from './fullScreen.js';

// const filterDiscussed = document.querySelector('#filter-discussed');

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

export{ renderPictures };
