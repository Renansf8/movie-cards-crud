import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { MovieForm } from '../components';
import * as movieAPI from '../services/movieAPI';

class EditMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'loading',
      movie: [],
      shouldRedirect: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const { getMovie } = movieAPI;
    getMovie(id);
    this.takeMovie();
  }

  handleSubmit(updatedMovie) {
    const { createMovie } = movieAPI;
    createMovie(updatedMovie);
    this.setState({
      movie: updatedMovie,
      shouldRedirect: true,
    });
  }

  async takeMovie() {
    const { match: { params: { id } } } = this.props;
    const requestResponse = await movieAPI.getMovie(id);
    const selectedMovie = await requestResponse;
    this.setState({
      movie: selectedMovie,
      status: 'loaded',
    });
  }

  render() {
    const { status, shouldRedirect, movie } = this.state;
    if (shouldRedirect) {
      return <Redirect to="/" />;
    }

    if (status === 'loading') {
      return (
        <p>Carregando...</p>
      );
    }

    return (
      <div data-testid="edit-movie">
        <MovieForm movie={ movie } onSubmit={ this.handleSubmit } />
      </div>
    );
  }
}

EditMovie.propTypes = {
  match: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default EditMovie;
