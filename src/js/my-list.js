import {
  getLocalStorage,
  setLocalStorage,
  loadHeaderFooter,
} from './utils.mjs';

const myMovieListElement = document.querySelector('.movie-list');

function renderMyMovieList() {
  const myMovieList = getLocalStorage('ncat-mylist');
  const isEmpty = isListEmpty(myMovieList);

  !isEmpty
    ? (myMovieListElement.innerHTML = myMovieList.map((item) =>
        oneMovieTemplate(item)
      ))
    : (myMovieListElement.innerHTML = ``);

  //Adds event listener to each 'X'
  myMovieList.forEach((item) => {
    document
      .getElementById(item.Id)
      .addEventListener('click', () => removeOneMovie(item.Id));
  });
}

function isListEmpty(myList) {
  return Object.is(myList, null) || myList.length === 0;
}

function removeOneMovie(id) {
  //Retrieve local Storage
  const myMovieList = getLocalStorage('ncat-mylist');
  for (let i = 0; i < myMovieList.length; i++) {
    const item = myMovieList[i];
    if (id === item.Id) {
      //Delete Item
      myMovieList.shift(myMovieList[item]);
      //Update Local Storage
      setLocalStorage('ncat-mylist', myMovieList);
      renderMyMovieList();
      return;
    }
  }

  myMovieList.forEach((item) => {
    if (id === item.Id) {
      // let red = cartItems.pop(item);
      // console.log(red);
      return;
    }

    setLocalStorage('ncat-mylist', renderMyMovieList);
    renderMyMovieList();
  });
}

function oneMovieTemplate(item) {
  const newItem = `<li class='mymovie-card divider'>
  <div id='${item.Id}' title='Remove Item' class='remove_item'>❌</div>
  <a href='#' class='mymovie-card__image'>
    <img
      src='${item.Image}'
      alt='${item.Name}'
    />
  </a>
  <a href='#'>
    <h2 class='mymovie-card__name'>${item.Name}</h2>
  </a>
  <p class='mymovie-card__color'>${item.Colors[0].ColorName}</p>
  <p class='mymovie-card__quantity'>qty: 1</p>
  <p class='mymovie-card__price'>$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderMyMovieList();
loadHeaderFooter();
