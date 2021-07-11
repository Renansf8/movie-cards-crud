import React from 'react';
import '../styles/header.css';
import { MdLocalMovies } from 'react-icons/md';

class Header extends React.Component {
  render() {
    return (
      <header>
        <MdLocalMovies />
        <h1>Movie Cards - CRUD</h1>
      </header>
    );
  }
}

export default Header;
