import { renderListWithTemplate } from './utils.mjs';

function movieCardTemplate(movie) {
  return `<li class="movie-card">
  <a href="#">
  <img
    src="${movie.img}"
    alt="Image of ${movie.title}"
  />
  <h2 class="content__title">${movie.title}</h2>
  <h3 class="content__type">${movie.title_type}</h3>
  <p class="content__synopsis">${movie.synopsis}</p></a>
</li>`;
}

export default class MovieListing {
    constructor(dataSource, listElement) {
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const list = await this.dataSource.getData(this.category);
        this.renderList(list);
        document.querySelector('.title').innerHTML = this.category;
    }
    async renderList(list, clear = true) {
        renderListWithTemplate(movieCardTemplate, this.listElement, list, 'afterbegin', clear);
    }

    async sortBy(order_field) {
        const list = await this.dataSource.getData(this.category);
        let sortedList = [];
        if (order_field == 'title_asc' || order_field == 'title') {
            sortedList = list.sort(function(a,b) {
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
            sortedList = list.sort(function(a,b) {
                if (order_field == 'film_year_asc') {
                    return b.year - a.year;
                } else {
                    return a.year - b.year;
                }
            });
        };
        this.renderList(sortedList, true);
    }
}
