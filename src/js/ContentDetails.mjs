import { setArrLocalStorage, getLocalStorage } from './utils.mjs';
import { ContentData } from './UnogsData.mjs';

function contentDetailsTemplate(movie) {
  return `<section class="movie-detail">
    <img
      class="movie-detail-img"
      src="${movie.default_image}"
      alt="Image of ${movie.title}"
    />
    <h3 class="content__title">${movie.title}</h3>
    <h4 class="content__type">${movie.title_type}<span> (${movie.year})</span></h4>
    <p class="content__synopsis">${movie.synopsis}</p>
    <p class="content__maturity">${movie.maturity_label}</p>
    <div class="movie__add">
        <button id="addToFavorite" data-id="${movie.netflix_id}">+ Favorite &#10084;</button>
    </div>
    </section>`;
}

function isFavoritesEmpty(favoritesList) {
  return Object.is(favoritesList, null) || favoritesList.length === 0;
}

export default class ContentDetails {
  constructor(contentId) {
    this.contentId = contentId;
    this.movie = {};
  }
  async init() {
    this.movie = await this.loadContent();
    this.renderContentDetails('main');
    document.getElementById('addToFavorite')
      .addEventListener('click', () => this.addToFavorite());  
  }

  async loadContent() {
    const data = new ContentData(this.contentId);
    const moviedata = await data.getData();
    return moviedata;
  }

  addToFavorite() {
    const favoriteItems = getLocalStorage('ncat-mylist');
    const isEmpty = isFavoritesEmpty(favoriteItems);
    // if list is empty, just include the movie/series
    if (isEmpty) {
      setArrLocalStorage('ncat-mylist', this.movie.netflix_id);
      return;
    }
    // if list exists, it will check if the content is already in the list
    let found = false;
    favoriteItems.forEach(item => {
      if (this.contentId == item) {
        found = true;
        // alertMessage(`${this.movie.title} is already in the favorites list.`);
        return;
      }
    });
    
    if (!found) {
      setArrLocalStorage('ncat-mylist', this.movie.netflix_id);
      // alertMessage(`${this.movie.title} added to favorites list.`);
    }
  }

  renderContentDetails(selector) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML('afterBegin', contentDetailsTemplate(this.movie));
  }
}
