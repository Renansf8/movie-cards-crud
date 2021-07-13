import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { MdFavorite } from 'react-icons/md';
import '../styles/movieCard.css';

class MovieCard extends React.Component {
  constructor({ movie }) {
    super();

    this.state = {
      bookmarked: movie.bookmarked,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const {
      onClick,
      movie: { id },
    } = this.props;

    this.setState(
      (state) => ({
        bookmarked: !state.bookmarked,
      }),
      () => {
        const { bookmarked } = this.state;
        onClick(bookmarked, id);
      }
    );
  }

  render() {
    const {
      movie: { title, storyline, imagePath, id },
    } = this.props;

    const { bookmarked } = this.state;

    return (
      <div data-testid="movie-card" className="movie-card">
        <img src={imagePath} alt="movie" />
        <div className="card-content">
          <div className="favorite">
            <h3>{title}</h3>
            <button type="button" onClick={this.handleClick}>
              <MdFavorite
                style={bookmarked ? { color: '#0077ff' } : { color: '#555555' }}
              />
            </button>
          </div>
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
  onClick: PropTypes.func,
};

MovieCard.defaultProps = {
  onClick: () => {},
};

export default MovieCard;
