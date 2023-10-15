import axios from 'axios';

const RapidAPI_KEY = import.meta.env.VITE_RAPID_API_KEY;

function convertToJson(res) {
  if (res.status == 200) {
    return res.data;
  } else {
    throw new Error('Bad Response');
  }
}

export default class MoviesData {
  constructor(contentType, searchText, sortOrder = 'title_asc') {
    this.options = {
      method: 'GET',
      url: 'https://unogs-unogs-v1.p.rapidapi.com/search/titles',
      params: {
        order_by: sortOrder
      },
      headers: {
        'X-RapidAPI-Key': RapidAPI_KEY,
        'X-RapidAPI-Host': 'unogs-unogs-v1.p.rapidapi.com'
      }
    };
    this.options.params.title = searchText;

    if (contentType != 'all') {
      this.options.params.type = contentType; 
    }

  }

  async getData() {
    try {
      const response = await axios.request(this.options);
      const data = await convertToJson(response);
      // console.log(data.Result);
      return data.results;
      } catch (error) {
      console.error(error);
    }
  }

  // async findProductById(id) {
    // const response = await fetch(baseURL + `product/${id}`);
    // const data = await convertToJson(response);
    // return data.Result;
  // }
}

// console.log(Filme.getData());
