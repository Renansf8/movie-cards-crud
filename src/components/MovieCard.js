import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import '../styles/movieCard.css';

class MovieCard extends React.Component {
  render() {
    const {
      movie: { title, storyline, imagePath, id },
    } = this.props;

    return (
      <div data-testid="movie-card" className="movie-card">
        <img src={imagePath} alt="movie" />
        <div className="card-content">
          <h3>{title}</h3>
          <p>{storyline}</p>
          <div className="link">
            <Link to={`/movies/${id}`}>VER DETALHES</Link>
            <FiArrowRight />
          </div>
        </div>
      </div>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    storyline: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default MovieCard;
