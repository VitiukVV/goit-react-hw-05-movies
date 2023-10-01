import { getCastMovie } from 'Services/ServiceAPI';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);

  const seacrhCast = async movieId => {
    try {
      const { cast } = await getCastMovie(movieId);
      setCast(cast);
    } catch ({ message }) {
      alert(message);
    }
  };

  useEffect(() => {
    seacrhCast(movieId);
  }, [movieId]);

  return (
    <>
      {cast && (
        <ul>
          {cast.map(({ id, name, character, profile_path }) => (
            <li key={id}>
              <img
                width="100px"
                src={`https://image.tmdb.org/t/p/w500${profile_path}`}
                alt={name}
              />
              <p>{name}</p>
              <p>Character: {character}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Cast;
