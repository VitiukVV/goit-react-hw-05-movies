import { getTrendingMovies } from 'Services/ServiceAPI';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Home = () => {
  const [trendMovies, setTrendMovies] = useState([]);
  const location = useLocation();

  const searchPopularMovies = async () => {
    try {
      const { results } = await getTrendingMovies();
      setTrendMovies(results);
    } catch ({ message }) {
      alert(message);
    }
  };

  useEffect(() => {
    searchPopularMovies();
  }, []);

  return (
    <>
      <h1>Trending today</h1>
      {trendMovies && (
        <ul>
          {trendMovies.map(({ title, id }) => (
            <li key={id}>
              <Link to={`movies/${id}`} state={{ from: location }}>
                {title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Home;
