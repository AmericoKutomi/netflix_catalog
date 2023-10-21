import { loadHeaderFooter } from './utils.mjs';
import MyFavoriteList from './MyList.mjs';

loadHeaderFooter();

const myMovieListElement = document.querySelector('.favorite-list');

const list = new MyFavoriteList(myMovieListElement);
list.init();
