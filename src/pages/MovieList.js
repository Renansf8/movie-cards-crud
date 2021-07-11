import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/movieList.css';

import * as movieAPI from '../services/movieAPI';

class MovieList extends Component {
  constructor() {
    super();

    this.takeMovies = this.takeMovies.bind(this);

    this.state = {
      movies: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.takeMovies();
  }

  takeMovies() {
    this.setState({ loading: true }, async () => {
      const requestResponse = await movieAPI.getMovies();
      const moviesObj = await requestResponse;
      this.setState({
        movies: moviesObj,
        loading: false,
      });
    });
  }

  render() {
    const { movies, loading } = this.state;

    return (
      <div data-testid="movie-list" className="list-container">
        {loading ? <span></span> : <Header />}
        <div className="list">
          {loading ? (
            <Loading />
          ) : (
            movies.map((movie) => <MovieCard key={movie.title} movie={movie} />)
          )}
        </div>
        <div className="add-movie">
          {loading ? (
            <span></span>
          ) : (
            <button>
              <Link to="/movies/new">ADICIONAR CARTÃO</Link>
            </button>
          )}
        </div>
        {loading ? <span></span> : <Footer />}
      </div>
    );
  }
}

export default MovieList;
