import { getReviewMovie } from 'Services/ServiceAPI';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Reviews = () => {
  const { movieId } = useParams();
  const [review, setReview] = useState([]);

  const seacrhReview = async movieId => {
    try {
      const { results } = await getReviewMovie(movieId);
      setReview(results);
    } catch ({ message }) {
      alert(message);
    }
  };

  useEffect(() => {
    seacrhReview(movieId);
  }, [movieId]);

  return (
    <>
      {review.length > 0 ? (
        <ul>
          {review.map(({ id, author, content }) => (
            <li key={id}>
              <p>Author: {author}</p>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We don't have any reviews for this movie.</p>
      )}
    </>
  );
};

export default Reviews;
