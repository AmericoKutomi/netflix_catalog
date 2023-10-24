import { renderListWithTemplate } from './utils.mjs';

function movieCardTemplate(movie) {
  return `<li class="movie-card">
  <a href="/content/index.html?contentid=${movie.netflix_id}">
    <img
        src="${movie.img}"
        alt="Image of ${movie.title}"
    />
    <h3 class="content__title">${movie.title}</h3>
    <h4 class="content__type">${movie.title_type}<span> (${movie.year})</span></h4>
    <p class="content__synopsis">${movie.synopsis}</p>
  </a>
</li>`;
}

export default class MovieListing {
    constructor(dataSource, listElement) {
        this.dataSource = dataSource;
        this.listElement = listElement;
        
    }

    async init() {
        const titleSearched = document.querySelector('#title-searched');
        const searchText = document.querySelector('#search-for');
        this.list = await this.dataSource.getData();
        if (this.list) {
            titleSearched.innerHTML = `Contents found for ${searchText.value}`;
            this.renderList(this.list);
        } else {
            this.listElement.innerHTML = '';
            titleSearched.innerHTML = `No contents found for ${searchText.value}`;
        }
    }
    async renderList(list, clear = true) {
        renderListWithTemplate(movieCardTemplate, this.listElement, list, 'afterbegin', clear);
    }

    async sortBy(order_field) {
        let sortedList = [];
        if (order_field == 'title_asc' || order_field == 'title') {
            sortedList = this.list.sort(function(a,b) {
                let aName = a.title.toLowerCase();
                let bName = b.title.toLowerCase();
                if (order_field == 'title_asc') {
                    if(aName > bName){return 1;}
                    if(aName < bName){return -1;}
                    return 0;   
                } else {
                    if(aName < bName){return 1;}
                    if(aName > bName){return -1;}
                    return 0;   
                }
            })
        } else if (order_field == 'film_year' || order_field == 'film_year_asc') {
            sortedList = this.list.sort(function(a,b) {
                if (order_field == 'film_year') {
                    return b.year - a.year;
                } else {
                    return a.year - b.year;
                }
            });
        };
        this.renderList(sortedList, true);
    }

}
