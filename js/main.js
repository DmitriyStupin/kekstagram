import { renderPictures } from './thumbnail.js';
import './scale-img.js';
import './effect-img.js';
import { getData } from './api.js';

getData((pictures) => {
  renderPictures(pictures);
});
