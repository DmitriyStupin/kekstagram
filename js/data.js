import { getRandomArrayElement, getRandomNumber } from './util.js';

const DESCRIPTION = [
  'Прогулка в парке',
  'Сходили на концерт',
  'Поход в ресторан',
  'Сходили на пати к OG Buda',
  'Сегодня на трезвом',
  'День спортзала'
];

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Иван',
  'Дмитрий',
  'Гриша',
  'Кирилл',
  'Леон',
  'Юлия',
  'Анна',
  'Егор',
];

const createComment = (index) => ({
  id: index,
  avatar: `img/avatar-${  getRandomNumber(1, 6)  }.svg`, //'img/avatar-' + getRandomNumber(1, 6) + '.svg',
  message: getRandomArrayElement(MESSAGE),
  name: getRandomArrayElement(NAMES)
});

const createPicture = (index) => ({
  id: index,
  url: `photos/${ index  }.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomNumber(15, 200),
  comments: Array.from(
    { length: getRandomNumber(0, 15) },
    (commentIndex) => createComment(commentIndex)
  ),
});

const getPictures  = () => Array.from({length: 25}, (_ , pictureIndex) => createPicture(pictureIndex + 1));

export {getPictures};
