import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import * as movieAPI from '../services/movieAPI';
import { Loading } from '../components';

class MovieDetails extends Component {
  constructor() {
    super();

    this.getMovie = this.getMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);

    this.state = {
      movie: '',
      loading: true,
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const { getMovie } = movieAPI;
    getMovie(id);
    this.getMovie();
  }

  getMovie() {
    this.setState(
      { loading: true },
      async () => {
        const { match: { params: { id } } } = this.props;
        const requestResponse = await movieAPI.getMovie(id);
        const selectedMovie = await requestResponse;
        this.setState({
          movie: selectedMovie,
          loading: false,
        });
      },
    );
  }

  deleteMovie() {
    const { match: { params: { id } } } = this.props;
    const { deleteMovie } = movieAPI;
    deleteMovie(id);
  }

  render() {
    const { loading,
      movie: {
        title,
        subtitle,
        storyline,
        genre, rating,
        imagePath,
        id,
      } } = this.state;

    if (loading === true) return <Loading />;

    return (
      <div data-testid="movie-details">
        <img alt="Movie Cover" src={ `../${imagePath}` } />
        <p>{ `Title: ${title}` }</p>
        <p>{ `Subtitle: ${subtitle}` }</p>
        <p>{ `Storyline: ${storyline}` }</p>
        <p>{ `Genre: ${genre}` }</p>
        <p>{ `Rating: ${rating}` }</p>
        <button type="button">
          <Link to="/">
            VOLTAR
          </Link>
        </button>
        <button type="button">
          <Link to={ `/movies/${id}/edit` }>
            EDITAR
          </Link>
        </button>
        <button type="button" onClick={ this.deleteMovie }>
          <Link to="/">
            DELETAR
          </Link>
        </button>
      </div>
    );
  }
}

MovieDetails.propTypes = {
  match: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default MovieDetails;
