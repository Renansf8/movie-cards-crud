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
    this.favoriteMovie = this.favoriteMovie.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      movies: [],
      loading: true,
      searchText: '',
      bookmarkedOnly: '',
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

  handleChange({ target }) {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [target.name]: value,
    });
  }

  favoriteMovie(bookmarked, id) {
    const { movies } = this.state;
    const bookMarkedChange = movies.find(
      (movie) => Number(movie.id) === Number(id)
    );
    bookMarkedChange.bookmarked = bookmarked;
    movieAPI.updateMovie(bookMarkedChange);
  }

  filterMovie(movies) {
    const { searchText, bookmarkedOnly } = this.state;
    const filtered = movies.filter((movie) => {
      const searchMovie = movie.title.toLowerCase().includes(searchText);
      return searchMovie;
    });

    const favorite = bookmarkedOnly
      ? filtered.filter((movie) => movie.bookmarked)
      : filtered;

    return favorite;
  }

  render() {
    const { movies, loading, searchText, bookmarkedOnly } = this.state;

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
          handleTextChange={this.handleChange}
          bookMarkedOnly={bookmarkedOnly}
          bookMarkedOnlyChange={this.handleChange}
        />
        <div className="list">
          {this.filterMovie(movies).map((movie) => (
            <MovieCard
              key={movie.title}
              movie={movie}
              onClick={this.favoriteMovie}
            />
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
