import axios from 'axios';

const options = {
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOGU3MjJkMGVlNmNhMGExZDg0ZDAyNGQyZDE4NDVkYyIsInN1YiI6IjY1MTkwZDlkMDcyMTY2MDBlMmQ1ZmU1YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-d7TRbNBU5yFIO8wuvccLlM-UrQaIwUVgQcTkhVcv_k',
  },
};

export const getTrendingMovies = async () => {
  const BASE_URL =
    'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
  const { data } = await axios(BASE_URL, options);
  return data;
};

export const getMovieDetails = async movieID => {
  const BASE_URL = `https://api.themoviedb.org/3/movie/${movieID}?language=en-US`;
  const { data } = await axios(BASE_URL, options);
  return data;
};

export const getCastMovie = async movieID => {
  const BASE_URL = `https://api.themoviedb.org/3/movie/${movieID}/credits?language=en-US`;
  const { data } = await axios(BASE_URL, options);
  return data;
};

export const getReviewMovie = async movieID => {
  const BASE_URL = `https://api.themoviedb.org/3/movie/${movieID}/reviews?language=en-US&page=1`;
  const { data } = await axios(BASE_URL, options);
  return data;
};

export const getMovieByFilter = async query => {
  const BASE_URL = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
  const { data } = await axios(BASE_URL, options);
  return data;
};
