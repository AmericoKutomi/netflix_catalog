import { getLocalStorage, setLocalStorage, loadHeaderFooter } from './utils.mjs';
import { ContentData } from './UnogsData.mjs';

function favoriteTemplate(movie) {
  return `<li class="movie-card" id="card__${movie.netflix_id}">
    <img
        src="${movie.default_image}"
        alt="Image of ${movie.title}"
    />
    <h3 class="content__title">${movie.title}</h3>
    <h4 class="content__type">${movie.title_type}<span> (${movie.year})</span></h4>
    <p class="content__synopsis">${movie.synopsis}</p>
    <div id="cont__${movie.netflix_id}" title='Remove' class='remove_item'>Remove ❌</div>
  </li>`;
}

export default class MyFavoriteList {
    constructor(listElement) {
        this.listElement = listElement;
        this.contentsList = [];
    }

    async loadContent(contentId) {
      const data = new ContentData(contentId);
      const moviedata = await data.getData();
      return moviedata;
    }
  
    async AddToList(contentId) {
      const content = await this.loadContent(contentId);
      this.contentsList.push(content);
      this.listElement.insertAdjacentHTML('afterBegin', favoriteTemplate(content));
      document.getElementById('cont__' + contentId)
        .addEventListener('click', () => this.removeItem(contentId));    
    }
      
    async init() {
      const favoriteItems = getLocalStorage('ncat-mylist');
      favoriteItems.map((contentId) => { this.AddToList(contentId) }) ;
    }

    removeItem(id) {
      // Update local Storage
      const favoriteItems = getLocalStorage('ncat-mylist');
      for (let i = 0; i < favoriteItems.length; i++) {
        const item = favoriteItems[i];
        if (id === item) {
          //Delete Item
          favoriteItems.splice(i, 1);
          //Update Local Storage
          setLocalStorage('ncat-mylist', favoriteItems);
          break;
        }
      }
      // Remove from the contentsList
      for (let i = 0; i < this.contentsList.length; i++) {
        const item = this.contentsList[i];
        if (id === item.netflix_id) {
          //Delete Item
          this.contentsList.splice(i, 1);
          break;
        }
      }
      // Remove card from the HTML
      document.getElementById('card__' + id).remove();
    }
    
}
