const apiDomain = 'https://api.themoviedb.org';
const movieDomain = "https://image.tmdb.org"
const apiVersion = '3';
const urlBase = `${apiDomain}/${apiVersion}`;

const theMovieDbClient = {
  // https://developer.themoviedb.org/reference/search-movie
  searchMovies: async ({ query, page, lang='ja' }) => {
    const url = `${urlBase}/search/movie?query=${query}&language=${lang}&page=${page}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_THE_MOVIE_DB_API_KEY}`
      }
    };
    const response = await fetch(url, options);
    const data = await response.json();
  
    return data;
  },
  // https://developer.themoviedb.org/reference/movie-details
  fetchMovieDetail: async ({ id, lang='ja' }) => {
    const url = `${urlBase}/movie/${id}?&language=${lang}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_THE_MOVIE_DB_API_KEY}`
      }
    }
    const response = await fetch(url, options);
    const data = await response.json();

    return data;
  },
  // https://api.themoviedb.org/3/movie/{movie_id}/credits
  fetchMovieCredits: async ({ id, lang='ja' }) => {
    const url = `${urlBase}/movie/${id}/credits?&language=${lang}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_THE_MOVIE_DB_API_KEY}`
      }
    }
    const response = await fetch(url, options);
    const data = await response.json();

    return data;
  },
  // https://developer.themoviedb.org/docs/image-basics
  buildImageUrl: (imagePath, imageSize="original") => {
    return `${movieDomain}/t/p/${imageSize}${imagePath}`;
  }
};

export default theMovieDbClient;
