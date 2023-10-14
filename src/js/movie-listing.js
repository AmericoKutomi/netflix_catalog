import MoviesData from './UnogsData.mjs';
import MovieList from './MovieList.mjs';

const SelectedMovies = new MoviesData();

const element = document.querySelector('.movie-list');
const movies = new MovieList(SelectedMovies, element);

movies.init();

const sortByNameElement = document.querySelector('#sortByName');
sortByNameElement.addEventListener('click', () => movies.sortBy('name'));

const sortByPriceElement = document.querySelector('#sortByYear');
sortByPriceElement.addEventListener('click', () => movies.sortBy('year'));
