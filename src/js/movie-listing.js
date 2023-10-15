import MoviesData from './UnogsData.mjs';
import MovieList from './MovieList.mjs';

let SelectedMovies = undefined;
let movies = undefined;

const element = document.querySelector('.movie-list');
const contentType = document.querySelector('#content-type');
const searchText = document.querySelector('#search-for');
const sortOrder = document.querySelector('#content-sort');
const titleSearched = document.querySelector('#title-searched');
const searchButton = document.querySelector('#search-button');
const sortOption = document.querySelector('#content-sort');

function selectNewContents() {
  if (SelectedMovies) {
    SelectedMovies = undefined;
  }
  SelectedMovies = new MoviesData(
    contentType.value,
    searchText.value,
    sortOrder.value
  );
  if (movies) {
    movies = undefined;
  }
  movies = new MovieList(SelectedMovies, element);
  movies.init();
  titleSearched.innerHTML = `${searchText.value}`;
}

selectNewContents();

searchButton.addEventListener('click', () => {
  selectNewContents();
});

function SortMovies() {
  movies.sortBy(sortOrder.value);
}

sortOption.addEventListener('change', () => {
  SortMovies();
});
