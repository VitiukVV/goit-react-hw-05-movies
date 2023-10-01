import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';

const Reviews = lazy(() => import('../components/reviews/Reviews.jsx'));
const Cast = lazy(() => import('../components/cast/Cast.jsx'));
const Movies = lazy(() => import('../pages/Movies/Movies.jsx'));
const Home = lazy(() => import('../pages/Home/Home.jsx'));
const MovieDetails = lazy(() =>
  import('../pages/MovieDetails/MovieDetails.jsx')
);

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="movies" element={<Movies></Movies>} />
        <Route path="movies/:movieId" element={<MovieDetails />}>
          <Route path="cast" element={<Cast></Cast>}></Route>
          <Route path="reviews" element={<Reviews></Reviews>}></Route>
        </Route>
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
};
