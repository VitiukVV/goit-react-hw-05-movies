import { getMovieByFilter } from 'Services/ServiceAPI';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

const Movies = () => {
  const [movies, setMovies] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';
  const ref = useRef(query);
  const location = useLocation();

  const searchMovieByName = async query => {
    try {
      const { results } = await getMovieByFilter(query);
      setMovies(results);
    } catch ({ message }) {
      alert(message);
    }
  };

  useEffect(() => {
    searchQuery && searchMovieByName(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    ref.current && searchMovieByName(ref.current);
  }, []);

  const updateQueryString = ({ target: { value } }) => {
    value ? setSearchParams({ query: value }) : setSearchParams({});
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const value = form.elements.search.value;
    if (value.trim() === '') return;
    setSearchQuery(value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="search"
          type="text"
          value={query}
          onChange={updateQueryString}
          autoFocus
        ></input>
        <button type="submit">Search</button>
      </form>
      {movies && (
        <ul>
          {movies.map(({ title, id }) => (
            <li key={id}>
              <Link to={`${id}`} state={{ from: location }}>
                {title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Movies;
