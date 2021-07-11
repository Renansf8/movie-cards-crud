import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import '../styles/movieList.css';

import * as movieAPI from '../services/movieAPI';

class MovieList extends Component {
  constructor() {
    super();

    this.takeMovies = this.takeMovies.bind(this);
    this.searchTextChange = this.searchTextChange.bind(this);

    this.state = {
      movies: [],
      loading: true,
      searchText: '',
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

  searchTextChange(event) {
    this.setState({
      searchText: event.target.value,
    });
  }

  filterMovie(movies) {
    const { searchText } = this.state;
    const filtered = movies.map((movie) => {
      const { title } = movie;
      if (title.toLowerCase().includes(searchText)) {
        return movie;
      }
      return undefined;
    });
    return filtered.filter((obj) => obj !== undefined);
  }

  render() {
    const { movies, loading, searchText } = this.state;

    if (loading === true)
      return (
        <div className="loading">
          <Loading />
        </div>
      );

    return (
      <div data-testid="movie-list" className="list-container">
        <Header />
        <SearchBar
          searchText={searchText}
          handleTextChange={this.searchTextChange}
        />
        <div className="list">
          {this.filterMovie(movies).map((movie) => (
            <MovieCard key={movie.title} movie={movie} />
          ))}
        </div>
        <div className="add-movie">
          <button>
            <Link to="/movies/new">ADICIONAR CARTÃO</Link>
          </button>
        </div>
        <Footer />
      </div>
    );
  }
}

export default MovieList;
