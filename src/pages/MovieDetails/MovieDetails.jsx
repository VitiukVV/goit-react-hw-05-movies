import { getMovieDetails } from 'Services/ServiceAPI';
import { Suspense, useEffect, useRef, useState } from 'react';
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { GanreList, Wrapper } from './MovieDetails.styled';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const backLinkLocationRef = useRef(location.state?.from ?? '/movies');
  const navigate = useNavigate();

  const searchMovieByID = async movieId => {
    try {
      const response = await getMovieDetails(movieId);
      setMovie(response);
    } catch ({ message }) {
      alert(message);
    }
  };

  useEffect(() => {
    searchMovieByID(movieId);
  }, [movieId]);

  const handleBackClick = () => {
    navigate(backLinkLocationRef.current);
  };

  return (
    <>
      <button onClick={handleBackClick}>Go back</button>
      {movie && (
        <Wrapper>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={200}
          />
          <div>
            <h1>{movie.title}</h1>
            <p>User Score: {Math.ceil(movie.vote_average * 10)}%</p>
            <h2>Overview</h2>
            <p>{movie.overview}</p>
            <h3>Genres</h3>
            <GanreList>
              {movie.genres.map(genre => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </GanreList>
          </div>
        </Wrapper>
      )}
      <div>
        <h2>Additional information</h2>
        <ul>
          <li>
            <Link to="cast">Cast</Link>
          </li>
          <li>
            <Link to="reviews">Reviews</Link>
          </li>
        </ul>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default MovieDetails;
